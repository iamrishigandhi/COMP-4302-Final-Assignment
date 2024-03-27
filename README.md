# COMP 4302 Final Assignment

## Rishi Gandhi

## Student ID: 202014908

### What option I decided to do:
A one or two player game or a 3D implementation of a basic 2D arcade game in a retro-style implementation, but that displays elements that are very specific to, or customized to the members of the group.

### 1. Properly Illuminated Scenario:
   - The scene has two light sources: a directional light (`light`) and an ambient light.
   - One of the lights (directional light) can be toggled on and off using keyboard input by pressing the 'I' key (`toggleRoadLightVisibility()` function).
   - Additonally, it can also be done using the toggle in the GUI.
   - The system allows changing the position and color of the directional light to a random color by pressing 'C'.
   - The light can be set to a specific color using the GUI.
   - The system also allows to change the directional light position using the keyboard with 'Z' to move it left, 'X' to move it right, 'V' to move it up, 'B' to move it down, 'N' to move it forward, and 'M' to move it backward.
   - This can also be done via sliders in the GUI.

### 2. Efficient, Intuitive Navigation:
   - Navigation is facilitated through the use of OrbitControls, allowing intuitive mouse-based movement.
   - Additionally, keyboard inputs ('F', 'G', 'O', 'J', 'K', 'L') are provided for moving the camera in various directions.
   - 'F' to move camera left
   - 'G' to move camera right
   - 'O' to move camera up
   - 'J' to move camera down
   - 'K' to move camera forward
   - 'L' to move camera backward

### 3. Use of Textures on Models:
   - Textures are used for the player cube (`playerTexture`), the enemies (`enemyTexture`), the particle system (`particleTexture`) and the ground (`groundTexture`).

### 4. Hierarchical Relationship with Moving Elements:
   - Particles are generated around the player cube and move in a circular motion (`updateParticles()` function). These particles demonstrate a hierarchical relationship with the player cube.

### 5. Novel Component:
   - The novel component in this scenario is the use of particles (`particles`) that move in a circular motion around the player cube. This adds a visually appealing effect to the scene and demonstrates a simple form of particle systems.
   - The code also demonstrates collision detection as part of the game functionality as another novel component. The game stops if the player collides with the enemy.

### 6. Video Requirement:
   - Video requirement: Produce a 5-minute video that is designed to be distributed to the public, where you explain how to achieve the features of your assignment. You should even feel free to post your submission directly on a free-access video platform and provide the link. The winners of the competition (up to three groups may be chosen) will earn 10% extra points, will be featured in class, and will earn bragging rights.
   - Here is the link to the [Youtube Video]() for my submission.


# Total Grade Aimed For: 100%

Please read [Installation.md](https://github.com/iamrishigandhi/COMP-4302-Final-Assignment/blob/main/Installation.md) for instructions if you have trouble running the code.

Here are the [References & Sources](https://github.com/iamrishigandhi/COMP-4302-Final-Assignment/blob/main/References%20%26%20Sources.md)
