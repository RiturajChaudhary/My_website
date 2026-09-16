import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, Boxes, Cloud, Code2, Container, Cpu, Download, ExternalLink,
  Github, GitBranch, Globe2, Layers3, Linkedin, Mail, MapPin, Menu, Send,
  Server, ShieldCheck, Sparkles, Terminal, X, Zap
} from 'lucide-react';
import './styles.css';

const projects = [
  {
    number: '01', type: 'INFRASTRUCTURE AS CODE', title: 'AWS Infrastructure Automation',
    description: 'Reusable Terraform modules provision a production-shaped AWS environment with networking, compute, storage, and autoscaling.',
    tags: ['Terraform', 'AWS', 'VPC', 'EC2'],
    icon: Cloud, accent: 'cyan', details: ['VPC, subnets, security groups, EC2, ASG, ELB, and S3', 'AMI and launch template workflows for repeatable releases', 'Variables, outputs, and state management for reusable infrastructure']
  },
  {
    number: '02', type: 'CONTINUOUS DELIVERY', title: 'Jenkins CI/CD Pipeline',
    description: 'A complete delivery pipeline that turns every GitHub push into a tested, versioned Docker image ready for deployment.',
    tags: ['Jenkins', 'GitHub', 'Docker', 'CI/CD'],
    icon: GitBranch, accent: 'violet', details: ['Checkout, build, test, Docker build, and registry push stages', 'Automated webhook triggers on every push to main', 'Build-number image tags and credentials kept out of source code']
  },
  {
    number: '03', type: 'CONTAINER ORCHESTRATION', title: 'Kubernetes Cluster Management',
    description: 'Containerized applications deployed with production-minded manifests, isolated namespaces, services, ingress, and controlled rollouts.',
    tags: ['Kubernetes', 'Docker', 'Minikube', 'kubectl'],
    icon: Boxes, accent: 'blue', details: ['Deployments, StatefulSets, DaemonSets, Services, and Ingress', 'Replica scaling and rolling updates with kubectl', 'Namespaces and workload isolation for safer operations']
  },
  {
    number: '04', type: 'GITOPS / AUTOMATION', title: 'Jenkins + ArgoCD GitOps',
    description: 'An end-to-end GitOps workflow that builds on AWS EC2, publishes to Docker Hub, updates manifests, and self-heals deployments.',
    tags: ['ArgoCD', 'AWS EC2', 'GitOps', 'Node.js'],
    icon: Zap, accent: 'pink', details: ['Jenkins builds and publishes versioned Node.js images', 'Manifest repository stays separate from application code', 'ArgoCD auto-sync and self-heal keep the cluster aligned'],
    links: [{ label: 'App repo', url: 'https://github.com/RiturajChaudhary/argo-cd' }, { label: 'K8s config', url: 'https://github.com/RiturajChaudhary/k8s-config' }]
  }
];

const skills = [
  ['AWS Cloud', Cloud, 'EC2 · VPC · S3 · IAM · ASG'], ['Linux', Terminal, 'Ubuntu · Bash · systemd'],
  ['Docker', Container, 'Images · networking · volumes'], ['Kubernetes', Boxes, 'Deployments · ingress · services'],
  ['Terraform', Layers3, 'HCL · state · modules'], ['Jenkins', GitBranch, 'Pipelines · webhooks · releases'],
  ['ArgoCD / GitOps', GitBranch, 'Sync · drift detection · self-heal'], ['Observability', ShieldCheck, 'Reliable, secure operations']
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`);
    window.location.href = `mailto:manojchy4164@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return <>
    <div className="noise" />
    <div className="aurora aurora-one" /><div className="aurora aurora-two" />
    <header className="topbar">
      <a className="brand" href="#top"><span>RC</span><small>DEVOPS / CLOUD</small></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {['about', 'skills', 'projects', 'contact'].map((item) => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        <a className="nav-cta" href="resume.pdf" download>Resume <Download size={14} /></a>
      </nav>
    </header>

    <main id="top">
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> Available for opportunities · Dang, Nepal</div>
          <h1>Building systems<br /><em>that stay up.</em></h1>
          <p className="hero-lede">I'm <strong>Rituraj Chaudhary</strong>, a DevOps engineer focused on cloud infrastructure, automation, and delivery systems that make shipping software feel effortless.</p>
          <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a><a className="text-link" href="#contact">Let's connect <span>↗</span></a></div>
          <div className="hero-metrics"><div><strong>04+</strong><span>Cloud projects</span></div><div><strong>09</strong><span>Core technologies</span></div><div><strong>100%</strong><span>Curiosity-driven</span></div></div>
        </div>
        <div className="hero-art" aria-label="DevOps workflow visualization">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="terminal-card"><div className="terminal-head"><span /><span /><span /><b>rituraj@cloud:~</b></div><div className="terminal-body"><p><i>$</i> whoami</p><strong>devops-engineer</strong><p><i>$</i> cat mission.txt</p><span className="terminal-accent">automate · deploy · improve</span><p><i>$</i> <span className="blink">_</span></p></div></div>
          <div className="floating-chip chip-one"><Cloud size={15} /> AWS</div><div className="floating-chip chip-two"><Container size={15} /> Docker</div><div className="floating-chip chip-three"><GitBranch size={15} /> GitOps</div>
        </div>
      </section>

      <section id="about" className="section-shell section">
        <div className="section-label">01 / About</div><div className="about-grid reveal"><div><h2>Infrastructure is<br /><span>a craft.</span></h2></div><div className="about-copy"><p>I'm a Computer Science student from Nepal who enjoys understanding what happens behind the interface: the Linux processes, networks, containers, and pipelines that keep products moving.</p><p>From provisioning AWS environments with Terraform to building self-healing GitOps workflows, I learn by building real systems. I care about clean automation, useful documentation, and steady improvement.</p><a className="text-link" href="resume.pdf" download>Download full resume <Download size={15} /></a></div></div>
      </section>

      <section id="skills" className="section-shell section">
        <div className="section-label">02 / Toolkit</div><div className="section-heading reveal"><h2>Tools I use to<br /><span>move fast.</span></h2><p>A practical stack for turning ideas into reliable, repeatable deployments.</p></div>
        <div className="skills-grid">{skills.map(([name, Icon, detail], index) => <article className="skill-card reveal" style={{ '--delay': `${index * 50}ms` }} key={name}><Icon size={21} /><h3>{name}</h3><p>{detail}</p></article>)}</div>
      </section>

      <section id="projects" className="section-shell section">
        <div className="section-label">03 / Selected work</div><div className="section-heading reveal"><h2>Built, broken,<br /><span>rebuilt better.</span></h2><p>Hands-on projects where infrastructure, automation, and curiosity meet.</p></div>
        <div className="project-grid">{projects.map((project) => { const Icon = project.icon; return <article className={`project-card reveal ${project.accent}`} key={project.number} onClick={() => setSelected(project)}><div className="project-top"><span>{project.number} — {project.type}</span><Icon size={22} /></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-link">View case study <ArrowUpRight size={16} /></button></article>; })}</div>
      </section>

      <section id="contact" className="section-shell section contact-section">
        <div className="section-label">04 / Contact</div><div className="contact-grid reveal"><div><h2>Have a challenge?<br /><span>Let's build.</span></h2><p>Whether you're hiring, collaborating, or just want to talk about cloud infrastructure, my inbox is open.</p><div className="contact-details"><a href="mailto:manojchy4164@gmail.com"><Mail size={17} /> manojchy4164@gmail.com</a><span><MapPin size={17} /> Gadhawa, Dang, Nepal</span></div><div className="socials"><a href="https://github.com/RiturajChaudhary" target="_blank" rel="noreferrer"><Github size={18} /></a><a href="https://linkedin.com/in/rituraj-chaudhary4146" target="_blank" rel="noreferrer"><Linkedin size={18} /></a><a href="mailto:manojchy4164@gmail.com"><Mail size={18} /></a></div></div><form onSubmit={submit} className="contact-form"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@company.com" /></label><label>Message<textarea name="message" required rows="5" placeholder="Tell me about the opportunity..." /></label>{sent && <p className="form-status">Your email app is opening with the message ready to send.</p>}<button className="button primary" type="submit">Open email app <Send size={16} /></button></form></div></section>
    </main>
    <footer><span>© 2026 Rituraj Chaudhary</span><span>Designed & built with intention <Sparkles size={14} /></span><a href="#top">Back to top ↑</a></footer>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="project-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X /></button><div className={`modal-kicker ${selected.accent}`}>{selected.number} / {selected.type}</div><h2>{selected.title}</h2><p>{selected.description}</p><ul>{selected.details.map((detail) => <li key={detail}><ShieldCheck size={16} />{detail}</li>)}</ul><div className="modal-actions">{selected.links?.map((link) => <a className="text-link" href={link.url} target="_blank" rel="noreferrer" key={link.label}>{link.label} <ExternalLink size={14} /></a>)}</div></div></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
