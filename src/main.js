import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';
import { createIcons, ArrowDown, ArrowUpRight, Lightbulb, Menu, X } from 'lucide';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const EMAIL_SERVICE = 'service_s3fk7bl';
const EMAIL_TEMPLATE = 'template_0iktivc';
const EMAIL_PUBLIC_KEY = '4AFkJTdVKxk6m49dh';

const projects = {
  terraform: {
    meta: 'Infrastructure as code / AWS',
    title: 'AWS infrastructure with Terraform',
    description: 'Automated provisioning of complete AWS environments, turning infrastructure decisions into repeatable, reviewable code.',
    points: ['Provisioned VPCs, subnets, security groups, EC2, Auto Scaling, load balancing, and S3.', 'Used AMIs, launch templates, variables, outputs, and local values to improve reuse.', 'Applied the plan, apply, destroy lifecycle while practicing state management.'],
    links: []
  },
  jenkins: {
    meta: 'Continuous integration / Jenkins',
    title: 'Jenkins delivery pipeline',
    description: 'An automated delivery pipeline that validates a GitHub change, packages the application, and publishes a traceable container image.',
    points: ['Checkout, dependency installation, tests, application build, Docker build, and registry push stages.', 'GitHub webhook triggers a pipeline for changes merged to the main branch.', 'Credentials stay in Jenkins and images are tagged with the build number.'],
    links: []
  },
  gitops: {
    meta: 'GitOps / Kubernetes',
    title: 'Argo CD delivery loop',
    description: 'A GitOps delivery loop where an application change becomes a synchronized Kubernetes deployment with a clear separation between source and environment configuration.',
    points: ['Jenkins polls GitHub, builds a Node.js image on AWS EC2, and pushes it to Docker Hub.', 'The pipeline updates the Kubernetes manifest in a separate update repository.', 'Argo CD watches the update repository and synchronizes Minikube with self-healing enabled.'],
    links: [
      ['App repo', 'https://github.com/RiturajChaudhary/argo-cd'],
      ['K8s config', 'https://github.com/RiturajChaudhary/k8s-config'],
      ['Docker Hub', 'https://hub.docker.com/r/rituraj4164/frontend-app']
    ]
  }
};

const dialog = document.querySelector('#project-dialog');
const dialogMeta = document.querySelector('#dialog-meta');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('#dialog-description');
const dialogPoints = document.querySelector('#dialog-points');
const dialogLinks = document.querySelector('#dialog-links');

function openProject(key) {
  const project = projects[key];
  if (!project) return;
  dialogMeta.textContent = project.meta;
  dialogTitle.textContent = project.title;
  dialogDescription.textContent = project.description;
  dialogPoints.replaceChildren(...project.points.map((point) => {
    const item = document.createElement('li');
    item.textContent = point;
    return item;
  }));
  dialogLinks.replaceChildren(...project.links.map(([label, url]) => {
    const link = document.createElement('a');
    link.className = 'text-link';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = `${label} ↗`;
    link.style.display = 'inline-block';
    link.style.margin = '1.4rem 1.2rem 0 0';
    return link;
  }));
  dialog.showModal();
}

document.querySelectorAll('[data-project]').forEach((card) => {
  card.addEventListener('click', () => openProject(card.dataset.project));
});
document.querySelectorAll('.project-page-link').forEach((link) => {
  link.addEventListener('click', (event) => event.stopPropagation());
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const menu = document.querySelector('#site-nav');
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('is-open', !expanded);
});
document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
    document.querySelector('#site-nav').classList.remove('is-open');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];
const updateActiveLink = () => {
  const current = sections.reduce((active, section) => window.scrollY + 160 >= section.offsetTop ? section.id : active, 'home');
  navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

const header = document.querySelector('.site-header');
const applyHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 16);
};
window.addEventListener('scroll', applyHeaderState, { passive: true });
applyHeaderState();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lenis = prefersReducedMotion ? null : new Lenis({ lerp: 0.08, smoothWheel: true });
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const revealItems = document.querySelectorAll('.hero-copy, .hero-visual, .section-heading, .about-grid, .project-card, .skill-card, .workflow-marquee, .resume-card, .contact-grid, .site-footer');
if (prefersReducedMotion) {
  gsap.set(revealItems, { clearProps: 'all' });
} else {
  gsap.set(revealItems, { autoAlpha: 0, y: 28 });
  revealItems.forEach((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true }
    });
  });
  gsap.from('.hero-copy > *', { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
  gsap.from('.hero-portrait, .hero-status', { autoAlpha: 0, x: 28, duration: 1, stagger: 0.12, delay: 0.35, ease: 'power3.out' });
}

document.querySelectorAll('.project-card, .skill-card, .resume-card, .hero-portrait, .hero-status, .detail-card').forEach((item) => {
  if (prefersReducedMotion) return;
  item.addEventListener('pointerenter', () => gsap.to(item, { y: -7, duration: 0.35, ease: 'power2.out', overwrite: true }));
  item.addEventListener('pointerleave', () => gsap.to(item, { y: 0, duration: 0.5, ease: 'power3.out', overwrite: true }));
});

const networkCanvas = document.querySelector('[data-network-canvas]');
if (networkCanvas && !prefersReducedMotion) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 7;
  const renderer = new THREE.WebGLRenderer({ canvas: networkCanvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  const nodes = new THREE.Group();
  const points = [];
  const material = new THREE.MeshBasicMaterial({ color: 0x65d6d0, transparent: true, opacity: 0.78 });
  const geometry = new THREE.SphereGeometry(0.035, 8, 8);
  const coordinate = (seed, scale) => Math.sin(seed * 12.37) * 0.5 * scale;
  for (let index = 0; index < 38; index += 1) {
    const point = new THREE.Mesh(geometry, material);
    point.position.set(coordinate(index + 1, 7), coordinate(index + 9, 4.8), coordinate(index + 17, 2));
    nodes.add(point);
    points.push(point.position.clone());
  }
  const linePositions = [];
  points.forEach((point, index) => {
    points.slice(index + 1).forEach((other) => {
      if (point.distanceTo(other) < 1.45) linePositions.push(point.x, point.y, point.z, other.x, other.y, other.z);
    });
  });
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x2864d7, transparent: true, opacity: 0.2 }));
  scene.add(nodes, lines);
  const resize = () => {
    const bounds = networkCanvas.getBoundingClientRect();
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });
  const animate = (time) => {
    nodes.rotation.y = time * 0.00008;
    lines.rotation.y = time * 0.00008;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

const themeToggle = document.querySelector('.theme-toggle');
const setTheme = (isLight) => {
  document.documentElement.classList.toggle('theme-dark', !isLight);
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  themeToggle.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
};
if (themeToggle) {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const isLight = savedTheme !== 'dark';
  setTheme(isLight);
  themeToggle.addEventListener('click', () => {
    const nextIsLight = document.documentElement.classList.contains('theme-dark');
    setTheme(nextIsLight);
    localStorage.setItem('portfolio-theme', nextIsLight ? 'light' : 'dark');
  });
}

createIcons({ icons: { ArrowDown, ArrowUpRight, Lightbulb, Menu, X } });

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
emailjs.init({ publicKey: EMAIL_PUBLIC_KEY });
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector('button');
  const data = new FormData(form);
  button.disabled = true;
  formStatus.className = 'form-status';
  formStatus.textContent = 'Sending…';
  try {
    await emailjs.send(EMAIL_SERVICE, EMAIL_TEMPLATE, {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
      reply_to: data.get('email'),
      time: new Date().toLocaleString()
    });
    form.reset();
    formStatus.textContent = 'Message sent. I’ll get back to you soon.';
  } catch (error) {
    console.error(error);
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Could not send. Please email me directly instead.';
  } finally {
    button.disabled = false;
  }
});
