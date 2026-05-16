const DATA = {
  name: 'Greg',
  subtitle: 'Software Engineering Student @ UCC',
  vectors: [
    {
      label: 'About Me',
      pos: [3.5, 2.2, 1.8],
      color: '#ff6b6b',
      content: {
        title: 'About Me',
        subtitle: 'Building things that matter.',
        body: "I'm a software engineering student at Catholic University Of Cordoba with a passion for crafting. I love the intersection of code and creativity ",
        details: ['Web Dev', 'Problem Solver', 'Creative Thinker']
      }
    },
    {
      label: 'Projects',
      pos: [-1.8, 3.4, 2.6],
      color: '#4ecdc4',
      content: {
        title: 'Projects',
        subtitle: "Things I've built.",
        body: 'From full-stack web apps to experimental 3D visualizations — each project taught me something new. I believe the best way to learn is by building, shipping, and iterating.',
        details: ['Full-Stack Apps', '3D Visualizations', 'APIs']
      }
    },
    {
      label: 'Skills',
      pos: [3.2, -2, 2.4],
      color: '#45b7d1',
      content: {
        title: 'Skills',
        subtitle: 'Tools of the trade.',
        body: 'I work across the stack with modern technologies. Always exploring new tools and paradigms to stay current and build better software.',
        details: ['JavaScript ', 'C++', 'React', 'SQL', 'R']
      }
    },
    {
      label: 'Experience',
      pos: [-3.2, 1.2, 3],
      color: '#f9ca24',
      content: {
        title: 'Experience',
        subtitle: "Where I've applied my craft.",
        body: "Through internships, freelance work, and university projects, I've gained real-world experience in software development, team collaboration, and delivering under deadlines.",
        details: ['Internships', 'Freelance', 'Team Projects']
      }
    },
    {
      label: 'Education',
      pos: [-1.4, -2.8, 3.2],
      color: '#a29bfe',
      content: {
        title: 'Education',
        subtitle: 'Software Engineering.',
        body: 'Currently pursuing a degree in Software Engineering at Catholic University Of Cordoba. Coursework includes data structures, algorithms, databases, networking, and software design patterns.',
        details: ['BSc Software Engineering', 'UCC', '2025 — 2029']
      }
    },
    {
      label: 'Contact',
      pos: [2.6, 2.8, -2.4],
      color: '#fd79a8',
      content: {
        title: 'Get in Touch',
        subtitle: "Let's build something together.",
        body: "I'm always open to interesting conversations, collaboration opportunities, or just a friendly chat. Feel free to reach out!",
        details: ['Email: mirandagregorio107@gmail.com', 'GitHub: @Greg-07-svg', 'LinkedIn: https://www.linkedin.com/in/gregorio-miranda-a1a129264/']
      }
    }
  ]
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a1a);
scene.fog = new THREE.FogExp2(0x0a0a1a, 0.018);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(9, 5, 9);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.prepend(renderer.domElement);

const labelRenderer = new THREE.CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.id = 'labels-renderer';
document.getElementById('labels-container').appendChild(labelRenderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 4;
controls.maxDistance = 25;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;

const ambient = new THREE.AmbientLight(0x404060, 0.5);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0x8888ff, 0.6);
fillLight.position.set(-5, -3, -5);
scene.add(fillLight);

const starsGeo = new THREE.BufferGeometry();
const starCount = 2000;
const starPos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
  starPos[i] = (Math.random() - 0.5) * 80;
}
starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const starsMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.08,
  transparent: true,
  opacity: 0.7,
  sizeAttenuation: true
});
const stars = new THREE.Points(starsGeo, starsMat);
scene.add(stars);

const gridHelper = new THREE.GridHelper(14, 14, 0x444488, 0x333366);
gridHelper.position.y = -0.5;
scene.add(gridHelper);

function makeAxis(from, to, color) {
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
  const geo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(...from),
    new THREE.Vector3(...to)
  ]);
  return new THREE.Line(geo, mat);
}
scene.add(makeAxis([-6, 0, 0], [6, 0, 0], 0xff4444));
scene.add(makeAxis([0, -6, 0], [0, 6, 0], 0x44ff44));
scene.add(makeAxis([0, 0, -6], [0, 0, 6], #BF00FF));

function makeAxisLabel(text, pos, color) {
  const div = document.createElement('div');
  div.textContent = text;
  div.style.color = color;
  div.style.fontSize = '14px';
  div.style.fontWeight = '600';
  div.style.opacity = '0.4';
  const label = new THREE.CSS2DObject(div);
  label.position.set(...pos);
  scene.add(label);
}
makeAxisLabel('x', [6.5, 0, 0], '#ff6666');
makeAxisLabel('y', [0, 6.5, 0], '#66ff66');
makeAxisLabel('z', [0, 0, 6.5], '#3d0553');

const originGeo = new THREE.SphereGeometry(0.3, 24, 24);
const originMat = new THREE.MeshStandardMaterial({
  color: 0x8888ff,
  emissive: 0x4444ff,
  emissiveIntensity: 0.6,
  roughness: 0.2,
  metalness: 0.8,
  transparent: true,
  opacity: 0.8
});
const origin = new THREE.Mesh(originGeo, originMat);
scene.add(origin);

const glowGeo = new THREE.SphereGeometry(0.45, 16, 16);
const glowMat = new THREE.MeshBasicMaterial({
  color: 0x6666ff,
  transparent: true,
  opacity: 0.15,
});
const glow = new THREE.Mesh(glowGeo, glowMat);
scene.add(glow);

const endpointMeshes = [];
const vectorData = [];
let hoveredNode = null;

function buildVector(data, index) {
  const [x, y, z] = data.pos;
  const end = new THREE.Vector3(x, y, z);
  const dir = end.clone().normalize();
  const len = end.length();
  const color = new THREE.Color(data.color);

  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    end
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.35
  });
  const line = new THREE.Line(lineGeo, lineMat);
  scene.add(line);

  const tubeLen = len - 0.5;
  if (tubeLen > 0.3) {
    const tubeGeo = new THREE.CylinderGeometry(0.035, 0.035, tubeLen, 6, 1);
    const tubeMat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.5
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    const midPoint = dir.clone().multiplyScalar(tubeLen / 2 + 0.25);
    tube.position.copy(midPoint);
    tube.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    scene.add(tube);
  }

  const coneGeo = new THREE.ConeGeometry(0.18, 0.5, 8);
  const coneMat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.25,
    roughness: 0.4,
    metalness: 0.3
  });
  const cone = new THREE.Mesh(coneGeo, coneMat);
  const conePos = end.clone().add(dir.clone().multiplyScalar(-0.45));
  cone.position.copy(conePos);
  cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  scene.add(cone);

  const sphereGeo = new THREE.SphereGeometry(0.42, 20, 20);
  const sphereMat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.6
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.copy(end);
  sphere.userData = { index, data, isEndpoint: true, baseY: end.y };
  scene.add(sphere);
  endpointMeshes.push(sphere);

  const egGeo = new THREE.SphereGeometry(0.6, 12, 12);
  const egMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.12
  });
  const egMesh = new THREE.Mesh(egGeo, egMat);
  egMesh.position.copy(end);
  scene.add(egMesh);

  const labelDiv = document.createElement('div');
  labelDiv.className = 'label';
  labelDiv.textContent = data.label;
  labelDiv.style.borderColor = data.color + '44';
  const label = new THREE.CSS2DObject(labelDiv);
  label.position.set(x, y + 0.75, z);
  scene.add(label);

  vectorData[index] = { label, data };
}

DATA.vectors.forEach((v, i) => buildVector(v, i));

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerDown(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(endpointMeshes);

  if (intersects.length > 0) {
    openPanel(intersects[0].object.userData.data);
    controls.autoRotate = false;
  }
}
renderer.domElement.addEventListener('pointerdown', onPointerDown);

renderer.domElement.addEventListener('pointermove', function (event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(endpointMeshes);

  if (hoveredNode && hoveredNode !== (intersects.length ? intersects[0].object : null)) {
    hoveredNode.material.emissiveIntensity = 0.5;
    const entry = vectorData[DATA.vectors.indexOf(hoveredNode.userData.data)];
    if (entry) entry.label.element.className = 'label';
    hoveredNode = null;
    renderer.domElement.style.cursor = 'default';
  }

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj !== hoveredNode) {
      hoveredNode = obj;
      obj.material.emissiveIntensity = 1.2;
      const entry = vectorData[DATA.vectors.indexOf(obj.userData.data)];
      if (entry) entry.label.element.className = 'label active';
      renderer.domElement.style.cursor = 'pointer';
    }
  }
});

const overlay = document.getElementById('info-overlay');
const panelAccent = document.getElementById('panel-accent');
const panelTitle = document.getElementById('panel-title');
const panelSubtitle = document.getElementById('panel-subtitle');
const panelBody = document.getElementById('panel-body');
const panelDetails = document.getElementById('panel-details');
const closeBtn = document.getElementById('close-btn');

function openPanel(data) {
  const c = data.content;
  panelAccent.style.background = data.color;
  panelTitle.textContent = c.title;
  panelSubtitle.textContent = c.subtitle;
  panelBody.textContent = c.body;
  panelDetails.innerHTML = '';
  c.details.forEach(function (d) {
    const span = document.createElement('span');
    span.textContent = d;
    panelDetails.appendChild(span);
  });
  overlay.classList.add('open');
}

function closePanel() {
  overlay.classList.remove('open');
  controls.autoRotate = true;
}

closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', function (e) {
  if (e.target === overlay) closePanel();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closePanel();
});

window.addEventListener('resize', function () {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
});

const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();

  const pulse = 1 + Math.sin(t * 1.2) * 0.06;
  origin.scale.set(pulse, pulse, pulse);
  glow.scale.set(
    1 + Math.sin(t * 1.2) * 0.15,
    1 + Math.sin(t * 1.2) * 0.15,
    1 + Math.sin(t * 1.2) * 0.15
  );

  for (let i = 0; i < endpointMeshes.length; i++) {
    const mesh = endpointMeshes[i];
    const baseY = mesh.userData.baseY;
    const offset = i * 0.8;
    mesh.position.y = baseY + Math.sin(t * 0.7 + offset) * 0.06;
  }

  controls.update();

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
