

// --- مدیریت نمایش بخش‌ها ---
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".sidebar .meno a, .navbar svg");
const tagForNemoneh = document.querySelectorAll(".hameyekar .slider .items");

const STORAGE_SECTION = "last_section";

const opening = document.getElementById("opening");
let isTransitioning = false;

// ================= DOOR + LOGO TRANSITION =================

// بستن کامل صفحه (درها + لوگو ورود)
function closePage(callback) {
  opening.style.display = "block";

  // درها بیان وسط (بسته)
  opening.classList.remove("open");

  // لوگو از بالا بیاد پایین
  opening.classList.remove("logo-out");
  opening.classList.add("logo-in");

  // بعد از بسته شدن کامل
  setTimeout(() => {
    if (callback) callback();
  }, 900);
}

// باز شدن صفحه (هم‌زمان با خروج لوگو)
function openPage() {
  // لوگو بره بالا و فید بشه
  opening.classList.remove("logo-in");
  opening.classList.add("logo-out");

  // درها باز بشن (reverse)
  opening.classList.add("open");

  setTimeout(() => {
    opening.style.display = "none";
    isTransitioning = false;
  }, 900);
}

// تغییر بخش (کاملاً اصولی)
function showSection(id) {
  if (isTransitioning) return;
  isTransitioning = true;

  // فاز ۱: بستن
  closePage(() => {

    // فاز ۲: تغییر تب (وقتی صفحه بسته است)
    sections.forEach(sec => sec.style.display = "none");
    const target = document.getElementById(id);
    if (target) {
      target.style.display = "block";
      localStorage.setItem(STORAGE_SECTION, id);
    }

    // فاز ۳: باز شدن
    openPage();
  });
}

// کلیک روی منو
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const target = link.getAttribute("data-target");
    showSection(target);
  });
});

tagForNemoneh.forEach(link => {
  link.addEventListener("click", e => {
    const target = link.getAttribute("data-target");
    showSection(target);
  });
});

// بارگذاری اولیه
window.addEventListener("DOMContentLoaded", () => {
  const last = localStorage.getItem(STORAGE_SECTION);
  if (last) {
    showSection(last);
  } else {
    showSection("home");
  }
});

// حرکت عکس saleh بر اساس موس
const salehImg = document.querySelector('.titr-avalieh .saleh');
let salehX = 0, salehY = 0;
let targetSX = 0, targetSY = 0;

document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const offsetX = (e.clientX - centerX) / centerX;
  const offsetY = (e.clientY - centerY) / centerY;

  targetSX = offsetX * 30;
  targetSY = offsetY * 30;
});

function animateSaleh() {
  salehX += (targetSX - salehX) * 0.1;
  salehY += (targetSY - salehY) * 0.1;

  if (salehImg) {
    salehImg.style.transform = `translate(${salehX}px, ${salehY}px)`;
  }
  requestAnimationFrame(animateSaleh);
}
animateSaleh();

// اسلایدر
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// --- OPENING INITIAL LOAD ---
window.addEventListener("load", () => {
  opening.style.display = "block";

  opening.classList.add("logo-in");

  setTimeout(() => {
    opening.classList.remove("logo-in");
    opening.classList.add("logo-out");
    opening.classList.add("open");
  }, 900);

  setTimeout(() => {
    opening.style.display = "none";
  }, 1800);
});










// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.02,
  transparent: true,
  opacity: 0.8
});

const starsVertices = [];
for (let i = 0; i < 7000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Create galaxies
const galaxyGeometry = new THREE.BufferGeometry();
const galaxyMaterial = new THREE.PointsMaterial({
  color: 0x7a5cff,
  size: 1,
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending
});

const galaxyVertices = [];
for (let i = 0; i < 2000; i++) {
  const radius = 300 + Math.random() * 200;
  const spinAngle = Math.random() * Math.PI * 2;
  const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

  const x = Math.cos(branchAngle + spinAngle) * radius;
  const y = (Math.random() - 0.5) * 100;
  const z = Math.sin(branchAngle + spinAngle) * radius;

  galaxyVertices.push(x, y, z);
}

galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(galaxyVertices, 3));
const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

camera.position.z = 5;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;


});


// Create new galaxies
const galaxyGeometry2 = new THREE.BufferGeometry();
const galaxyMaterial2 = new THREE.PointsMaterial({
  color: 0xf1edff,
  size: 0.8,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending
});

const galaxyVertices2 = [];
for (let i = 0; i < 100; i++) {
  const radius = 300 + Math.random() * 200;
  const spinAngle = Math.random() * Math.PI * 2;
  const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

  const x = Math.cos(branchAngle + spinAngle) * radius;
  const y = (Math.random() - 0.5) * 400;
  const z = Math.sin(branchAngle + spinAngle) * radius;

  galaxyVertices2.push(x, y, z);
}

galaxyGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(galaxyVertices2, 3));
const galaxy2 = new THREE.Points(galaxyGeometry2, galaxyMaterial2);
scene.add(galaxy2);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Smooth mouse following
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  // Rotate starfield based on mouse position
  starField.rotation.x = targetY * 0.2;
  starField.rotation.y = targetX * 0.2;

  // Rotate galaxy
  galaxy.rotation.y += 0.001;
  galaxy2.rotation.y -= 0.002


  // Move camera slightly based on mouse
  camera.position.x += (targetX * 0.5 - camera.position.x) * 0.05;
  camera.position.y += (targetY * 0.5 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

