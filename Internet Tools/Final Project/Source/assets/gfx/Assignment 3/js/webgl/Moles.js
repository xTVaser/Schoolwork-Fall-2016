/*
    Graphics Assignment 3
    Group Members: Justin, Tyler, Will, Michael, Guy
*/

var camera, scene, renderer, controls, stats;
var clock = new THREE.Clock();

//Create the 5 lights.
var ambientLight = new THREE.AmbientLight();
var directionalLight = new THREE.DirectionalLight();
var hemisphereLight = new THREE.HemisphereLight();
var pointLight = new THREE.PointLight();
var spotLight = new THREE.SpotLight();

var molecule = new THREE.Object3D();

//This works on server side only!
//All of the included XYZ molecule files.
var xyzFiles = {
        Anatoxin: function() {
                readMolecule('molecules/anatoxin-a.xyz');
        },
        Diamorphine: function() {
                readMolecule('./molecules/heroin.xyz');
        },
        Lactose: function() {
                readMolecule('./molecules/lactose.xyz');
        },
        Methamphetamine: function() {
                readMolecule('./molecules/methamphetamine.xyz');
        },
        Tetrasilete: function() {
                readMolecule('./molecules/tetrasilete.xyz');
        },
        Caffeine: function() {
                readMolecule('./molecules/caffeine.xyz');
        },
        Riboflavin: function() {
                readMolecule('./molecules/riboflavin.xyz');
        },
        Salt: function() {
                readMolecule('./molecules/salt.xyz');
        },
        UraniumHexafluoride: function() {
                readMolecule('./molecules/uraniumhexafluoride.xyz');
        },
        Yttrium: function() {
                readMolecule('./molecules/yttriumoxosilanediolate.xyz');
        },
        Uranyl: function() {
                readMolecule('./molecules/uranylacetate.xyz');
        },
        SodiumDichromate: function() {
                readMolecule('./molecules/sodiumdichromate.xyz');
        },
        Reineckes: function() {
                readMolecule('./molecules/reineckessalt.xyz');
        },
        Phosphomolybdicacid: function() {
                readMolecule('./molecules/phosphomolybdicacid.xyz');
        },
        LeadZirconate: function() {
                readMolecule('./molecules/leadzirconate.xyz');
        },
        Hexadecacarbonylhexarhoium: function() {
                readMolecule('./molecules/Hexadecacarbonylhexarhodium.xyz');
        },
        Ferric: function() {
                readMolecule('./molecules/ferricnitrate.xyz');
        },
        Diammonium: function() {
                readMolecule('./molecules/diammonium.xyz');
        },
        Chlorinetetraoxide: function() {
                readMolecule('./molecules/chlorinetetroxide.xyz');
        },
        Ceric: function() {
                readMolecule('./molecules/Cericammoniumnitrate.xyz');
        },
        Carboplatin: function() {
                readMolecule('./molecules/carboplatin.xyz');
        },
        AmmoniumThiocyanate: function() {
                readMolecule('./molecules/ammoniumthiocyanate.xyz');
        },
        Aluminum: function() {
                readMolecule('./molecules/aluminumarsenate.xyz');
        },
        loadFile: function() {
                $('#myInput').click();
        }
};

var options = {
        size: 1,
        lightColor: "#ffffff",
        secLightColor: "#ffffff",
        intensity: 1,
        isRotating: false,
        rotateX: 0,
        rotateY: 1,
        rotateZ: 0
};

var lightingOptions = {
    ambientOn: false,
    directionalOn: true,
    pointOn: false,
    hemisphereOn: false,
    spotOn: false
};

//TODO Change lighting menu style to boolean type, only one light on to start with. I give up.
//TODO Add more xyz molecules

/*
    ONLOAD FUNCTION
*/
function main() {
        init();
        animate();
}


//initial setup
function init() {

        //Set to our custom canvas
        container = document.getElementById('myCanvasLeft');

        renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
        });
        renderer.setClearColor(0x505050 , 0.5);
        renderer.setPixelRatio(550 / 450);
        renderer.setSize(550, 450);
        container.appendChild(renderer.domElement);

        //New perspective camera, positioned to face the trees and such.
        camera = new THREE.PerspectiveCamera(60, 550/450, 0.1, 10000);
        camera.position.z = 15;
        camera.position.y = 0;

        scene = new THREE.Scene();


        //add a light of each type
        //light 1: spot light
        spotLight = new THREE.SpotLight(0xffff00, 1);
        spotLight.position.set(0, 0, 15);
        spotLight.castShadow = true;
        scene.add(spotLight);


        //light 2: ambient light
        ambientLight = new THREE.AmbientLight(0xFFFFFF);
        ambientLight.position.set(0, 0, 15);
        ambientLight.castShadow = true;
        scene.add(ambientLight);


        //light 3: directional light
        directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(0, 0, 15);
        directionalLight.castShadow = true;
        scene.add(directionalLight);


        //light 4: hemisphere light
        hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0xC1C1D1, 1);
        hemisphereLight.castShadow = true;
        hemisphereLight.position.set(0, 0, 15);
        scene.add(hemisphereLight);


        //light 5: point light
        pointLight = new THREE.PointLight(0xFFFFFF, 5, 100, 10);
        pointLight.position.set(0, 0, 15);
        pointLight.castShadow = true;
        scene.add(pointLight);


        var gui = new dat.GUI({
                autoPlace: false,
                width: document.getElementById("guiOptions").offsetWidth
        });

        //GUI to show some available molecules - server side
        var guiF1 = gui.addFolder('Molecules (Select One)');
        guiF1.add(xyzFiles, 'Anatoxin').name('Anatoxin-a');
        guiF1.add(xyzFiles, 'Diamorphine');
        guiF1.add(xyzFiles, 'Lactose');
        guiF1.add(xyzFiles, 'Methamphetamine');
        guiF1.add(xyzFiles, 'Tetrasilete');
        guiF1.add(xyzFiles, 'Caffeine');
        guiF1.add(xyzFiles, 'Salt');
        guiF1.add(xyzFiles, 'Riboflavin');
        guiF1.add(xyzFiles, 'Yttrium').name('Yttrium Oxosilanediolate');
        guiF1.add(xyzFiles, 'Uranyl').name('Uranyl Acetate');
        guiF1.add(xyzFiles, 'SodiumDichromate').name('Sodium Diochromate');
        guiF1.add(xyzFiles, 'Reineckes').name('Reineckes Salt');
        guiF1.add(xyzFiles, 'Phosphomolybdicacid').name('Phosphomolybdic Acid');
        guiF1.add(xyzFiles, 'LeadZirconate').name('Lead Zirconate Titanate');
        guiF1.add(xyzFiles, 'Hexadecacarbonylhexarhoium').name('Hexadecacarbonylhexarhodium');
        guiF1.add(xyzFiles, 'Ferric').name('Ferric Nitrate');
        guiF1.add(xyzFiles, 'Diammonium').name('Diammonium Dioxidomolybdenum');
        guiF1.add(xyzFiles, 'Chlorinetetraoxide').name('Chlorine Tetroxide');
        guiF1.add(xyzFiles, 'Ceric').name('Ceric Ammonium Nitrate');
        guiF1.add(xyzFiles, 'Carboplatin').name('Carboplatin');
        guiF1.add(xyzFiles, 'AmmoniumThiocyanate').name('Ammonium Thiocyanate');
        guiF1.add(xyzFiles, 'Aluminum').name('Aluminum Arsenate');
        guiF1.add(xyzFiles, 'UraniumHexafluoride').name('Uranium Hexafluoride');

        //allow the user to upload their own XYZ file
        gui.add(xyzFiles, 'loadFile').name('Upload XYZ');

        //GUI to allow the user to select a lighting type - each onchange function will add/remove the light accordingly
        var guiF2 = gui.addFolder('Lighting Types');
        guiF2.add(lightingOptions, 'ambientOn').name('Ambient').onChange(function () {
            if (lightingOptions.ambientOn) {
                scene.add(ambientLight);
            }
            else {
                scene.remove(ambientLight);
            }
        }).setValue(lightingOptions.ambientOn);

        guiF2.add(lightingOptions, 'directionalOn').name('Directional').setValue(lightingOptions.directionalOn).onChange(function () {
            if (lightingOptions.directionalOn) {
                directionalLight.intensity = options.intensity;
            }
            else {
                directionalLight.intensity = 0;
            }
        }).setValue(lightingOptions.directionalOn);

        guiF2.add(lightingOptions, 'pointOn').name('Point').onChange(function () {
            if (lightingOptions.pointOn) {
                pointLight.intensity = options.intensity;
            }
            else {
                pointLight.intensity = 0;
            }
        }).setValue(lightingOptions.pointOn);

        guiF2.add(lightingOptions, 'hemisphereOn').name('Hemisphere').onChange(function () {
            if (lightingOptions.hemisphereOn) {
                hemisphereLight.intensity = options.intensity;
            }
            else {
                hemisphereLight.intensity = 0;
            }
        }).setValue(lightingOptions.hemisphereOn);

        guiF2.add(lightingOptions, 'spotOn').name('Spot').onChange(function () {
            if (lightingOptions.spotOn) {
                spotLight.intensity = options.intensity;
            }
            else {
                spotLight.intensity = 0;
            }
        }).setValue(lightingOptions.spotOn);


        //GUI to allow the user to specify lighting parameters
        var guiF3 = gui.addFolder('Render Options');
        guiF3.add(options, 'size', 0, 2).name('Size');
        guiF3.addColor(options, 'lightColor').name('Primary Light Color');
        guiF3.addColor(options, 'secLightColor').name('Secondary Light Color');
        guiF3.add(options, 'intensity', 0, 10).name('Intesity');
        guiF3.add(options, 'isRotating').name('Toggle Rotation');
        guiF3.add(options, 'rotateX', 0, 10).name('X Rotation');
        guiF3.add(options, 'rotateY', 0, 10).name('Y Rotation');
        guiF3.add(options, 'rotateZ', 0, 10).name('Z Rotation');

        //position the dom elemeent of the GUI
        gui.domElement.style.margin = 'auto';
        gui.domElement.style.marginBottom = '3.5em';
        document.getElementById("guiOptions").appendChild(gui.domElement);
        guiF2.open();
        guiF3.open();

        //fix an inproper css margin on the color picker
        $('.saturation-field').css('margin-right', 0);

        //handler for when the user selects an XYZ file
        var fileInput = document.getElementById('myInput');
        fileInput.addEventListener('change', function (e) {

                //get and read the file
                var file = fileInput.files[0];
                var fileReader = new FileReader();
                var xyz;

                fileReader.onload = function (e) {
                        //if there was already a molecule loaded remove it from the scene
                        if (molecule != null) {
                                scene.remove(molecule);
                                molecule = new THREE.Object3D();
                        }

                        //setup the new molecule
                        xyz = fileReader.result;
                        createMolecule(xyz);
                }

                //read the file as plain text
                fileReader.readAsText(file);
        });
}

//read the XYZ file
function readMolecule(xyzURL) {
        $.ajax({
                type: 'POST',
                url: xyzURL,
                async: true,
                datatype: 'text',
                success: function(xyz) {
                        if (molecule != null) {
                                scene.remove(molecule);
                                molecule = new THREE.Object3D();
                        }
                        createMolecule(xyz);
                }
        });
}

//updates the lighting parameters for each light in the scene - the parameters are selected by the user via the GUI
function updateLighting(primaryColor, secondaryColor, intensity) {

        ambientLight.color.setHex(primaryColor);
        directionalLight.color.setHex(primaryColor);
        pointLight.color.setHex(primaryColor);
        spotLight.color.setHex(primaryColor);
        hemisphereLight.color.setHex(primaryColor);
        hemisphereLight.groundColor.setHex(secondaryColor);

        //Use the intensity only if the light is enabled.
        if(lightingOptions.directionalOn){
            directionalLight.intensity = intensity;
        }

        if(lightingOptions.pointOn){
            pointLight.intensity = intensity;
        }

        if(lightingOptions.spotOn){
            spotLight.intensity = intensity;
        }

        if(lightingOptions.hemisphereOn){
            hemisphereLight.intensity = intensity;
        }
}

//updates every frame used for animation and input handling
function render() {

        //render the scene
        renderer.render(scene, camera);
}

function animate() {

        //scale the molecule to the size specified by the user via the GUI
        molecule.scale.x = options.size;
        molecule.scale.y = options.size;
        molecule.scale.z = options.size;

        //adjust lighting based on the parameters selected by the user
        var primaryColor = parseInt(options.lightColor.replace(/^#/, ''), 16);
        var secondaryColor = parseInt(options.secLightColor.replace(/^#/, ''), 16);
        var intensity = options.intensity;
        updateLighting(primaryColor, secondaryColor, intensity);

        //if we have a molecule rotate it slowly about the Y axis
        if (options.isRotating && molecule != null) {
                molecule.rotateX(options.rotateX/100);
                molecule.rotateY(options.rotateY/100);
                molecule.rotateZ(options.rotateZ/100);
        }

        requestAnimationFrame(animate);
        render();
}

function createMolecule(xyz) {

        //For determining the atomic formula
        var atomicFormula = "";
        var elementArray = {
                H: 0, He: 0,
                Li: 0, Be: 0, B: 0, C: 0, N: 0, O: 0, F: 0, Ne: 0,
                Na: 0, Mg: 0, Al: 0, Si: 0, P: 0, S: 0, Cl: 0, Ar: 0,
                K: 0, Ca: 0, Sc: 0, Ti: 0, V: 0, Cr: 0, Mn: 0, Fe: 0, Co: 0, Ni: 0, Cu: 0, Zn: 0, Ga: 0, Ge: 0, As: 0, Se: 0, Br: 0, Kr: 0,
                Rb: 0, Sr: 0, Y: 0, Zr: 0, Nb: 0, Mo: 0, Tc: 0, Ru: 0, Rh: 0, Pd: 0, Ag: 0, Cd: 0, In: 0, Sn: 0, Sb: 0, Te: 0, I: 0, Xe: 0,
                Cs: 0, Ba: 0, Hf: 0, Ta: 0, W: 0, Re: 0, Os: 0, Ir: 0, Pt: 0, Au: 0, Hg: 0, Tl: 0, Pb: 0, Bi: 0, Po: 0, At: 0, Rn: 0,
                Fr: 0, Ra: 0, Rf: 0, Db: 0, Sg: 0, Bh: 0, Mt: 0, Ds: 0, Rg: 0, Cn: 0, Uut: 0, Fl: 0, Uup: 0, Lv: 0, Uus: 0, Uuo: 0,
                La: 0, Ce: 0, Pr: 0, Nd: 0, Pm: 0, Sm: 0, Eu: 0, Gd: 0, Tb: 0, Dy: 0, Ho: 0, Er: 0, Tm: 0, Yb: 0, Lu: 0,
                Ac: 0, Th: 0, Pa: 0, U: 0, Np: 0, Pu: 0, Am: 0, Cm: 0, Bk: 0, Cf: 0, Es: 0, Fm: 0, Md: 0, No: 0, Lr: 0
        }

        //split the xyz file by new lines
        var data = xyz.split('\n');

        //number of atoms is the fist line
        var atomCount = data[0];

        //make all of the atoms
        for (var i = 0; i < atomCount; i++) {
                var atomColor;
                var geo = new THREE.SphereGeometry(1, 32, 32);

                //single atoms start at index 2
                var atom = data[2 + i].split(/(\s+)/);

                var element = atom[0];
                elementArray[element]++;

                //associative array representing the atom colors
                var colorArray = {
                        H: 0xFFFFFF,
                        C: 0x000000,
                        N: 0x87CEEB,
                        O: 0xFF2200,
                        F: 0x1FF01F, Cl: 0x1FF01F,
                        Br: 0x992200,
                        I: 0x6600BB,
                        He: 0x00FFFF, Ne: 0x00FFFF, Ar: 0x00FFFF, Xe: 0x00FFFF, Kr: 0x00FFFF,
                        P: 0xFF9900,
                        S: 0xDDDD00,
                        B: 0xFFAA77,
                        Li: 0x7700FF, Na: 0x7700FF, K: 0x7700FF, Rb: 0x7700FF, Cs: 0x7700FF, Fr: 0x7700FF,
                        Be: 0x007700, Mg: 0x007700, Ca: 0x007700, Sr: 0x007700, Ba: 0x007700, Ra: 0x007700,
                        Ti: 0x999999,
                        Fe: 0xDD7700
                };

                //ensure that the element is in the array of colors
                if (!(element in colorArray))
                        //default color for elements not in the array
                        atomColor = new THREE.Color(0xDD77FF);
                else
                        atomColor = new THREE.Color(colorArray[element]);

                //material for the atom
                var mat = new THREE.MeshPhongMaterial({
                        color: atomColor
                });

                //the atom is represented by a sphere
                var sphere = new THREE.Mesh(geo, mat);
                sphere.position.x = atom[2];
                sphere.position.y = atom[4];
                sphere.position.z = atom[6];


                //0.55->1.5 scale on sphere.
                //scale the atom based on its row number in the periodic table
                //this is not a completely accurate scale it is simply used to help differentiate atoms of significantly different sizes
                var scaleArray = {
                        H: 0.60, He: 0.60,
                        Li: 0.9, Be: 0.9, B: 0.9, C: 0.9, N: 0.9, O: 0.9, F: 0.9, Ne: 0.9,
                        Na: 1.05, Mg: 1.05, Al: 1.05, Si: 1.05, P: 1.05, S: 1.05, Cl: 1.05, Ar: 1.05,
                        K: 1.25, Ca: 1.25, Sc: 1.25, Ti: 1.25, V: 1.25, Cr: 1.25, Mn: 1.25, Fe: 1.25, Co: 1.25, Ni: 1.25, Cu: 1.25, Zn: 1.25, Ga: 1.25, Ge: 1.25, As: 1.25, Se: 1.25, Br: 1.25, K: 1.25
                }

                //scale defaults to 1.5 if it is not in the scale array
                var scaleAmount = 1.5;
                if(element in scaleArray)
                        scaleAmount = scaleArray[element];

                //scale the sphere
                sphere.scale.x = scaleAmount;
                sphere.scale.y = scaleAmount;
                sphere.scale.z = scaleAmount;

                //add the sphere to the molecule object (so we can rotate the entire object later)
                molecule.add(sphere);
        }

        //add the molecule to the scene
        scene.add(molecule);

        //Generate the atomic formula text
        for (var key in elementArray) {
                if(elementArray[key] > 0)
                        atomicFormula += key+"<sub>"+elementArray[key]+"</sub>";
        }

        //Atomic Formula if see fit.
        document.getElementById("formulaText").innerHTML="Formula of <b>"+data[1]+"</b>: "+atomicFormula;
}
