import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from "dat.gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(1, 3, 5);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

class Box extends THREE.Mesh {
    constructor({
        width,
        height,
        depth,
        color = "#00ff00",
        velocity = {
            x: 0,
            y: 0,
            z: 0,
        },
        position = {
            x: 0,
            y: 0,
            z: 0,
        },
        zAcceleration = false,
        texture = null, // Add texture parameter
    }) {
        let material;
        if (texture) {
            material = new THREE.MeshStandardMaterial({ map: texture });
        } else {
            material = new THREE.MeshStandardMaterial({ color });
        }

        super(new THREE.BoxGeometry(width, height, depth), material);

        this.width = width;
        this.height = height;
        this.depth = depth;

        this.position.set(position.x, position.y, position.z);

        this.right = this.position.x + this.width / 2;
        this.left = this.position.x - this.width / 2;

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.front = this.position.z + this.depth / 2;
        this.back = this.position.z - this.depth / 2;

        this.velocity = velocity;
        this.gravity = -0.002;

        this.zAcceleration = zAcceleration;
    }

    updateSides() {
        this.right = this.position.x + this.width / 2;
        this.left = this.position.x - this.width / 2;

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.front = this.position.z + this.depth / 2;
        this.back = this.position.z - this.depth / 2;
    }

    update(ground) {
        this.updateSides();

        if (this.zAcceleration) this.velocity.z += 0.0003;

        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;

        this.applyGravity(ground);
    }

    applyGravity(ground) {
        this.velocity.y += this.gravity;

        if (
            boxCollision({
                box1: this,
                box2: ground,
            })
        ) {
            const friction = 0.5;
            this.velocity.y *= friction;
            this.velocity.y = -this.velocity.y;
        } else this.position.y += this.velocity.y;
    }
}

function boxCollision({ box1, box2 }) {
    const xCollision = box1.right >= box2.left && box1.left <= box2.right;
    const yCollision =
        box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
    const zCollision = box1.front >= box2.back && box1.back <= box2.front;

    return xCollision && yCollision && zCollision;
}

// Creat a texture for the player
const playerTexture = new THREE.TextureLoader().load("assets/player.jpeg");

const cube = new Box({
    width: 1,
    height: 1,
    depth: 1,
    velocity: {
        x: 0,
        y: -0.01,
        z: 0,
    },
    texture: playerTexture,
});
cube.castShadow = true;
scene.add(cube);

// Create a texture for the ground
const groundTexture = new THREE.TextureLoader().load("assets/ground.jpg");

const ground = new Box({
    width: 10,
    height: 0.5,
    depth: 50,
    position: {
        x: 0,
        y: -2,
        z: 0,
    },
    texture: groundTexture,
});

ground.receiveShadow = true;
scene.add(ground);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.y = 3;
light.position.z = 1;
light.castShadow = true;
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
};

window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "KeyA":
            keys.a.pressed = true;
            break;
        case "KeyD":
            keys.d.pressed = true;
            break;
        case "KeyS":
            keys.s.pressed = true;
            break;
        case "KeyW":
            keys.w.pressed = true;
            break;
        case "Space":
            cube.velocity.y = 0.1;
            break;
        case "KeyI":
            toggleRoadLightVisibility();
            break;
        case "KeyZ":
            // Move light left
            light.position.x -= 0.3;
            break;
        case "KeyX":
            // Move light right
            light.position.x += 0.3;
            break;
        case "KeyV":
            // Move light up
            light.position.y += 1;
            break;
        case "KeyB":
            // Move light down
            light.position.y -= 1;
            break;
        case "KeyN":
            // Move light forward
            light.position.z += 0.3;
            break;
        case "KeyM":
            // Move light backward
            light.position.z -= 0.3;
            break;
        case "KeyC":
            // Change light color to random color
            changeLightColor(getRandomColor());
            break;
        case "KeyF":
            // Move camera left
            camera.position.x -= 0.3;
            break;
        case "KeyG":
            // Move camera right
            camera.position.x += 0.3;
            break;
        case "KeyO":
            // Move camera up
            camera.position.y += 0.3;
            break;
        case "KeyJ":
            // Move camera down
            camera.position.y -= 0.3;
            break;
        case "KeyK":
            // Move camera forward
            camera.position.z += 0.3;
            break;
        case "KeyL":
            // Move camera backward
            camera.position.z -= 0.3;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "KeyA":
            keys.a.pressed = false;
            break;
        case "KeyD":
            keys.d.pressed = false;
            break;
        case "KeyS":
            keys.s.pressed = false;
            break;
        case "KeyW":
            keys.w.pressed = false;
            break;
    }
});

// Creat Enemies
const enemies = [];

// Create particles
const numParticles = 10;
const particles = [];
const particleTexture = new THREE.TextureLoader().load("assets/particle.jpg");

for (let i = 0; i < numParticles; i++) {
    const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.15),
        new THREE.MeshStandardMaterial({ map: particleTexture })
    );
    particle.position.set(i - numParticles / 2.5, 1, 0); // Set initial relative position to main cube
    cube.add(particle); // Add particles to main cube
    particles.push(particle); // Store particle for updates
}

function updateParticles() {
    const radius = 1; // Radius of the circle
    const angularSpeed = 0.025; // Angular speed
    const heightAboveCube = 2; // The height above the cube of the particles

    // Update position of particles relative to main cube
    particles.forEach((particle, index) => {
        // Calculate angle based on index to distribute particles evenly around the circle
        const angle = (index / particles.length) * Math.PI * 2;

        // Calculate the center of rotation (assumed to be at the center of the cube)
        const centerX = cube.position.y;
        const centerY = cube.position.y + heightAboveCube;
        const centerZ = cube.position.y;

        // Calculate new position in circular motion around the center of rotation
        const x =
            centerX + radius * Math.cos(angle + frames * angularSpeed) + 1.25;
        const y = centerY;
        const z =
            centerZ + radius * Math.sin(angle + frames * angularSpeed) + 1.25;

        // Set particle position
        particle.position.set(x, y, z);
    });
}

let frames = 0;
let spawnRate = 300;
function animate() {
    const animationId = requestAnimationFrame(animate);

    // Update Particles
    updateParticles();

    renderer.render(scene, camera);

    cube.velocity.x = 0;
    cube.velocity.z = 0;
    if (keys.a.pressed) cube.velocity.x = -0.05;
    else if (keys.d.pressed) cube.velocity.x = 0.05;
    else if (keys.s.pressed) cube.velocity.z = 0.05;
    else if (keys.w.pressed) cube.velocity.z = -0.05;

    cube.update(ground);
    enemies.forEach((enemy) => {
        enemy.update(ground);
        if (
            boxCollision({
                box1: cube,
                box2: enemy,
            })
        ) {
            cancelAnimationFrame(animationId);
        }
    });

    if (frames % spawnRate === 0) {
        if (spawnRate > 50) spawnRate -= 50;
        const enemyTexture = new THREE.TextureLoader().load("assets/enemy.jpg");

        const enemy = new Box({
            width: 1,
            height: 1,
            depth: 1,
            position: {
                x: (Math.random() - 0.5) * 10,
                y: 0,
                z: -20,
            },
            velocity: {
                x: 0,
                y: 0,
                z: 0.005,
            },
            zAcceleration: true,
            texture: enemyTexture,
        });
        enemy.castShadow = true;
        scene.add(enemy);
        enemies.push(enemy);
    }

    frames++;
}
animate();

// Add a variable to track the state of the light
let isLightVisible = true;

// Function to generate a random hex color
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to toggle the visibility of the light
function toggleRoadLightVisibility() {
    isLightVisible = !isLightVisible;
    light.visible = isLightVisible;
}

// Function to change light position
function changeLightPosition(x, y, z) {
    light.position.set(x, y, z);
}

// Function to change light color
function changeLightColor(colorHex) {
    light.color.set(colorHex);
}

// Function to change light intensity
function changeLightIntensity(intensity) {
    light.intensity = intensity;
}

// Create GUI
const gui = new dat.GUI();

// Add a folder for light controls
const lightFolder = gui.addFolder("Light Controls");
lightFolder
    .add({ toggleLight: toggleRoadLightVisibility }, "toggleLight")
    .name("Click here to toggle Road Light Visibility");

// Add control for light intensity
lightFolder.add(light, "intensity", 0, 10).onChange((value) => {
    // Call changeLightIntensity when intensity changes
    changeLightIntensity(value);
});

// Add controls for light position
const lightPositionFolder = lightFolder.addFolder("Light Position");
lightPositionFolder.add(light.position, "x", -10, 10).onChange(() => {
    // Call changeLightPosition when x position changes
    changeLightPosition(light.position.x, light.position.y, light.position.z);
});
lightPositionFolder.add(light.position, "y", -10, 10).onChange(() => {
    // Call changeLightPosition when y position changes
    changeLightPosition(light.position.x, light.position.y, light.position.z);
});
lightPositionFolder.add(light.position, "z", -10, 10).onChange(() => {
    // Call changeLightPosition when z position changes
    changeLightPosition(light.position.x, light.position.y, light.position.z);
});

// Add control for light color
lightPositionFolder
    .addColor({ color: light.color.getHex() }, "color")
    .onChange((value) => {
        // Call changeLightColor when color changes
        changeLightColor(value);
    });

// Add controls for camera position
const cameraFolder = gui.addFolder("Camera Position");
cameraFolder.add(camera.position, "x", -10, 10).onChange(() => {
    // Update camera position when x position changes
    camera.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
    );
});
cameraFolder.add(camera.position, "y", -10, 10).onChange(() => {
    // Update camera position when y position changes
    camera.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
    );
});
cameraFolder.add(camera.position, "z", -10, 10).onChange(() => {
    // Update camera position when z position changes
    camera.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
    );
});

cameraFolder.open();
lightFolder.open();
lightPositionFolder.open();
