# 🖥️ Interactive Anime Desk Portfolio — Rahul Chandra

Welcome to my personal developer portfolio! This website features an interactive, custom-animated 3D desk nook styled in a cozy anime/lofi study room aesthetic. The page is built entirely on vanilla web standards, incorporating responsive parallax elements, physical room interaction handles, ambient CPU and screen lighting, and dynamic storybook overlays.

---

## ✨ Key Features

*   **Tactile Room Mechanics**: Pull the desk lamp cord or click the top-right header switch to seamlessly toggle between a bright, cool **6:00 AM Dawn Day Theme** and a glowing **Midnight Cozy Dark Theme**.
*   **Widescreen Desktop Setup**: Features a central computer setup containing:
    *   **Monitor**: Stacks a dynamic system clock and a synchronized calendar date display that glowing neon cyan in dark mode.
    *   **Mechanical Keyboard & Mouse**: Detailed with custom key-cap textures and smooth alignment coordinates.
    *   **Gaming CPU Tower**: Styled with glass side-panels and a pulsing neon violet/cyan RGB GPU light show.
*   **Parallax Cityscape Scenery**: A customized window layout that displays parallax-enabled cityscape scenery layers (`background-day.png` / `background-night.png`) shifting subtly with cursor movements.
*   **Interactive Book Organizer**: Displays readable, floating spine titles (About Me, My Skills, My Projects, Resume). Hovering pulls the book forward, and clicking zooms the camera directly into an open-book storybook layout.
*   **Interactive Social Toolbox Mug**: Evenly spaces straightened social media tool indicators that display your actual email/phone directly on hover. Clicking copies the details to the system clipboard and triggers native actions (`mailto:`/`tel:`) with immediate `"Copied!"` visual feedback.
*   **Highly Responsive Grid**: Uses CSS transitions and media query layouts to scale down neatly from widescreen monitors to tablet and phone displays.

---

## 🛠️ Built With

*   **HTML5 & CSS3**: Semantically structured layout and flexible CSS variable configurations for theme rendering.
*   **Vanilla JavaScript**: Zero heavy framework dependencies. Powers the canvas clock, pull string mechanics, cursor parallax calculations, clipboard copies, and storybook camera zooms.
*   **Python (ReportLab)**: Uses a backend script `generate_resume.py` to programmatically build the PDF version of the resume.

---

## 📁 File Structure

```text
├── background-day.png        # Sunrise cityscape background image
├── background-night.png      # Midnight cityscape background image
├── index.html                # Main markup containing structure and storybooks content
├── index.css                 # Stylings, variables, typography, and glow animations
├── index.js                  # Parallax, clock/date, string drag, and modal scripts
├── generate_resume.py        # Python script to compile your resume.pdf programmatically
├── resume.pdf                # Compiled resume document downloaded on clicking "Resume"
├── customization_guide.md    # Detailed developer guide for text and resume editing
└── README.md                 # This project documentation file
```

---

## 🚀 Quick Local Development Setup

To run the portfolio locally on your machine and preview modifications:

1.  **Clone the workspace** onto your machine.
2.  **Launch a local server** in the project folder to bypass browser cross-origin policy for local files (especially matching dynamic assets):
    ```bash
    # If Python is installed:
    python -m http.server 8085
    ```
3.  **Open your browser** and navigate to:
    ```text
    http://localhost:8085
    ```

---

## 🌐 Production Deployment Guide

Since this is a fully static client-side project, you can deploy it instantly for free:

### Option A: GitHub Pages
1. Push all files to a public repository on your GitHub account.
2. Go to **Settings** -> **Pages** in the repository settings.
3. Select the branch containing your code (e.g. `main`) and `/root` directory, then click **Save**.
4. Your website is live at `https://<your-username>.github.io/<repo-name>/`.

### Option B: Vercel / Netlify
1. Log into Vercel or Netlify using your GitHub credentials.
2. Select **New Project** and import your portfolio repository.
3. Press **Deploy**. The platform automatically configures SSL and delivers a live shareable domain.

---

## ⚙️ Customization

If you want to edit your contact details, biography pages, or upload a new PDF resume, please read the provided developer guidelines in the [customization_guide.md](file:///e:/carear/portfolio/customization_guide.md) file.
