# Guudle IT Solutions Website

Premium enterprise IT solutions company website built with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript**.

## Contact forms → Supabase

Enquiry forms store submissions in Supabase (`Guudleitsolutions`).

Setup notes: [docs/SUPABASE-CONTACT.md](docs/SUPABASE-CONTACT.md)

Browser config: `assets/js/supabase-config.local.js`

## Project Structure

```
├── index.html                 # Home page
├── assets/
│   ├── css/styles.css         # Custom styles, animations, glassmorphism
│   └── js/
│       ├── components.js      # Shared header, footer, mega menu, chatbot
│       ├── main.js            # Interactions, sliders, counters, theme
│       └── services-data.js   # Service page content reference
├── pages/
│   ├── about.html
│   ├── blog.html
│   ├── careers.html
│   ├── contact.html
│   ├── industries.html
│   ├── our-work.html
│   ├── portfolio.html         # Redirects to our-work.html
│   ├── case-studies/          # Individual case study pages
│   ├── technologies.html
│   └── services/              # 29 service pages
│       ├── website-development.html
│       ├── cloud-solutions.html
│       ├── ai.html
│       └── ...
└── generate-services.ps1      # Script to regenerate service pages
```

## Features

- Sticky navigation with mega menu for all services
- Dark/light mode toggle with localStorage persistence
- Mobile-responsive hamburger menu
- Scroll reveal animations
- Animated counters
- Testimonial slider
- Client logo carousel
- FAQ accordions
- Portfolio filter tabs
- AI chatbot UI
- Newsletter signup
- Contact form with GDPR checkbox
- Google Maps embed
- SEO meta tags
- Accessibility (skip links, ARIA labels, focus states)

## Pages (38 total)

| Category | Pages |
|----------|-------|
| Home | index.html |
| Development Services | 14 pages |
| Solutions | 4 pages |
| Cloud Services | 4 pages |
| Analytics & BI | 4 pages |
| IoT & AI | 3 pages |
| Portfolio & Case Studies | 2 pages |
| Industries, About, Technologies, Careers, Blog, Contact | 6 pages |

## Tech Stack

- HTML5 (semantic markup)
- Tailwind CSS (CDN)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Inter)

## Customization

- Edit `assets/js/components.js` for navigation, footer, and site info
- Edit `assets/css/styles.css` for custom animations and theme variables
- Regenerate service pages: `powershell -ExecutionPolicy Bypass -File generate-services.ps1`

## License

© 2026 Guudle IT Solutions. All rights reserved.
