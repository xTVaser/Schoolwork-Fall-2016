/*
    Graphics Assignment 1
    Group Members: Justin, Tyler, Will, Michael, Guy
*/

//Create Variables related to scene.
var camera, scene, renderer;
var walls;
var container;

//Variable for entering keys.
var keyState = [];

//Asteroid Options
var numOfAsteroids = 10;
var activeAsteroids = 0;
var asteroids = [];
var asteroidSpeedX = [];
var asteroidSpeedY = [];
var asteroidRot = [];
var asteroidScale = [];
var asteroidMat = [];

//Ship Options
var ship;
var projectile = [];
var projectileCount = 0;
var shooting = false;

//Players Score
var points = 0;

//Audio files
var music = new Audio('music/vapor.ogg');
var laser = new Audio('music/laser.ogg');
var explode = new Audio('music/explosion.ogg');

//Text Variables
var scoreText, scoreNumber, companyName;
var scoreMesh;


//Onload Function
function main() {
        init();
        update();
}

//Initialize Function
function init() {

        //Begin Playing background music, and add canvas to specific div element.
        music.play();
        container = document.getElementById('myCanvas');
        document.body.appendChild(container);

        //WebGL renderer size 600x450
        renderer = new THREE.WebGLRenderer({
                antialias: true
        });
        renderer.setPixelRatio(600 / 450);
        renderer.setSize(600, 450);
        container.appendChild(renderer.domElement);


        //orthographic camera used to have a direct connection with the canvas dimensions and the world coordinates (used for bounds checking during movment)
        camera = new THREE.OrthographicCamera(-300, 300, 225, -225, 0.1, 1000);
        camera.position.z = 100;

        scene = new THREE.Scene();

        //initialize keyState array to false meaning no key is down
        for (i = 0; i < 1024; i++) {
                keyState[i] = false;
        }

        //player ship
        var shipGeo = new THREE.Geometry();
        shipGeo.vertices.push(
                new THREE.Vector3(0, 2, 0),
                new THREE.Vector3(-1, -1, 0),
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(1, -1, 0),
                new THREE.Vector3(0, 2, 0)
        );
        var shipMat = new THREE.LineBasicMaterial({
                color: 0xFFFFFF
        });
        ship = new THREE.Line(shipGeo, shipMat);

        //scale is altered because we originally create the objects smaller than the size we intend them to be
        ship.scale.x = 5;
        ship.scale.y = 5;
        scene.add(ship);

        //Multi-Colored Galaxies
        for (var i = 0; i < 25; i++) {
                //Randomly placed in the scene, and varied size.
                var x = Math.floor(Math.random() * 600) - 300;
                var y = Math.floor(Math.random() * 450) - 225;
                var size = Math.random() * 4.5;

                //Create a point, create a random color, and add to the scene.
                var pointGeometry = new THREE.Geometry();
                pointGeometry.vertices.push(new THREE.Vector3(x, y, 0));
                var pointMaterial = new THREE.PointsMaterial({
                        size: size,
                        sizeAttenuation: false,
                        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
                });
                var point = new THREE.Points(pointGeometry, pointMaterial);
                scene.add(point);
        }

        //White Stars, same as above but 300, much smaller, and all white.
        for (var i = 0; i < 300; i++) {
                var x = Math.floor(Math.random() * 600) - 300;
                var y = Math.floor(Math.random() * 450) - 225;

                var size = Math.random() * 2;

                var pointGeometry = new THREE.Geometry();
                pointGeometry.vertices.push(new THREE.Vector3(x, y, 0));
                var pointMaterial = new THREE.PointsMaterial({
                        size: size,
                        sizeAttenuation: false,
                        color: '#FFF'
                });
                var point = new THREE.Points(pointGeometry, pointMaterial);
                scene.add(point);
        }

        //Create score heading text.
        createText(scoreText, "Score: ", "FFF", 15, 15, 0.5, -297, 205, 0);

        //Create the initial score text options manually so we can edit it later.
        scoreNumber = new THREE.TextGeometry(points, {

                size: 15,
                height: 15,
                curveSegments: 4,

                font: 'droid sans',
                weight: "normal",
                style: "normal",

                bevelThickness: 0.5,
                bevelSize: 1,
                bevelEnabled: true,

                material: 0,
                extrudeMaterial: 1
        });

        //Create a new basic material so we dont need a light, off-white color.
        material = new THREE.MeshBasicMaterial({
                color: "#" + "FAF216"
        });

        scoreMesh = new THREE.Mesh(scoreNumber, material);

        scoreMesh.position.x = -210;
        scoreMesh.position.y = 204;
        scoreMesh.position.z = 0;

        scene.add(scoreMesh);

        //Create company logo text
        createText(companyName, "© GoodIdea Games", "648691", 8, 8, 0.5, -50, -220, 0);

        //spawn the asteroids
        spawnAsteroids();

        //event listeners for movement and firing
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);
}

/*
        Geometry - Object to hold font settings.
        Text - Text desired to be displayed
        Color - Color of Text
        Size - Size of Text
        Height - Height of Text
        Thickness - Thickness of bevelSize
        xPos - X Axis position
        yPos - Y Axis position
        zPos - Z Axis position
*/
function createText(geometry, text, color, size, height, thickness, xPos, yPos, zPos) {
        geometry = new THREE.TextGeometry(text, {

                size: size,
                height: height,
                curveSegments: 4,

                font: 'droid sans',
                weight: "normal",
                style: "normal",

                bevelThickness: 0.5,
                bevelSize: thickness,
                bevelEnabled: true,

                material: 0,
                extrudeMaterial: 1
        });

        material = new THREE.MeshBasicMaterial({
                color: "#" + color
        });

        textMesh1 = new THREE.Mesh(geometry, material);

        textMesh1.position.x = xPos;
        textMesh1.position.y = yPos;
        textMesh1.position.z = zPos;

        scene.add(textMesh1);
}

//Function to update the score value, basically recreates the score text, given a value.
function updateScore(pts) {
        scoreNumber = new THREE.TextGeometry(pts, {

                size: 15,
                height: 15,
                curveSegments: 4,

                font: 'droid sans',
                weight: "normal",
                style: "normal",

                bevelThickness: 0.5,
                bevelSize: 1,
                bevelEnabled: true,

                material: 0,
                extrudeMaterial: 1
        });

        scoreNumber.computeBoundingBox();
        scoreNumber.computeVertexNormals();

        material = new THREE.MeshBasicMaterial({
                color: "#" + "FAF216"
        });

        scoreMesh = new THREE.Mesh(scoreNumber, material);

        scoreMesh.position.x = -210;
        scoreMesh.position.y = 204;
        scoreMesh.position.z = 0;

        scene.add(scoreMesh);
}

//Function used to spawn asteroids in the scene.
function spawnAsteroids() {
        //base asteroid verticies
        var asteroidGeo = new THREE.Geometry();
        asteroidGeo.vertices.push(
                new THREE.Vector3(0, -4, 0),
                new THREE.Vector3(-2, -2, 0),
                new THREE.Vector3(-6, -2, 0),
                new THREE.Vector3(-6, 2, 0),
                new THREE.Vector3(-2, 4, 0),
                new THREE.Vector3(-2, 6, 0),
                new THREE.Vector3(4, 6, 0),
                new THREE.Vector3(4, 2, 0),
                new THREE.Vector3(6, 0, 0),
                new THREE.Vector3(4, -4, 0),
                new THREE.Vector3(0, -4, 0)
        );

        //randomly spawn asteroids -- each will be scaled differently and will then float around
        for (var i = 0; i < numOfAsteroids; i++) {
                //White lined asteroid
                asteroidMat[i] = new THREE.LineBasicMaterial({
                        color: 0xFFFFFF
                });

                asteroids[i] = new THREE.Line(asteroidGeo, asteroidMat[i]);

                //Random position
                asteroids[i].position.x = Math.random() * (300 - -300) + -300;
                asteroids[i].position.y = Math.random() * (225 - -225) + -225;

                //Random rotation.
                asteroids[i].rotation.z = Math.random() * 2 * 3.14;

                //Random size.
                asteroidScale[i] = Math.random() * (5 - 1) + 1;
                asteroids[i].scale.x = asteroidScale[i];
                asteroids[i].scale.y = asteroidScale[i];

                asteroidRot[i] = Math.random() * (0.01 - -0.01) + -0.01;

                //the movement speed of the asteroids
                asteroidSpeedX[i] = Math.random() * (0.5 - -0.5) + -0.5;
                asteroidSpeedY[i] = Math.random() * (0.5 - -0.5) + -0.5;

                scene.add(asteroids[i]);

                //Increment active asteroids so they can be animated.
                activeAsteroids++;
        }
}


//updates ever frame used for animation and input handling
function update() {
        requestAnimationFrame(update);

        //get input
        handleInput();

        //move the asteroids around the scene and ensure they dont go out of view
        for (i = 0; i < activeAsteroids; i++) {
                //Change position of asteroid
                asteroids[i].position.x += asteroidSpeedX[i];
                asteroids[i].position.y += asteroidSpeedY[i];
                //If it hits the left or right bounds, invert its position to the other side of the canvas.
                if (asteroids[i].position.x > 330 || asteroids[i].position.x < -330) {
                        asteroids[i].position.x = -asteroids[i].position.x;
                }
                //Likewise for the up and down bounds
                if (asteroids[i].position.y > 255 || asteroids[i].position.y < -255) {
                        asteroids[i].position.y = -asteroids[i].position.y;
                }
                asteroids[i].rotateZ(asteroidRot[i]);
        }

        //keep the ship in view by negating its position if it crosses a bound
        if (ship.position.x > 310 || ship.position.x < -310) {
                ship.position.x *= -1;
        }
        if (ship.position.y > 235 || ship.position.y < -235) {
                ship.position.y *= -1;
        }

        //if the player killed all of the asteroids spawn more
        if (activeAsteroids <= 0) {
                spawnAsteroids();
        }

        //Disabled functionality as it causes a lot of performance issues.
        //checkCollision();

        //render the scene
        renderer.render(scene, camera);
}

//handles keydown events
function onKeyDown(event) {
        keyState[event.keyCode || event.charCode] = true;
}

//handles keyup events
function onKeyUp(event) {
        keyState[event.keyCode || event.charCode] = false;
}

//checks if the user hit specific keys for movement and firing controls
function handleInput() {

        //movement and rotation WASD
        if (keyState['a'.charCodeAt(0) - 32]) {
                ship.rotateZ(0.1);
        }
        if (keyState['d'.charCodeAt(0) - 32]) {
                ship.rotateZ(-0.1);
        }
        if (keyState['w'.charCodeAt(0) - 32]) {
                ship.translateY(2);
        }
        if (keyState['s'.charCodeAt(0) - 32]) {
                ship.translateY(-2);
        }

        //spacebar to shoot
        if (keyState[32]) {
                laser.play();
                shoot();
        }

        //check move projectiles forward and check for collision with asteroids
        for (i = 0; i < projectileCount; i++) {
                projectile[i].translateY(5);
                projectileCollision(i);
        }
}


//Checks if projectiles collide with the asteroid
function projectileCollision(index) {
        //Loop through all spawned asteroids.
        for (var i = 0; i < activeAsteroids; i++) {
                //Calculate the distance between the projectile and the asteroids center.
                var dx = projectile[index].position.x - asteroids[i].position.x;
                var dy = projectile[index].position.y - asteroids[i].position.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                //If the projectile is within 10 pixels.
                if (distance < 10) {
                        //console.log(asteroids);

                        //remove the projectile from the scene
                        scene.remove(projectile[index]);

                        //shift to remove the projectile from the list
                        for (j = index; j < projectile.length - 1; j++) {
                                projectile[j] = projectile[j + 1];
                        }


                        //remove from the scene the asteroid that was hit
                        explode.play();
                        scene.remove(asteroids[i]);

                        //shift left to remove asteroid
                        for (j = i; j < activeAsteroids - 1; j++) {
                                asteroids[j] = asteroids[j + 1];
                                asteroidSpeedX[j] = asteroidSpeedX[j + 1];
                                asteroidSpeedY[j] = asteroidSpeedX[j + 1];
                        }

                        //Remove the speed and asteroid from the data structure
                        asteroidSpeedX.pop();
                        asteroidSpeedY.pop();
                        asteroids.pop();
                        activeAsteroids--;

                        //Dynamic text-update speed, each asteroid gives 10 points.
                        for (z = 0; z < 10; z++) {
                                //Quick to Slow update of the text
                                setTimeout(function() {
                                        scene.remove(scoreMesh);
                                        updateScore(++points);
                                        scene.add(scoreMesh);
                                }, 2000 / z + 1);
                        }
                        /*
                        projectile.pop();
                        projectileCount--;
                        */
                        break;
                }
        }
}

//handles firing of projectiles
//a new projectile cannot be fired until the first has travelled a distance of 100
function shoot() {

        //track distance of the first projectile to prevent a new one from spawning
        if (projectileCount > 0) {
                var projX = projectile[projectileCount - 1].position.x - ship.position.x;
                var projY = projectile[projectileCount - 1].position.y - ship.position.y;
                var projDist = Math.sqrt(projX * projX + projY * projY);
                if (projDist > 100) shooting = false;
        }

        //allow a new projectile
        if (!shooting) {
                shooting = true;

                var projectileMat = new THREE.PointsMaterial({
                        color: 0xFF0000,
                        size: 3
                });
                //Shoot projectile in the direction it was fired in.
                var projectileGeo = new THREE.Geometry();
                projectileGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                projectile[projectileCount] = new THREE.Points(projectileGeo, projectileMat);
                projectile[projectileCount].translateX(ship.position.x);
                projectile[projectileCount].translateY(ship.position.y);
                projectile[projectileCount].rotation.z = ship.rotation.z;

                scene.add(projectile[projectileCount]);

                projectileCount++;
        }
}

//Check collision between asteroids, disabled for performance reasons.
//Very similar to checking collision with bullets, calculate distance between asteroids and invert their directions to simulate a rebound.
function checkCollision() {
        for (i = 0; i < activeAsteroids; i++) {
                for (j = 0; j < activeAsteroids; j++) {
                        if (j != i) {
                                //Calculate distance between asteroids
                                var dx = asteroids[i].position.x - asteroids[j].position.x;
                                var dy = asteroids[i].position.y - asteroids[j].position.y;
                                var distance = Math.sqrt(dx * dx + dy * dy);
                                //If closer than 40, invert directions and bounce.
                                if (distance < 40) {
                                        asteroidSpeedX[j] *= -1;
                                        asteroidSpeedY[j] *= -1;
                                }
                                else {
                                        asteroids[i].material.setValues({
                                                color: 0xFFFFFF
                                        });
                                        asteroids[j].material.setValues({
                                                color: 0xFFFFFF
                                        });
                                }
                        }
                }
        }
}
