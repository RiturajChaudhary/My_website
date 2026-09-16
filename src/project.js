import './style.css';

const projects = {
  terraform: {
    meta: 'Infrastructure as code / AWS',
    title: 'AWS infrastructure with Terraform',
    description: 'Automated provisioning of complete AWS environments, turning infrastructure decisions into repeatable, reviewable code.',
    points: ['Provisioned VPCs, subnets, security groups, EC2, ASG, ELB, and S3.', 'Used AMIs, launch templates, variables, outputs, and local values.', 'Practiced the full plan, apply, destroy cycle and state management.'],
    links: []
  },
  jenkins: {
    meta: 'Continuous delivery / Jenkins',
    title: 'Jenkins pipeline',
    description: 'An end-to-end pipeline that takes a GitHub change through build, test, Docker packaging, and a traceable registry push.',
    points: ['Checkout, build, test, Docker build, and Docker Hub push stages.', 'GitHub webhook triggers builds on every push to main.', 'Credentials stay in Jenkins and images are tagged with the build number.'],
    links: []
  },
  gitops: {
    meta: 'GitOps / Kubernetes',
    title: 'ArgoCD delivery loop',
    description: 'A fully automated GitOps loop where a code push becomes a deployed Kubernetes change with no manual handoff.',
    points: ['Jenkins polls GitHub, builds a Node.js image on AWS EC2, and pushes it to Docker Hub.', 'The pipeline updates the Kubernetes manifest in a separate config repository.', 'ArgoCD watches the config repository and auto-deploys to Minikube with self-healing enabled.'],
    links: [
      ['App repo', 'https://github.com/RiturajChaudhary/argo-cd'],
      ['K8s config', 'https://github.com/RiturajChaudhary/k8s-config'],
      ['Docker Hub', 'https://hub.docker.com/r/rituraj4164/frontend-app']
    ]
  }
};

const key = new URLSearchParams(window.location.search).get('project') || 'terraform';
const project = projects[key] || projects.terraform;
document.title = `${project.title} | Rituraj Chaudhary`;
document.querySelector('#detail-meta').textContent = project.meta;
document.querySelector('#detail-title').textContent = project.title;
document.querySelector('#detail-description').textContent = project.description;

const points = document.querySelector('#detail-points');
project.points.forEach((point) => {
  const item = document.createElement('li');
  item.textContent = point;
  points.append(item);
});

const links = document.querySelector('#detail-links');
if (project.links.length === 0) {
  links.textContent = 'Details available on request.';
} else {
  project.links.forEach(([label, url]) => {
    const link = document.createElement('a');
    link.className = 'text-link detail-link';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = `${label} ↗`;
    links.append(link);
  });
}
