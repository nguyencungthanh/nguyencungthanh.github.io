import random

def generate_svg():
    l1_y = [280, 340, 400, 460, 520]
    l2_y = [250, 310, 370, 430, 490, 550]
    l3_y = [250, 310, 370, 430, 490, 550]
    l4_y = [280, 340, 400, 460, 520]
    
    xs = [20, 86, 154, 220]
    
    svg = []
    svg.append('<svg viewBox="0 0 240 800">')
    
    # EDGES
    svg.append('  <!-- EDGES -->')
    svg.append('  <g class="edges">')
    
    edges_l1_l2 = []
    for y1 in l1_y:
        for y2 in l2_y: edges_l1_l2.append((y1, y2))
        
    edges_l2_l3 = []
    for y2 in l2_y:
        for y3 in l3_y: edges_l2_l3.append((y2, y3))
        
    edges_l3_l4 = []
    for y3 in l3_y:
        for y4 in l4_y: edges_l3_l4.append((y3, y4))
        
    random.seed(42) # For reproducible colors
    for y1, y2 in edges_l1_l2:
        cls = random.choice(["edge-pos", "edge-neg"])
        svg.append(f'    <path class="{cls}" d="M{xs[0]} {y1} L{xs[1]} {y2}"/>')
    for y2, y3 in edges_l2_l3:
        cls = random.choice(["edge-pos", "edge-neg"])
        svg.append(f'    <path class="{cls}" d="M{xs[1]} {y2} L{xs[2]} {y3}"/>')
    for y3, y4 in edges_l3_l4:
        cls = random.choice(["edge-pos", "edge-neg"])
        svg.append(f'    <path class="{cls}" d="M{xs[2]} {y3} L{xs[3]} {y4}"/>')
    svg.append('  </g>\n')
    
    # SIGNALS
    svg.append('  <!-- FLOW SIGNALS -->')
    svg.append('  <g class="signals">')
    
    # Wave 1 (L1 -> L2)
    for y1, y2 in edges_l1_l2:
        path_str = f"M{xs[0]} {y1} L{xs[1]} {y2}"
        svg.append('    <circle class="signal-l1" r="2.5" opacity="0">')
        svg.append(f'      <animateMotion dur="3s" repeatCount="indefinite" calcMode="linear" keyPoints="0; 1; 1" keyTimes="0; 0.333; 1" path="{path_str}"/>')
        svg.append('      <animate attributeName="opacity" dur="3s" repeatCount="indefinite" keyTimes="0; 0.05; 0.28; 0.333; 1" values="0; 1; 1; 0; 0"/>')
        svg.append('    </circle>')

    # Wave 2 (L2 -> L3)
    for y2, y3 in edges_l2_l3:
        path_str = f"M{xs[1]} {y2} L{xs[2]} {y3}"
        svg.append('    <circle class="signal-l2" r="2.5" opacity="0">')
        svg.append(f'      <animateMotion dur="3s" repeatCount="indefinite" calcMode="linear" keyPoints="0; 0; 1; 1" keyTimes="0; 0.333; 0.666; 1" path="{path_str}"/>')
        svg.append('      <animate attributeName="opacity" dur="3s" repeatCount="indefinite" keyTimes="0; 0.333; 0.383; 0.616; 0.666; 1" values="0; 0; 1; 1; 0; 0"/>')
        svg.append('    </circle>')

    # Wave 3 (L3 -> L4)
    for y3, y4 in edges_l3_l4:
        path_str = f"M{xs[2]} {y3} L{xs[3]} {y4}"
        svg.append('    <circle class="signal-l3" r="2.5" opacity="0">')
        svg.append(f'      <animateMotion dur="3s" repeatCount="indefinite" calcMode="linear" keyPoints="0; 0; 1" keyTimes="0; 0.666; 1" path="{path_str}"/>')
        svg.append('      <animate attributeName="opacity" dur="3s" repeatCount="indefinite" keyTimes="0; 0.666; 0.716; 0.95; 1" values="0; 0; 1; 1; 0"/>')
        svg.append('    </circle>')

    svg.append('  </g>\n')

    # NODES
    svg.append('  <!-- NODES -->')
    svg.append('  <g class="nodes">')
    for y in l1_y: svg.append(f'    <circle class="node-l1" cx="{xs[0]}" cy="{y}"/>')
    for y in l2_y: svg.append(f'    <circle class="node-l2" cx="{xs[1]}" cy="{y}"/>')
    for y in l3_y: svg.append(f'    <circle class="node-l3" cx="{xs[2]}" cy="{y}"/>')
    for y in l4_y: svg.append(f'    <circle class="node-l4" cx="{xs[3]}" cy="{y}"/>')
    svg.append('  </g>\n')
    svg.append('</svg>')
    
    return '\n'.join(svg)

import re
with open('content/categories/projects/_index.md', 'r') as f:
    content = f.read()

new_svg = generate_svg()
new_network = f'<div class="network left">\n{new_svg}\n</div>\n\n<div class="network right">\n{new_svg}\n</div>'

pattern = re.compile(r'<div class="network left">.*?</div>\n\n<div class="network right">.*?</div>', re.DOTALL)
new_content = pattern.sub(new_network, content)

with open('content/categories/projects/_index.md', 'w') as f:
    f.write(new_content)

