var container = document.getElementById('container')
var width = container.clientWidth
var height = container.clientHeight
var aspect = width / height
var renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
container.appendChild(renderer.domElement)

var scene = new THREE.Scene()

if (width > 747) {
  var camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000)
  camera.position.z = 500
  camera.position.set(-140, 20, 500)
} else {
  var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
  camera.position.z = 500
}

system = new THREE.Group() // planetary system

scene.add(new THREE.AmbientLight(0xffffff, 0.2))

var light = new THREE.DirectionalLight(0xffffff, 2.5)
light.position.set(1500, 2500, 0)
scene.add(light)

var material = new THREE.MeshLambertMaterial({
  color: 0x0c2d4d,
})

var planet = new THREE.Mesh(new THREE.IcosahedronGeometry(100, 3), material)

for (var i = 0; i < planet.geometry.vertices.length; i++)
  planet.geometry.vertices[i].multiplyScalar(Math.random() * 0.05 + 0.95)

planet.geometry.computeFlatVertexNormals()
system.add(planet)

var asteroids = new THREE.Group()

for (var p = 0; p < Math.PI * 2; p = p + Math.random() * 0.15) {
  var asteroid = new THREE.Mesh(new THREE.IcosahedronGeometry(8, 0), material)

  var size = Math.random() * 0.5
  for (var i = 0; i < asteroid.geometry.vertices.length; i++)
    asteroid.geometry.vertices[i].multiplyScalar(Math.random() * 0.5 + size)

  rand = Math.random() * 60 - 30
  asteroid.position.set(
    170 * Math.sin(p) + rand,
    rand,
    170 * Math.cos(p) + rand
  )

  asteroid.geometry.computeFlatVertexNormals()
  asteroids.add(asteroid)
}

system.add(asteroids)
// 围绕大球的小颗粒位置和方向
system.rotation.x = 0.1
system.rotation.y = -0.3
system.rotation.z = -0.4

scene.add(system)

for (i = 0; i < 10; i++) {
  particles = new THREE.Points(
    new THREE.Geometry(),
    new THREE.PointsMaterial({
      size: Math.random() * 5,
    })
  )
  if (width > 747) {
    for (j = 0; j < 20; j++) {
      var vertex = new THREE.Vector3()
      vertex.x = Math.random() * width * 1.1 - (width * 1.1) / 2
      vertex.y = Math.random() * height * 1.1 - (height * 1.1) / 2
      vertex.z = -500
      particles.geometry.vertices.push(vertex)
      particles.material.color.setScalar(Math.random() * 0.4 + 0.2)
    }
  }

  if (width <= 747) {
    for (j = 0; j < 20; j++) {
      var vertex = new THREE.Vector3()
      vertex.x = Math.random() * width * 1.1 - (width * 1.1) / 2
      vertex.y = Math.random() * height * 1.1 - (height * 1.1) / 2
      vertex.z = -10
      particles.geometry.vertices.push(vertex)
      particles.material.color.setScalar(Math.random() * 0.3 + 0.2)
    }
  }

  scene.add(particles)
}

function render() {
  requestAnimationFrame(render)
  // 旋转速度
  planet.rotation.y += 0.001
  planet.rotation.z -= 0.0005

  asteroids.rotation.y += 0.003

  renderer.render(scene, camera)
}

render()
