import moderngl
import numpy as np
from PIL import Image

# Configuration
ICON_SIZE = (1024, 1024)

# Uniform Values (The "State" of the icon)
U_TIME = 4.0
U_VELOCITY = 0.0     # The shader clamps this * 0.01, so 50.0 becomes 0.5
U_IS_DRAWING = 0.0    # 1.0 for active, 0.0 for idle
U_EXIT_PROGRESS = 0.0 

# Simple Vertex Shader (Pass-through)
VERTEX_SHADER = """
#version 410 core
in vec2 in_vert;
out vec2 vTexCoord;
void main() {
    vTexCoord = in_vert * 0.5 + 0.5;
    gl_Position = vec4(in_vert, 0.0, 1.0);
}
"""

def render():
    # Setup offline context
    ctx = moderngl.create_standalone_context()

    # Load Fragment Shader
    with open('shader.frag', 'r') as f:
        fragment_code = f.read()

    # Create Program
    prog = ctx.program(
        vertex_shader=VERTEX_SHADER,
        fragment_shader=fragment_code,
    )

    # Set Uniforms
    if 'time' in prog: prog['time'].value = U_TIME
    if 'velocity' in prog: prog['velocity'].value = U_VELOCITY
    if 'isDrawing' in prog: prog['isDrawing'].value = U_IS_DRAWING
    if 'exitProgress' in prog: prog['exitProgress'].value = U_EXIT_PROGRESS

    # Create Full Screen Quad (2 triangles covering the screen)
    # Coordinates are x, y
    vertices = np.array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0,
    ], dtype='f4')

    vbo = ctx.buffer(vertices)
    vao = ctx.vertex_array(prog, [(vbo, '2f', 'in_vert')])

    # Create Framebuffer
    fbo = ctx.simple_framebuffer(ICON_SIZE, components=4)
    fbo.use()

    # Clear and Render
    ctx.clear(0.0, 0.0, 0.0, 0.0) # Transparent clear
    vao.render(moderngl.TRIANGLE_STRIP)

    # Read pixels and save
    data = fbo.read(components=4)
    image = Image.frombytes('RGBA', ICON_SIZE, data)
    
    # Flip because OpenGL origin is bottom-left, PIL is top-left
    image = image.transpose(Image.FLIP_TOP_BOTTOM)

    output_file = "icon.png"
    image.save(output_file)
    print(f"Saved {output_file} successfully!")

if __name__ == "__main__":
    render()

