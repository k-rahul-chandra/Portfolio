# 🌙 Rahul Chandra's Interactive Anime Portfolio

An immersive, anime-inspired 3D "study desk" portfolio built entirely with vanilla **HTML, CSS, and JavaScript** — no frameworks, no build tools. Visitors explore a cozy virtual room with a day/night cycle, parallax window scenery, and a flip-through journal that showcases projects, skills, and experience.

## ✨ Live Demo

> 🔗 **[rahul-resume.in](#)**

## 🧠 About

This project reimagines the traditional resume/portfolio site as an interactive scene — a 3D-styled room with a desk, window, wall art, and a shelf — where the centerpiece is a physical "journal" the visitor can open and flip through to read about projects, skills, and education.

Built and maintained by **Karupakala Rahul Chandra**, an AI & Machine Learning engineering student passionate about GenAI, autonomous agents, and full-stack development.

## 🚀 Features

- **🌗 Day/Night Toggle** — Switch between two fully illustrated scenery backgrounds (with a satisfying pull-string interaction) and a theme-aware color palette across the entire room.
- **🖼️ Parallax Window Scenery** — A layered background that reacts to mouse movement for subtle depth.
- **🎐 Animated Curtains & Ambient Details** — Waving curtain SVGs, floating dust particles, and twinkling stars for atmosphere.
- **📖 Interactive Flip-Book Journal** — Click the desk journal to open it, then navigate between pages (About, Education, Skills, Projects) styled like real notebook spreads.
- **🗂️ Project Showcase** — Dedicated journal spreads for each project, complete with tech-stack badges and detailed bullet points.
- **🔧 Desk Tools** — Quick-access shelf/desk items linking out to contact methods (e.g. Gmail).
- **💾 Persistent Preferences** — Theme choice is remembered via `localStorage` across visits.
- **📱 Responsive Design** — Scales across desktop and mobile viewports.

## 🛠️ Tech Stack

| Layer      | Technology                     |
|------------|---------------------------------|
| Structure  | HTML5                          |
| Styling    | CSS3 (custom properties, animations, Google Fonts) |
| Behavior   | Vanilla JavaScript (DOM APIs, `localStorage`, pointer events) |
| Fonts      | Comfortaa, Inter, Outfit, Caveat (Google Fonts) |

No external JS frameworks or bundlers are used — the entire experience runs on plain files that can be opened directly in a browser.

## 📁 Project Structure

```
.
├── index.html              # Page structure & journal content
├── index.css               # Styling, theming, and animations
├── index.js                 # Interactivity: theme toggle, journal navigation, parallax
├── background-day.png       # Daytime window scenery
├── background-night.png     # Nighttime window scenery
├── generate_resume.py        # Script that generates resume.pdf via ReportLab
└── resume.pdf                 # Generated resume (design source used across the site)
```

## 📄 Resume Generation

`resume.pdf` is programmatically generated using [ReportLab](https://www.reportlab.com/) via `generate_resume.py`. To regenerate it after making edits:

```bash
pip install reportlab
python generate_resume.py
```

This produces a clean, styled one-page PDF resume (`resume.pdf`) matching the content displayed in the portfolio.

## 🖥️ Running Locally

No build step is required. Simply clone the repo and open `index.html` in your browser:

```bash
git clone https://github.com/k-rahul-chandra/<repo-name>.git
cd <repo-name>
open index.html   # or double-click the file / use a local server
```

For the best experience (and to avoid any browser file-access restrictions), you can serve it locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## 👤 About Me

**Karupakala Rahul Chandra**
B.Tech in Artificial Intelligence & Machine Learning, Malla Reddy University (Expected 2027)

- 📍 Hyderabad, India
- 📧 rahulchandrakarupakala@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/rahul-chandra-karupakala-318a5b326)
- 💻 [GitHub](https://github.com/k-rahul-chandra)

### Featured Projects
- **J.A.R.V.I.S.** — A context-aware voice AI agent using LLMs, Whisper API, and function calling for system-level automation.
- **Enterprise Bank Customer Segmentation System** — An unsupervised ML pipeline (RFM + K-Means) analyzing 1M+ transactions across 800K consumers, with a Streamlit dashboard.
- **Multi-Agent Collaborative AI Research Assistant** — A CrewAI/LangChain-powered multi-agent system with ChromaDB-backed semantic search for research and code review.

## 📜 License

This project is shared for portfolio and personal use. Feel free to fork it for inspiration, but please don't republish it as your own personal site — swap in your own content and credit the original if reused as a template.

---

⭐ If you found this portfolio concept interesting, consider starring the repo!
