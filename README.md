# COMP 4302 Final Assignment

## Rishi Gandhi

## Student ID: 202014908

### What option I decided to do:
A one or two player game or a 3D implementation of a basic 2D arcade game in a retro-style implementation, but that displays elements that are very specific to, or customized to the members of the group.


1. **Properly Illuminated Scenario:**
   - The scene has two light sources: a directional light (`light`) and an ambient light.
   - One of the lights (directional light) can be toggled on and off using keyboard input by pressing the 'I' key (`toggleRoadLightVisibility()` function).
   - The system allows changing the position and color of the directional light using keyboard input ('Z', 'X' for position, and 'C' for color).

2. **Efficient, Intuitive Navigation:**
   - Navigation is facilitated through the use of OrbitControls, allowing intuitive mouse-based movement.
   - Additionally, keyboard inputs ('F', 'G', 'O', 'J', 'K', 'L') are provided for moving the camera in various directions.

3. **Use of Textures on Models:**
   - Textures are used for both the player cube (`playerTexture`) and the ground (`groundTexture`).

4. **Hierarchical Relationship with Moving Elements:**
   - Particles are generated around the player cube and move in a circular motion (`updateParticles()` function). These particles demonstrate a hierarchical relationship with the player cube.

5. **Novel Component:**
   - The novel component in this scenario is the use of particles (`particles`) that move in a circular motion around the player cube. This adds a visually appealing effect to the scene and demonstrates a simple form of particle systems.

6. **Video Requirement:**
   - While the code provided meets the technical requirements of the assignment, producing a video tutorial explaining the features of the assignment, including navigation controls, lighting toggles, particle effects, etc., would be necessary to fulfill this requirement.

Overall, the provided code demonstrates the implementation of various features required for the assignment, including lighting control, navigation, texture usage, hierarchical movement, and the inclusion of a novel component in the form of particle effects. Creating a video tutorial would complement the code by providing a comprehensive explanation of its features for distribution to the public.


# Total Grade Aimed For: 100%

Please read [Installation.md](https://github.com/iamrishigandhi/COMP-4302-Final-Assignment/blob/main/Installation.md) for instructions if you have trouble running the code.

Here are the [References & Sources](https://github.com/iamrishigandhi/COMP-4302-Final-Assignment/blob/main/References%20%26%20Sources.md)