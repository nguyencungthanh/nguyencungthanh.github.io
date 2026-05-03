---
title: Draft
date: 2026-05-15
categories:
  - projects 
tags:
  - Reinforcement Learning 
draft: True
---
<!--more--> 
```python 
import random
import re

def generate_svg(nodes_per_layer, distance_between_nodes=25):
    center_y = 400
    xs = [20, 90, 154, 220]
    
    layers_y = []
    for n in nodes_per_layer:
        total_height = (n - 1) * distance_between_nodes
        start_y = center_y - total_height / 2
        y_vals = [int(start_y + i * distance_between_nodes) for i in range(n)]
        layers_y.append(y_vals)
        
    svg = []
    svg.append('<svg viewBox="0 0 240 800">')
    
    # EDGES
    svg.append('  <!-- EDGES -->')
    svg.append('  <g class="edges">')
    
    edges_lists = []
    for i in range(len(nodes_per_layer) - 1):
        edges = []
        for y1 in layers_y[i]:
            for y2 in layers_y[i+1]:
                edges.append((y1, y2))
        edges_lists.append(edges)
        
    random.seed(42)
    for i, edges in enumerate(edges_lists):
        for y1, y2 in edges:
            cls = random.choice(["edge-pos", "edge-neg"])
            svg.append(f'    <path class="{cls}" d="M{xs[i]} {y1} L{xs[i+1]} {y2}"/>')
    svg.append('  </g>\n')
    
    # SIGNALS
    svg.append('  <!-- FLOW SIGNALS -->')
    svg.append('  <g class="signals">')
    
    dur = 3
    num_layers = len(nodes_per_layer)
    segment_duration = 1.0 / (num_layers - 1) # e.g. 1/3
    
    for i, edges in enumerate(edges_lists):
        start_ratio = i * segment_duration
        end_ratio = (i + 1) * segment_duration
        
        kt_start = round(start_ratio, 3)
        kt_end = round(end_ratio, 3)
        kt_fade_in = round(start_ratio + 0.05 * segment_duration, 3)
        kt_fade_out = round(end_ratio - 0.05 * segment_duration, 3)
        
        if i == 0:
            kp = [0, 1, 1]
            kt = [0, kt_end, 1]
            op_kt = [0, kt_fade_in, kt_fade_out, kt_end, 1]
            op_v = [0, 1, 1, 0, 0]
        elif i == num_layers - 2:
            kp = [0, 0, 1]
            kt = [0, kt_start, 1]
            op_kt = [0, kt_start, kt_fade_in, kt_fade_out, 1]
            op_v = [0, 0, 1, 1, 0]
        else:
            kp = [0, 0, 1, 1]
            kt = [0, kt_start, kt_end, 1]
            op_kt = [0, kt_start, kt_fade_in, kt_fade_out, kt_end, 1]
            op_v = [0, 0, 1, 1, 0, 0]
            
        kp_str = "; ".join(map(str, kp))
        kt_str = "; ".join(map(str, kt))
        op_kt_str = "; ".join(map(str, op_kt))
        op_v_str = "; ".join(map(str, op_v))

        for y1, y2 in edges:
            path_str = f"M{xs[i]} {y1} L{xs[i+1]} {y2}"
            svg.append(f'    <circle class="signal-l{i+1}" r="2.5" opacity="0">')
            svg.append(f'      <animateMotion dur="{dur}s" repeatCount="indefinite" calcMode="linear" keyPoints="{kp_str}" keyTimes="{kt_str}" path="{path_str}"/>')
            svg.append(f'      <animate attributeName="opacity" dur="{dur}s" repeatCount="indefinite" keyTimes="{op_kt_str}" values="{op_v_str}"/>')
            svg.append('    </circle>')
    
    svg.append('  </g>\n')

    # NODES
    svg.append('  <!-- NODES -->')
    svg.append('  <g class="nodes">')
    for i, y_vals in enumerate(layers_y):
        for y in y_vals:
            svg.append(f'    <circle class="node-l{i+1}" cx="{xs[i]}" cy="{y}"/>')
    svg.append('  </g>\n')
    svg.append('</svg>')
    
    return '\n'.join(svg)
with open('content/categories/projects/_index.md', 'r') as f:
    content = f.read()

# Modify the parameter for each layer and distance between node 
new_svg = generate_svg([5, 10, 7, 4], 30)
new_network = f'<div class="network left">\n{new_svg}\n</div>\n\n<div class="network right">\n{new_svg}\n</div>'

pattern = re.compile(r'<div class="network left">.*?</div>\n\n<div class="network right">.*?</div>', re.DOTALL)
new_content = pattern.sub(new_network, content)

with open('content/categories/projects/_index.md', 'w') as f:
    f.write(new_content)
```