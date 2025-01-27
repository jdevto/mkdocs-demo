# 🚀 **Deploying MkDocs on GitHub Pages**

This guide explains how to set up and deploy an **MkDocs** site using **GitHub Pages** with DevContainers for a consistent development environment.

---

## **1️⃣ Create a GitHub Repository**

1. Go to **GitHub** → [Create a New Repository](https://github.com/new)
2. Set up the repository:
   - **Repository Name**: `mkdocs-demo`
   - **Visibility**: Public (recommended for GitHub Pages)
   - **Initialize with README**: ✅ (checked)
3. Click **Create repository**.

---

## **2️⃣ Clone the Repository Locally**

Run the following in your terminal:

```bash
git clone https://github.com/YOUR_USERNAME/mkdocs-demo.git
cd mkdocs-demo
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## **3️⃣ Open in DevContainer**

To develop inside a DevContainer using VS Code:

1. Ensure **Docker** and the **Dev Containers extension** are installed.
2. Open the repository in **VS Code**.
3. Press `Ctrl+Shift+P` and select **"Reopen in Container"**.
4. The container will build, installing dependencies automatically.

Replace `YOUR_NAME` in `mkdocs.yml` with your actual name before proceeding.

---

## **4️⃣ Install MkDocs and Plugins (if not using DevContainer)**

If not using DevContainers, install **Python 3** and **pip**, then run:

```bash
python3 -m pip install -r requirements.txt
```

Ensure `requirements.txt` contains:

```txt
mkdocs
mkdocs-material
pymdown-extensions
mkdocs-minify-plugin
mkdocs-git-revision-date-localized-plugin
mkdocs-include-dir-to-nav
mkdocs-git-committers-plugin-2
mkdocs-redirects
mkdocs-awesome-pages-plugin
mkdocs-nav-weight
```

---

## **5️⃣ Initialize MkDocs and Create Content Files**

Run:

```bash
python3 -m mkdocs new .
```

This generates the `docs/` directory with a default `index.md` file. Now, replace `index.md` with meaningful content and create additional content directories and files:

```bash
mkdir -p docs/guides docs/tutorials docs/javascripts docs/stylesheets

# Create index.md
cat << EOF > docs/index.md
# Welcome to MkDocs

This documentation provides an overview of the MkDocs project structure and features.

## Quick Start

- **Installation:** Follow the guide to install dependencies.
- **Building the site:** Use 'mkdocs build' to generate static files.
- **Live preview:** Run 'mkdocs serve' to see changes locally.

## Project Structure

- **mkdocs.yml** - Configuration file
- **docs/** - Contains all documentation markdown files
- **site/** - Generated static site (after build)
EOF

# Create additional guide and tutorial files
echo "This is an introduction to MkDocs." > docs/guides/intro.md
echo "This covers advanced MkDocs usage." > docs/guides/advanced.md
echo "Follow these steps to set up your environment." > docs/tutorials/setup.md
echo "Instructions to deploy the documentation." > docs/tutorials/deployment.md

# Create JavaScript file
cat << EOF > docs/javascripts/extra.js
"use strict";

/* The following script adds the ability to color table cells
 * To change a cell's background color, wrap the text in a
 * HTML <div> tag with a class name corresponding to one of
 * the keys in the "CLASSNAME_TO_COLOR" object.
 * Example: <div class="table-cell-bg-red">Text</div>
 */

const CLASSNAME_TO_COLOR = {
    'table-cell-bg-red': 'bg-red',
    'table-cell-bg-yellow': 'bg-yellow',
    'table-cell-bg-green': 'bg-green',
    'table-cell-bg-blue': 'bg-blue'
};

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    for (const key in CLASSNAME_TO_COLOR) {
        if (CLASSNAME_TO_COLOR.hasOwnProperty(key)) {
            const className = CLASSNAME_TO_COLOR[key];
            let elementsToChange = document.getElementsByClassName(key);
            for (const e of elementsToChange) {
                let parent = e.parentElement;
                if (parent.tagName === 'TD') {
                    parent.classList.add(className);
                }
            }
        }
    }
});
EOF

# Create CSS file
cat << EOF > docs/stylesheets/extra.css
/* Extra styles for MkDocs tables */
.bg-red { background-color: #ffcccc !important; }
.bg-yellow { background-color: #fff2cc !important; }
.bg-green { background-color: #d9ead3 !important; }
.bg-blue { background-color: #cfe2f3 !important; }
EOF
```

---

## **6️⃣ Configure `mkdocs.yml`**

Edit `mkdocs.yml`:

```yaml
site_name: mkdocs
site_url: https://YOUR_USERNAME.github.io/mkdocs-demo/
site_author: YOUR_NAME
repo_name: YOUR_USERNAME/mkdocs-demo
repo_url: https://github.com/YOUR_USERNAME/mkdocs-demo

markdown_extensions:
  - toc:
      baselevel: 2
      permalink: true
  - admonition
  - footnotes
  - pymdownx.critic
  - pymdownx.inlinehilite
  - pymdownx.magiclink
  - pymdownx.mark
  - pymdownx.caret
  - pymdownx.keys
  - pymdownx.details
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tilde
  - pymdownx.superfences
  - pymdownx.snippets
  - attr_list
  - md_in_html
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true

plugins:
  - search
  - minify
  - git-revision-date-localized
  - awesome-pages
  - mkdocs-nav-weight
  - git-committers:
      repository: YOUR_USERNAME/mkdocs-demo
      branch: main

theme:
  name: material
  palette:
    primary: 'indigo'
    accent: 'indigo'
  features:
    - content.code.copy
    - content.code.annotate

extra_javascript:
  - 'javascripts/extra.js'
extra_css:
  - 'stylesheets/extra.css'

nav:
  - Home: index.md
  - Guides:
      - Introduction: guides/intro.md
      - Advanced Topics: guides/advanced.md
  - Tutorials:
      - Setup Guide: tutorials/setup.md
      - Deployment Guide: tutorials/deployment.md
```

Replace `YOUR_USERNAME` and `YOUR_NAME` accordingly.

---

## **7️⃣ Preview the Site Locally**

Run:

```bash
python3 -m mkdocs serve --dev-addr=0.0.0.0:8000
```

Access your site at [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/).

---

---

## **8️⃣ Configure GitHub Actions for Deployment**

Instead of manually configuring GitHub Pages, we rely on GitHub Actions to deploy the MkDocs site automatically.

Create a GitHub Actions workflow file at `.github/workflows/ci.yml` with the following content:

```yaml
name: Deploy MkDocs
on:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-(${{ env.cache_id }})
          path: .cache
          restore-keys: |
            mkdocs-material-
      - run: |
          pip install \
            pymdown-extensions \
            mkdocs-minify-plugin \
            mkdocs-git-revision-date-localized-plugin \
            mkdocs-include-dir-to-nav \
            mkdocs-git-committers-plugin-2 \
            mkdocs-redirects \
            mkdocs-awesome-pages-plugin \
            mkdocs-nav-weight \
            mkdocs-material
      - run: mkdocs gh-deploy --force
```

This workflow:

- Runs when changes are pushed to the `main` branch.
- Installs Python and dependencies.
- Deploys the MkDocs site automatically to GitHub Pages.
- Once configured, you can simply update existing .md files or create new ones inside the docs/ directory.
- Don't forget to update the nav section in mkdocs.yml as necessary to reflect any new pages.

---

## **9️⃣ Enable GitHub Pages**

To ensure your site is deployed correctly, manually enable GitHub Pages:

### **For Personal Repositories:**

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub.
   - Click on **"Settings"** (⚙️) in the top navigation bar.

2. **Find the Pages Section**
   - Scroll down to the **"Pages"** section in the left sidebar.

3. **Set the Deployment Source**
   - Under **"Build and Deployment"**, select **"GitHub Actions"** as the source.
   - Click **"Save"**.
   - Choose **"Deploy from a branch"** option now that its available.
   - Under **"Branch"**, select `gh-pages` as the source.
   - Click **"Save"**.

4. **Check the Deployment Status**
   - After enabling GitHub Pages, the site will be deployed automatically.
   - Your site will be available at:

     ```plaintext
     https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
     ```

5. **Verify the Site**
   - Open the provided URL in a browser.
   - If the page does not load immediately, wait a few minutes and refresh.

### **For Organization Repositories (Extra Step Required)**

GitHub **disables public GitHub Pages by default** for organization repositories. If deploying within an organization, an admin must **enable Pages** manually:

1. **Go to Organization Settings**
   - Navigate to the organization on GitHub.
   - Click on **"Settings"** (⚙️) in the top navigation bar.

2. **Enable Public Pages**
   - In the left sidebar, select **"Policies" → "Member privileges"**.
   - Scroll down to **"Pages creation"**.
   - Check the box **"Public"** to allow publishing public GitHub Pages.
   - Click **"Save"**.

3. **Enable GitHub Pages for the Repository**
   - Follow the standard **GitHub Pages setup** steps above.

4. **Check Deployment Status**
   - Your site will be available at:

     ```plaintext
     https://YOUR_ORG.github.io/YOUR_REPOSITORY/
     ```

5. **Verify the Site**
   - Open the provided URL in a browser.
   - If the page does not load immediately, wait a few minutes and refresh.

---

## **🔟 Deploy to GitHub Pages**

Push your code to GitHub:

```bash
git branch dev
git checkout dev
git add --all
git commit -m "feat: initial mkdocs setup" -m "sets initial configuration"
git push origin dev
```

Once changes are reviewed and merged into `main`, the GitHub Actions workflow will automatically deploy the site to GitHub Pages.

---

### 🎉 **Your MkDocs site is now live and ready! 🚀**

A working example of this setup can be found here: [GitHub - jdevto/mkdocs-demo](https://github.com/jdevto/mkdocs-demo). This repository also contains `.devcontainer` configurations necessary to run it locally.
