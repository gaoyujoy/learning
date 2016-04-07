/**
 * Created by seven on 2016/4/6.
 */
$(function(){
    function initStats(){
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '210px';
        stats.domElement.style.top = '50px';
        $('#Stats-output').append(stats.domElement);
        return stats;
    }
    var stats = initStats();
    //新加场景
    var scene = new THREE.Scene();
    //新加相机
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    //新加渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE,1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    //新加坐标
    //var axes = new THREE.AxisHelper(20);
    //scene.add(axes);
    //新加平面
    var planeGeometry = new THREE.PlaneGeometry(60,20);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5*Math.PI;
    //plane.rotation.y = -0.5*Math.PI;
    plane.position.x = 15;
    plane.position.y =0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    //新加立方体
    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y =3;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);
    //新加球体
    var sphereGemometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGemometry, sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add(sphere);
    //新加灯光
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    //相机位置
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    //渲染页面
    $("#WebGL-output").append(renderer.domElement);

    var controls = new function(){
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    };
    var gui = new dat.GUI();
    gui.domElement.style.top = '50px';
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.right = '0px';
    gui.add(controls, 'rotationSpeed', 0 ,0.5);
    gui.add(controls, 'bouncingSpeed', 0 ,0.5);
    var step = 0;
    function renderScene(){
        stats.update();
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y +=controls.rotationSpeed;
        cube.rotation.z +=controls.rotationSpeed;

        step+=controls.bouncingSpeed;
        sphere.position.x = 20 +(10*(Math.cos(step)));
        sphere.position.y = 2 +(10*Math.abs(Math.sin(step)));

        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);
    }

    renderScene();


}) ;