.DEFAULT_GOAL := build
.PHONY: all build check clean make-dirs vendor normalize twemoji favicon watch watch-drafts watch-future watch-all new new-publication validate-name

ENVIRONMENT ?= production
BASE_URL ?= https://nguyencungthanh.github.io/
kind ?= article
export name kind

all: build

build:
	hugo --minify --environment $(ENVIRONMENT)

# Validate a fresh build without leaving stale output in public/.
check:
	@set -eu; \
	check_dir=$$(mktemp -d "$${TMPDIR:-/tmp}/hugo-check.XXXXXX"); \
	trap 'rm -rf "$$check_dir"' EXIT; \
	hugo --minify --environment $(ENVIRONMENT) --baseURL "$(BASE_URL)" --panicOnWarning --destination "$$check_dir"; \
	python3 scripts/check-site.py "$$check_dir" --base-url "$(BASE_URL)"

# Download vendors only when explicitly requested. Failed downloads preserve sources.
vendor: normalize twemoji

make-dirs:
	mkdir -p assets/css/vendor assets/js/vendor

normalize: make-dirs
	curl --fail --location --silent --show-error https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/3.0.1/modern-normalize.css --output assets/css/vendor/normalize.css.tmp
	mv assets/css/vendor/normalize.css.tmp assets/css/vendor/normalize.css

twemoji: make-dirs
	curl --fail --location --silent --show-error https://cdn.jsdelivr.net/npm/@twemoji/api@16.0.1/dist/twemoji.min.js --output assets/js/vendor/twemoji.min.js.tmp
	mv assets/js/vendor/twemoji.min.js.tmp assets/js/vendor/twemoji.min.js

clean:
	rm -rf public resources .hugo_build.lock

favicon:
	magick static/favicon.png -bordercolor white -border 0 \
		\( -clone 0 -resize 16x16 \) \
		\( -clone 0 -resize 32x32 \) \
		\( -clone 0 -resize 48x48 \) \
		\( -clone 0 -resize 64x64 \) \
		-delete 0 -alpha off -colors 256 static/favicon.ico

watch:
	hugo server --disableFastRender --watch --minify --environment $(ENVIRONMENT)

watch-drafts:
	hugo server --disableFastRender --watch --minify --buildDrafts --environment $(ENVIRONMENT)

watch-future:
	hugo server --disableFastRender --watch --minify --buildFuture --environment $(ENVIRONMENT)

watch-all:
	hugo server --disableFastRender --watch --minify --buildDrafts --buildFuture --environment $(ENVIRONMENT)

validate-name:
	@case "$${name}" in ''|*[!a-z0-9-]*|-*|*-) echo 'Provide name=lowercase-slug (letters, numbers and hyphens).'; exit 2;; esac

new: validate-name
	hugo new --kind "$${kind}" "content/posts/$(shell date +%Y/%m/%d)/$${name}/index.md"

new-publication: validate-name
	hugo new content --kind publication "publications/$${name}"
