"""Generate a tiny, deterministic RBF-SVM training animation (Python stdlib only).

Run from the repository root. Training and contour extraction happen here;
visitors only play back the resulting SVG paths, including a no-JS final state.
"""
import json
import math
import random
from pathlib import Path

rng = random.Random(21)
points = []
# Two interleaving, thick crescent clouds, matching the reference geometry.
for label in (1, -1):
    for band in (0, 1):
        for i in range(24):
            angle = math.pi * (i + .15 + rng.uniform(-.1, .1)) / 23.3
            radius = (.91 if band == 0 else 1.06) + rng.uniform(-.025, .025)
            x, y = radius * math.cos(angle), radius * math.sin(angle)
            if label == -1:
                x, y = 1 - x, .42 - y
            points.append((x, y + rng.uniform(-.025, .025), label))

n = len(points)
gamma, penalty = 1.2, 8.0
kernel = [[math.exp(-gamma * ((x - u) ** 2 + (y - v) ** 2))
           for u, v, _ in points] for x, y, _ in points]
alpha = [0.] * n
bias = 0.
updates = 0
snapshots = []

def predict(i):
    return sum(alpha[j] * points[j][2] * kernel[j][i] for j in range(n)) + bias

def record():
    snapshots.append((alpha[:], bias, updates))

# Simplified SMO: optimize a feasible pair of dual variables at each update.
for sweep in range(800):
    changed = 0
    for i in range(n):
        yi = points[i][2]
        ei = predict(i) - yi
        if not ((yi * ei < -.0001 and alpha[i] < penalty) or
                (yi * ei > .0001 and alpha[i] > 0)):
            continue
        candidates = list(range(n))
        rng.shuffle(candidates)
        candidates.sort(key=lambda j: abs(ei - (predict(j) - points[j][2])), reverse=True)
        for j in candidates:
            if i == j:
                continue
            yj = points[j][2]
            ej = predict(j) - yj
            ai, aj = alpha[i], alpha[j]
            if yi != yj:
                lo, hi = max(0., aj - ai), min(penalty, penalty + aj - ai)
            else:
                lo, hi = max(0., ai + aj - penalty), min(penalty, ai + aj)
            eta = kernel[i][i] + kernel[j][j] - 2 * kernel[i][j]
            if hi - lo < 1e-10 or eta <= 0:
                continue
            new_j = min(hi, max(lo, aj + yj * (ei - ej) / eta))
            if abs(new_j - aj) < 1e-7:
                continue
            new_i = ai + yi * yj * (aj - new_j)
            b1 = bias - ei - yi * (new_i - ai) * kernel[i][i] - yj * (new_j - aj) * kernel[i][j]
            b2 = bias - ej - yi * (new_i - ai) * kernel[i][j] - yj * (new_j - aj) * kernel[j][j]
            bias = b1 if 0 < new_i < penalty else b2 if 0 < new_j < penalty else (b1 + b2) / 2
            alpha[i], alpha[j] = new_i, new_j
            updates += 1
            changed += 1
            if updates in (1, 2, 4, 7, 11, 18, 28, 45, 75, 120):
                record()
            break
    if not changed:
        break
record()

# Validate feasibility, classification, and the final SVM KKT conditions.
assert all(-1e-8 <= a <= penalty + 1e-8 for a in alpha)
assert abs(sum(a * p[2] for a, p in zip(alpha, points))) < 1e-7
assert all(points[i][2] * predict(i) > 0 for i in range(n))
for i, a in enumerate(alpha):
    margin = points[i][2] * predict(i)
    if a < 1e-6:
        assert margin >= 1 - .002
    elif a > penalty - 1e-6:
        assert margin <= 1 + .002
    else:
        assert abs(margin - 1) < .002

# Marching squares, with shared edge keys to join segments into compact paths.
size = 65
xlow, xhigh, ylow, yhigh = -1.35, 2.35, -.9, 1.4
xgrid = [xlow + (xhigh - xlow) * i / (size - 1) for i in range(size)]
ygrid = [ylow + (yhigh - ylow) * i / (size - 1) for i in range(size)]
features = [[math.exp(-gamma * ((x - px) ** 2 + (y - py) ** 2))
             for px, py, _ in points] for y in ygrid for x in xgrid]

def screen(x, y):
    return (22 + (x - xlow) / (xhigh - xlow) * 208, 210 - (y - ylow) / (yhigh - ylow) * 188)

def contours(values, level):
    segments = []
    coords = {}
    for row in range(size - 1):
        for col in range(size - 1):
            ids = [row * size + col, row * size + col + 1,
                   (row + 1) * size + col + 1, (row + 1) * size + col]
            corners = [(xgrid[col], ygrid[row]), (xgrid[col + 1], ygrid[row]),
                       (xgrid[col + 1], ygrid[row + 1]), (xgrid[col], ygrid[row + 1])]
            crossings = []
            for a, b in [(0, 1), (1, 2), (2, 3), (3, 0)]:
                va, vb = values[ids[a]], values[ids[b]]
                if (va > level) == (vb > level):
                    continue
                key = tuple(sorted((ids[a], ids[b])))
                t = (level - va) / (vb - va)
                coords[key] = screen(*(corners[a][axis] + t * (corners[b][axis] - corners[a][axis]) for axis in (0, 1)))
                crossings.append(key)
            if len(crossings) == 2:
                segments.append(crossings)
            elif len(crossings) == 4:
                # Resolve the ambiguous saddle according to the cell center.
                if (sum(values[i] for i in ids) / 4 > level) == (values[ids[0]] > level):
                    segments.extend([[crossings[0], crossings[1]], [crossings[2], crossings[3]]])
                else:
                    segments.extend([[crossings[0], crossings[3]], [crossings[1], crossings[2]]])
    adjacency = {}
    for a, b in segments:
        adjacency.setdefault(a, []).append(b)
        adjacency.setdefault(b, []).append(a)
    paths = []
    while adjacency:
        start = next((key for key, edges in adjacency.items() if len(edges) == 1), next(iter(adjacency)))
        line = [start]
        current = start
        while current in adjacency and adjacency[current]:
            following = adjacency[current].pop()
            if not adjacency[current]:
                del adjacency[current]
            adjacency[following].remove(current)
            if not adjacency[following]:
                del adjacency[following]
            line.append(following)
            current = following
            if current == start:
                break
        path = 'M' + 'L'.join(f'{coords[key][0]:.1f},{coords[key][1]:.1f}' for key in line)
        if line[-1] == line[0]:
            path += 'Z'
        paths.append(path)
    return ''.join(paths)

frames = []
for weights, intercept, step in snapshots:
    coefficients = [weights[i] * points[i][2] for i in range(n)]
    values = [sum(c * feature for c, feature in zip(coefficients, vector)) + intercept for vector in features]
    scores = [sum(coefficients[j] * kernel[j][i] for j in range(n)) + intercept for i in range(n)]
    frames.append({
        'step': step,
        'boundary': contours(values, 0),
        'support': [i for i, a in enumerate(weights) if a > 1e-5],
        'correct': sum(points[i][2] * scores[i] > 0 for i in range(n)),
    })
assert frames[-1]['boundary'] and frames[-1]['correct'] == n
result = {'points': [{'x': round(screen(x, y)[0], 2), 'y': round(screen(x, y)[1], 2), 'label': label} for x, y, label in points], 'frames': frames}
output = Path('assets/js/decorations/kernel-svm-data.json')
output.write_text(json.dumps(result, separators=(',', ':')) + '\n')
print(f'{len(frames)} training frames; {updates} SMO updates; {len(frames[-1]["support"])} support vectors; {output.stat().st_size} bytes')
