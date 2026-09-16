# Rituraj Chaudhary — Portfolio

Modern React + Vite portfolio with responsive CSS animations and no backend requirement.

## Local development

```bash
npm install
npm run dev
```

## Deploy on GitHub Pages or Cloudflare Pages

This is a static Vite app. Build it with `npm run build`, then serve the generated `dist` directory.

- **GitHub Pages:** the included `.github/workflows/deploy.yml` builds and deploys on every push to `main`. In repository settings, set Pages' source to **GitHub Actions**.
- **Cloudflare Pages:** connect the GitHub repository, use `npm run build` as the build command, and `dist` as the output directory.

The `CNAME` file preserves the custom GitHub Pages domain. The contact form uses `mailto:` so there is no third-party form service or server to maintain.
