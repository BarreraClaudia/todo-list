# Webpack Template

Get started with your webpack project. Configured for html, css, images and fonts.

## Usage

(Port 8080)

```
  npm run dev
```

## Build for production

```
  npm run build
```

## Deploy/Redeploy to GitHub Pages

### Deploy

Make sure you have a gh-pages branch `git branch gh-pages`

### Deploy & Redeploy

Make sure you have all your work committed `git status`

```
  git checkout gh-pages && git merge main --no-edit

  npm run build

  git add dist -f && git commit -m "Deployment commit"

  npm run deploy

  git checkout main

  # If redeploying ٩(｡•́‿•̀｡)۶
  git push
```

Note: Recall that the source branch for GitHub Pages is set in your repository’s settings. Get this changed to the gh-pages branch.
