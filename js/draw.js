var renderer, scene, camera, composer, circle, skelet, particle;

window.onload = function() {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  circle = new THREE.Object3D();
  skelet = new THREE.Object3D();
  particle = new THREE.Object3D();

  scene.add(circle);
  scene.add(skelet);
  scene.add(particle);

  var geometry = new THREE.SphereGeometry(1, 40, 16);
  var geom = new THREE.SphereGeometry(8, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
  var geom2 = new THREE.TorusGeometry(16, 4.5, 8, 80);
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  for (var i = 0; i < 800; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  var mat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    shading: THREE.FlatShading
  });

  var mat2 = new THREE.PointsMaterial({
    size: 1.5
  });
 

  var planet = new THREE.Mesh(geom, mat);
  planet.scale.x = planet.scale.y = planet.scale.z = 16;
  circle.add(planet);

  var planet2 = new THREE.Points(geom2, mat2);
  planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
  skelet.add(planet2);

  window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  circle.rotation.x -= 0.0020;
  circle.rotation.y -= 0.0030;
  skelet.rotation.x -= 0.0010;
  skelet.rotation.y += 0.0020;
  renderer.clear();

  renderer.render( scene, camera)
};
