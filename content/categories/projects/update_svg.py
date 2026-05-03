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
    svg.append('<svg viewBox="0 0 240 800" xmlns="http://www.w3.org/2000/svg">')
    
    # ---------------------------------------------------------
    # OPTIMIZATION 1: Generate GPU-Accelerated CSS Keyframes
    # ---------------------------------------------------------
    dur = 2
    num_layers = len(nodes_per_layer)
    segment_duration = 1.0 / (num_layers - 1) 
    
    svg.append('  <style>')
    # Base class for hardware acceleration
    svg.append('    .signal { will-change: transform, opacity; }')
    
    for i in range(num_layers - 1):
        start_ratio = i * segment_duration
        end_ratio = (i + 1) * segment_duration
        
        # Convert ratios to percentages for CSS
        p_start = round(start_ratio * 100, 2)
        p_end = round(end_ratio * 100, 2)
        p_fade_in = round((start_ratio + 0.05 * segment_duration) * 100, 2)
        p_fade_out = round((end_ratio - 0.05 * segment_duration) * 100, 2)
        
        svg.append(f'    .signal-l{i+1} {{ animation: flow-l{i} {dur}s infinite linear; }}')
        
        svg.append(f'    @keyframes flow-l{i} {{')
        if p_start > 0:
            svg.append(f'      0%, {p_start}% {{ transform: translate(var(--x1), var(--y1)); opacity: 0; }}')
        else:
            svg.append(f'      0% {{ transform: translate(var(--x1), var(--y1)); opacity: 0; }}')
            
        svg.append(f'      {p_fade_in}% {{ opacity: 1; }}')
        svg.append(f'      {p_fade_out}% {{ opacity: 1; }}')
        
        if p_end < 100:
            svg.append(f'      {p_end}%, 100% {{ transform: translate(var(--x2), var(--y2)); opacity: 0; }}')
        else:
            svg.append(f'      100% {{ transform: translate(var(--x2), var(--y2)); opacity: 0; }}')
        svg.append('    }')
    svg.append('  </style>\n')
    
    
    edges_lists = []
    for i in range(len(nodes_per_layer) - 1):
        edges = []
        for y1 in layers_y[i]:
            for y2 in layers_y[i+1]:
                edges.append((y1, y2))
        edges_lists.append(edges)
        
    # ---------------------------------------------------------
    # OPTIMIZATION 2: Combine Paths to drastically reduce DOM nodes
    # ---------------------------------------------------------
    svg.append('  <!-- EDGES -->')
    svg.append('  <g class="edges">')
    
    random.seed(42)
    for i, edges in enumerate(edges_lists):
        pos_paths = []
        neg_paths = []
        for y1, y2 in edges:
            cls = random.choice(["pos", "neg"])
            path_cmd = f"M{xs[i]} {y1} L{xs[i+1]} {y2}"
            if cls == "pos":
                pos_paths.append(path_cmd)
            else:
                neg_paths.append(path_cmd)
                
        # Append combined paths instead of individual ones
        if pos_paths:
            svg.append(f'    <path class="edge-pos" d="{" ".join(pos_paths)}"/>')
        if neg_paths:
            svg.append(f'    <path class="edge-neg" d="{" ".join(neg_paths)}"/>')
    svg.append('  </g>\n')
    
    # ---------------------------------------------------------
    # OPTIMIZATION 3: Use CSS Variables instead of <animateMotion>
    # ---------------------------------------------------------
    svg.append('  <!-- FLOW SIGNALS -->')
    svg.append('  <g class="signals">')
    
    for i, edges in enumerate(edges_lists):
        for y1, y2 in edges:
            # We inject the coordinates into CSS variables (--x1, --y1, etc.)
            style_str = f"--x1:{xs[i]}px; --y1:{y1}px; --x2:{xs[i+1]}px; --y2:{y2}px;"
            svg.append(f'    <circle class="signal signal-l{i+1}" r="2.5" cx="0" cy="0" opacity="0" style="{style_str}"/>')
            
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
new_svg = generate_svg([4, 6, 6, 3], 40)
new_network = f'<div class="network left">\n{new_svg}\n</div>\n\n<div class="network right">\n{new_svg}\n</div>'

pattern = re.compile(r'<div class="network left">.*?</div>\n\n<div class="network right">.*?</div>', re.DOTALL)
new_content = pattern.sub(new_network, content)

with open('content/categories/projects/_index.md', 'w') as f:
    f.write(new_content)