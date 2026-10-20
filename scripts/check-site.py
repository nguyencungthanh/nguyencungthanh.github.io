#!/usr/bin/env python3
"""Check a Hugo build using only the Python standard library."""

import argparse
import base64
import hashlib
import json
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
        self.ids = set()
        self.duplicates = set()

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        identifier = attrs.get('id')
        if identifier:
            if identifier in self.ids:
                self.duplicates.add(identifier)
            self.ids.add(identifier)
        for name in ('href', 'src', 'action', 'data-index-url'):
            if attrs.get(name):
                self.references.append((attrs[name], attrs.get('integrity', '')))
        for candidate in attrs.get('srcset', '').split(','):
            if candidate.strip():
                self.references.append((candidate.strip().split()[0], ''))


def check_site(root, base_url):
    errors = []
    base = urlsplit(base_url)
    prefix = base.path.rstrip('/') + '/'
    files = list(root.rglob('*'))
    html_files = [path for path in files if path.suffix == '.html']
    if not (root / 'index.html').is_file():
        return ['Build is missing index.html']

    def check_reference(source, reference, integrity=''):
        url = urlsplit(urljoin(base_url.rstrip('/') + '/' + source.relative_to(root).as_posix(), reference))
        if url.scheme not in ('http', 'https') or url.netloc != base.netloc:
            return
        decoded_path = unquote(url.path)
        if not decoded_path.startswith(prefix):
            errors.append(f'{source.relative_to(root)}: URL is outside the base path: {reference}')
            return
        target = root / decoded_path[len(prefix):]
        if target.is_dir():
            target /= 'index.html'
        if not target.is_file():
            errors.append(f'{source.relative_to(root)}: missing local target {reference}')
        elif integrity:
            for token in integrity.split():
                algorithm, digest = token.split('-', 1)
                actual = base64.b64encode(hashlib.new(algorithm, target.read_bytes()).digest()).decode()
                if actual != digest:
                    errors.append(f'{source.relative_to(root)}: integrity mismatch for {reference}')

    for path in html_files:
        parser = PageParser()
        parser.feed(path.read_text(encoding='utf-8'))
        for identifier in sorted(parser.duplicates):
            errors.append(f'{path.relative_to(root)}: duplicate id {identifier}')
        for reference, integrity in parser.references:
            check_reference(path, reference, integrity)

    for path in files:
        if path.suffix == '.css':
            css = re.sub(r'/\*.*?\*/', '', path.read_text(encoding='utf-8'), flags=re.S)
            for reference in re.findall(r'url\(\s*[\'"]?([^\s)\'"]+)', css):
                check_reference(path, reference)
        elif path.suffix == '.json':
            try:
                json.loads(path.read_text(encoding='utf-8'))
            except (ValueError, UnicodeError) as error:
                errors.append(f'{path.relative_to(root)}: invalid JSON: {error}')
        elif path.suffix in ('.xml', '.xsl'):
            try:
                tree = ET.parse(path)
                atom = '{http://www.w3.org/2005/Atom}'
                if tree.getroot().tag == atom + 'feed':
                    for entry in tree.getroot().findall(atom + 'entry'):
                        for field in ('id', 'title', 'updated'):
                            if entry.find(atom + field) is None:
                                errors.append(f'{path.relative_to(root)}: Atom entry is missing {field}')
            except ET.ParseError as error:
                errors.append(f'{path.relative_to(root)}: invalid XML: {error}')
    return sorted(set(errors))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path)
    parser.add_argument('--base-url', default='https://nguyencungthanh.github.io/')
    args = parser.parse_args()
    errors = check_site(args.directory.resolve(), args.base_url)
    if errors:
        print('\n'.join(errors), file=sys.stderr)
        return 1
    print('Site checks passed: local links, assets, integrity hashes, IDs, JSON and XML feeds.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
