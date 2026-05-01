def generate_svg():
    l1_y = [160, 280, 400, 520, 640]
    l2_y = [100, 220, 340, 460, 580, 700]
    l3_y = [100, 220, 340, 460, 580, 700]
    l4_y = [160, 280, 400, 520, 640]
    
    xs = [20, 86, 154, 220]
    
    svg = []
    svg.append('<svg viewBox="0 0 240 800">')
    
    # Edges
    svg.append('  <!-- EDGES -->')
    svg.append('  <g class="edges">')
    # L1 to L2
    for y1 in l1_y:
        for y2 in l2_y:
            svg.append(f'    <path d="M{xs[0]} {y1} L{xs[1]} {y2}"/>')
    # L2 to L3
    for y2 in l2_y:
        for y3 in l3_y:
            svg.append(f'    <path d="M{xs[1]} {y2} L{xs[2]} {y3}"/>')
    # L3 to L4
    for y3 in l3_y:
        for y4 in l4_y:
            svg.append(f'    <path d="M{xs[2]} {y3} L{xs[3]} {y4}"/>')
    svg.append('  </g>\n')
    
    # Signals
    svg.append('  <!-- FORWARD SIGNALS -->')
    svg.append('  <g class="signals">')
    
    fwd_paths = [
        [l1_y[0], l2_y[1], l3_y[2], l4_y[1]],
        [l1_y[2], l2_y[3], l3_y[4], l4_y[3]],
        [l1_y[4], l2_y[5], l3_y[3], l4_y[4]],
        [l1_y[1], l2_y[0], l3_y[0], l4_y[0]]
    ]
    delays = [0, 0.7, 1.4, 2.1]
    
    for i, p in enumerate(fwd_paths):
        path_str = f"M{xs[0]} {p[0]} L{xs[1]} {p[1]} L{xs[2]} {p[2]} L{xs[3]} {p[3]}"
        svg.append('    <circle class="forward" r="3">')
        svg.append(f'      <animateMotion dur="3s" repeatCount="indefinite" begin="{delays[i]}s" path="{path_str}"/>')
        svg.append('    </circle>')
        
    svg.append('  </g>\n')
    
    svg.append('  <!-- BACKWARD SIGNALS -->')
    svg.append('  <g class="signals">')
    bwd_paths = [
        [l4_y[0], l3_y[1], l2_y[2], l1_y[1]],
        [l4_y[2], l3_y[2], l2_y[3], l1_y[3]],
        [l4_y[4], l3_y[5], l2_y[4], l1_y[4]],
        [l4_y[1], l3_y[0], l2_y[1], l1_y[2]]
    ]
    delays_bwd = [0.3, 1.1, 1.8, 2.5]
    for i, p in enumerate(bwd_paths):
        path_str = f"M{xs[3]} {p[0]} L{xs[2]} {p[1]} L{xs[1]} {p[2]} L{xs[0]} {p[3]}"
        svg.append('    <circle class="backward" r="3">')
        svg.append(f'      <animateMotion dur="3s" repeatCount="indefinite" begin="{delays_bwd[i]}s" path="{path_str}"/>')
        svg.append('    </circle>')
    svg.append('  </g>\n')

    # Nodes
    svg.append('  <!-- NODES -->')
    svg.append('  <g class="nodes">')
    for y in l1_y:
        svg.append(f'    <circle class="node-l1" cx="{xs[0]}" cy="{y}"/>')
    for y in l2_y:
        svg.append(f'    <circle class="node-l2" cx="{xs[1]}" cy="{y}"/>')
    for y in l3_y:
        svg.append(f'    <circle class="node-l3" cx="{xs[2]}" cy="{y}"/>')
    for y in l4_y:
        svg.append(f'    <circle class="node-l4" cx="{xs[3]}" cy="{y}"/>')
    svg.append('  </g>\n')
    
    svg.append('</svg>')
    
    with open('svg_out.txt', 'w') as f:
        f.write('\n'.join(svg))

generate_svg()
