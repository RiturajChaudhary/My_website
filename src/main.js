import emailjs from '@emailjs/browser';
import './style.css';

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

const revealItems = document.querySelectorAll('.hero-copy, .hero-visual, .section-heading, .about-grid, .project-card, .skill-card, .workflow-marquee, .resume-card, .contact-grid, .site-footer');
revealItems.forEach((element) => element.classList.add('reveal'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
revealItems.forEach((element) => observer.observe(element));

const tiltItems = document.querySelectorAll('.project-card, .skill-card, .resume-card, .hero-portrait, .hero-status, .detail-card');
tiltItems.forEach((item) => {
  const handleMove = (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = (0.5 - (y / rect.height)) * 12;
    item.style.setProperty('--rotate-x', `${rotateX}deg`);
    item.style.setProperty('--rotate-y', `${rotateY}deg`);
    item.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
    item.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
  };

  item.addEventListener('pointermove', handleMove);
  item.addEventListener('pointerleave', () => {
    item.style.setProperty('--rotate-x', '0deg');
    item.style.setProperty('--rotate-y', '0deg');
  });
});

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
