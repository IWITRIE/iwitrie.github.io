# 韩琦卓 · Personal Homepage

Personal academic homepage of **Han Qizhuo (韩琦卓)**, undergraduate at the School of Computer Science, Nankai University.

Live at: [iwitrie.github.io](https://iwitrie.github.io)

---

## About

This site serves as my personal academic homepage, covering my educational background, research interests, competition experience, and honors. Built as a static single-page site deployable on GitHub Pages with no backend dependencies.

## Stack

- Plain HTML5 / CSS3 / Vanilla JS — no frameworks, no build step
- Google Fonts: Inter, Noto Serif SC, JetBrains Mono
- Font Awesome 6 for icons
- CSS custom properties for theming (dark/light)
- IntersectionObserver for scroll animations

## Structure

```
├── index.html      # Main page
├── styles.css      # All styles and theme tokens
├── script.js       # Theme toggle, nav, scroll effects
├── assets/
│   └── cv.pdf      # CV (add manually)
└── README.md
```

## Sections

| # | Section | Content |
|---|---------|---------|
| 01 | About | Bio, skills, contact info card |
| 02 | Education | NKU CS + Finance minor, GPA, rankings, CET-6 |
| 03 | Research | Research directions, ongoing work hint |
| 04 | Competitions | 5 awards across national and international contests |
| 05 | Honors | National Scholarship, Gong Neng Scholarship, Merit Student |
| 06 | Contact | Email, phone, GitHub, location |

## Local Preview

No build step needed — just open `index.html` in a browser, or use any static file server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Push to a GitHub repository named `<username>.github.io`, then enable GitHub Pages (Settings → Pages → Deploy from branch `main`, root `/`).

---

Contact: [2310428@mail.nankai.edu.cn](mailto:2310428@mail.nankai.edu.cn)
