# ChemLab Virtual — CLAUDE.md

## Project Overview

A **frontend-only** virtual chemistry laboratory website for school students (grades 9–11).
Students can explore 3 interactive chemistry lab experiments through step-by-step methodology,
CSS/JS animations, and embedded YouTube videos. The site supports **3 languages**: English, Russian, and Kazakh.

No backend, no authentication, no database. Pure React SPA.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI Framework |
| Vite | 5 | Build tool |
| React Router | v6 | Client-side routing |
| Tailwind CSS | v3 | Styling |
| react-i18next | latest | Internationalization (EN/RU/KZ) |
| i18next | latest | i18n core |
| Framer Motion | latest | Page transitions & UI animations |
| lucide-react | latest | Icons |

---

## Initial Setup Commands

Run these commands in order to scaffold the project from scratch:

```bash
npm create vite@latest chemistry-virtual-lab -- --template react
cd chemistry-virtual-lab
npm install
npm install react-router-dom react-i18next i18next framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## Folder Structure

```
chemistry-virtual-lab/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── images/           # any static images/SVGs
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx        # Top navigation + language switcher
│   │   │   ├── Footer.jsx        # Footer with links
│   │   │   └── Layout.jsx        # Wraps Header + Footer + <Outlet />
│   │   ├── ui/
│   │   │   ├── HeroSlider.jsx    # Auto-sliding hero banner (3 slides)
│   │   │   ├── LabCard.jsx       # Card shown in labs list page
│   │   │   ├── StatsCounter.jsx  # Animated number counters (homepage)
│   │   │   └── LanguageSwitcher.jsx  # EN / RU / KZ dropdown
│   │   └── simulators/
│   │       ├── TitrationSimulator.jsx    # Lab 1 interactive CSS/JS animation
│   │       ├── ElectrolysisSimulator.jsx # Lab 2 interactive CSS/JS animation
│   │       └── FlameTestSimulator.jsx    # Lab 3 interactive CSS/JS animation
│   ├── pages/
│   │   ├── HomePage.jsx          # Route: /
│   │   ├── LabsListPage.jsx      # Route: /labs
│   │   └── labs/
│   │       ├── TitrationPage.jsx         # Route: /labs/titration
│   │       ├── ElectrolysisPage.jsx      # Route: /labs/electrolysis
│   │       └── FlameTestPage.jsx         # Route: /labs/flame-test
│   ├── i18n/
│   │   ├── index.js              # i18next configuration
│   │   └── locales/
│   │       ├── en.json           # English translations
│   │       ├── ru.json           # Russian translations
│   │       └── kz.json           # Kazakh translations
│   ├── data/
│   │   └── labs.js               # Lab metadata: id, title, description, route, color, icon
│   ├── App.jsx                   # Router setup
│   ├── main.jsx                  # Entry point + i18n init
│   └── index.css                 # Tailwind directives + global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── CLAUDE.md
```

---

## Routing Structure

```jsx
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="labs" element={<LabsListPage />} />
      <Route path="labs/titration" element={<TitrationPage />} />
      <Route path="labs/electrolysis" element={<ElectrolysisPage />} />
      <Route path="labs/flame-test" element={<FlameTestPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

---

## Design System

### Color Palette

```js
// tailwind.config.js — extend colors:
colors: {
  primary: {
    DEFAULT: '#1a73e8',   // Main blue (buttons, links, headers)
    dark:    '#1557b0',   // Hover state
    light:   '#e8f0fe',   // Light blue backgrounds
  },
  secondary: {
    DEFAULT: '#2d9e44',   // Chemistry green (accents)
    light:   '#e6f4ea',
  },
  accent:    '#ff6d00',   // Orange (badges, highlights)
  surface:   '#f7f8fc',   // Page background
  card:      '#ffffff',   // Card background
  text: {
    primary:   '#1e2a3a',
    secondary: '#5f6b7a',
    muted:     '#9aa5b4',
  }
}
```

### Typography

- **Font**: `Inter` (Google Fonts) — modern, clean, readable
- Headings: `font-bold` or `font-semibold`
- Body: `font-normal`, `text-base` (16px)
- Small labels: `text-sm`, `text-xs`

### Shadows & Borders

- Cards: `shadow-md rounded-2xl`
- Hover cards: `hover:shadow-xl transition-shadow duration-300`
- Border radius: prefer `rounded-2xl` (16px) for cards, `rounded-full` for badges

### Spacing

- Section padding: `py-16 px-4` (desktop), `py-10 px-4` (mobile)
- Card padding: `p-6`
- Grid gaps: `gap-6` or `gap-8`

---

## Header Component

```
[ Logo + site name ]   [ Home | Lab Works | About | Contact ]   [ EN | RU | KZ ]
```

- Sticky top, white background, subtle bottom border shadow
- Mobile: hamburger menu (toggle nav links)
- Language switcher: dropdown with flag emojis or text (EN / RU / KZ)
- Active nav link gets `text-primary border-b-2 border-primary`

---

## Pages Specification

### 1. HomePage (`/`)

**Sections (top to bottom):**

1. **HeroSlider** — full-width banner, auto-slides every 4s, 3 slides:
   - Slide 1: "Virtual Chemistry Lab" — tagline + CTA button → `/labs`
   - Slide 2: "Learn by Doing" — animations illustration
   - Slide 3: "Safe, Free, Accessible" — icon grid
   - Dots navigation at bottom

2. **What is a Virtual Lab?** — two-column section:
   - Left: explanatory text (translated)
   - Right: embedded intro YouTube video (placeholder `https://www.youtube.com/embed/dQw4w9WgXcQ`)

3. **How It Works** — 3-step horizontal cards with icons:
   - Step 1: Choose a Lab → Step 2: Read the Theory → Step 3: Run the Simulation

4. **Lab Works Preview** — grid of 3 LabCards linking to each lab

5. **StatsCounter** — 3 animated counters:
   - "500+ Students", "3 Labs", "100% Free"

6. **Why Virtual Labs?** — feature list with icons:
   - Safe (no chemicals), Anytime access, Interactive, Free

### 2. LabsListPage (`/labs`)

- Page title + subtitle (translated)
- Grid of 3 `LabCard` components (2 cols on tablet, 3 on desktop)
- Each card shows: color banner, emoji icon, lab title, short description, "Start Lab →" button

### 3. Individual Lab Pages (`/labs/:slug`)

Each lab page has these sections in order:

```
1. Breadcrumb: Home > Labs > [Lab Name]
2. Lab Title + colored badge
3. Tabs: [ Theory | Simulator | Video ]
   - Theory tab:
     a. Objective
     b. Materials Needed
     c. Step-by-step Methodology
     d. Safety Notes
     e. Expected Results
     f. Conclusion Questions
   - Simulator tab:
     - CSS/JS interactive animation (see Simulators section)
     - "Reset" button
   - Video tab:
     - Embedded YouTube video
     - Short description below
4. Key Takeaways (bullet points)
5. Next Lab → button
```

---

## Simulators (CSS/JS Animations)

Each simulator lives in `src/components/simulators/` and uses React state + CSS animations.
No external libraries for the animation itself — use `@keyframes` in CSS + React `useState`.

### Lab 1: Acid-Base Titration (`TitrationSimulator.jsx`)

**Visual layout:**
- Burette (tall cylinder, top) with liquid dropping
- Conical flask (bottom center) with solution that changes color
- pH meter display on the side

**Interaction:**
- "Add Acid" button → liquid drip animation from burette, solution in flask gradually changes color:
  - Blue (alkaline) → Green → Yellow → Pink/Red (acidic)
- "Reset" button → returns to initial state
- Show pH value updating: 12 → 7 → 2 (as drops are added)

**CSS animations needed:**
- `@keyframes drip` — drop falling from burette tip
- `@keyframes colorShift` — background-color transition in flask
- pH number counter transition with `transition: all 0.5s`

### Lab 2: Electrolysis of Water (`ElectrolysisSimulator.jsx`)

**Visual layout:**
- Water container (large rectangle, light blue)
- Two electrodes (vertical dark bars) inside water
- Bubbles rising from each electrode
- Labels: "H₂" (left/cathode), "O₂" (right/anode)
- Battery/power source at top connected by wires

**Interaction:**
- "Start Electrolysis" button → bubbles start rising (CSS animation)
- Bubbles rise from bottom of each electrode to top
- H₂ bubbles: left side (twice as many — 2:1 ratio)
- O₂ bubbles: right side (half as many)
- "Stop" button → bubbles freeze

**CSS animations needed:**
- `@keyframes rise` — bubbles float upward and fade out
- Stagger bubble appearance with `animation-delay`
- Wire glow effect when "Start" is pressed

### Lab 3: Flame Test (`FlameTestSimulator.jsx`)

**Visual layout:**
- Bunsen burner (bottom center) with flame
- Wire loop on a handle
- Metal salt selector (clickable buttons/chips):
  - Lithium → Red/Crimson
  - Sodium → Yellow
  - Potassium → Lilac/Purple
  - Copper → Green/Blue-Green
  - Calcium → Brick Red

**Interaction:**
- User clicks a metal salt button
- Wire loop dips into salt solution (short animation)
- Wire moves into flame → flame changes color
- Color name displayed below the flame
- "Try Another" button to reset

**CSS animations needed:**
- `@keyframes flicker` — flame flicker effect always running
- `@keyframes colorChange` — flame color transition on metal selection
- `@keyframes dip` — wire loop dipping into solution then into flame

---

## i18n Configuration

### Setup (`src/i18n/index.js`)

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import kz from './locales/kz.json';

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ru: { translation: ru }, kz: { translation: kz } },
    lng: 'en',           // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
```

### Import in `main.jsx`

```js
import './i18n/index.js';
```

### Translation Keys Structure (`en.json` example)

```json
{
  "nav": {
    "home": "Home",
    "labs": "Lab Works",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "title": "Virtual Chemistry Laboratory",
    "subtitle": "Explore chemistry experiments safely from your browser",
    "cta": "Explore Labs"
  },
  "home": {
    "whatIsTitle": "What is a Virtual Lab?",
    "whatIsText": "A virtual laboratory is an interactive simulation...",
    "howItWorks": "How It Works",
    "step1": "Choose a Lab",
    "step2": "Read the Theory",
    "step3": "Run the Simulation",
    "statsStudents": "Students",
    "statsLabs": "Lab Works",
    "statsFree": "Free"
  },
  "labs": {
    "pageTitle": "Laboratory Works",
    "pageSubtitle": "Choose an experiment to begin",
    "startLab": "Start Lab"
  },
  "lab": {
    "breadcrumbHome": "Home",
    "breadcrumbLabs": "Labs",
    "tabs": {
      "theory": "Theory",
      "simulator": "Simulator",
      "video": "Video"
    },
    "objective": "Objective",
    "materials": "Materials Needed",
    "methodology": "Methodology",
    "safety": "Safety Notes",
    "results": "Expected Results",
    "conclusions": "Conclusion Questions",
    "keyTakeaways": "Key Takeaways",
    "nextLab": "Next Lab",
    "reset": "Reset",
    "startSimulation": "Start Simulation"
  },
  "footer": {
    "rights": "All rights reserved",
    "description": "A free virtual chemistry laboratory for school students."
  }
}
```

### Language Switcher Usage

```jsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'kz', label: 'KZ' },
  ];
  return (
    <div className="flex gap-1">
      {langs.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${i18n.language === lang.code
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-primary-light'}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
```

---

## Lab Data (`src/data/labs.js`)

```js
export const labs = [
  {
    id: 'titration',
    route: '/labs/titration',
    color: '#1a73e8',
    bgLight: '#e8f0fe',
    emoji: '🧪',
    youtubeId: 'REPLACE_WITH_REAL_ID',   // YouTube video ID
  },
  {
    id: 'electrolysis',
    route: '/labs/electrolysis',
    color: '#2d9e44',
    bgLight: '#e6f4ea',
    emoji: '⚡',
    youtubeId: 'REPLACE_WITH_REAL_ID',
  },
  {
    id: 'flame-test',
    route: '/labs/flame-test',
    color: '#ff6d00',
    bgLight: '#fff3e0',
    emoji: '🔥',
    youtubeId: 'REPLACE_WITH_REAL_ID',
  },
];
```

All text (title, description, objective, etc.) comes from i18n translation files, keyed by `lab.id`.

---

## Lab Content (Placeholder Text)

### Lab 1: Acid-Base Titration

**Objective:** To determine the concentration of an unknown acid (HCl) solution using a standard NaOH solution through the process of neutralization.

**Materials:** Burette, conical flask, pipette, NaOH solution (0.1 M), HCl solution (unknown), phenolphthalein indicator, distilled water, stand and clamp.

**Methodology:**
1. Rinse the burette with distilled water, then with NaOH solution. Fill with NaOH up to 0 mL mark.
2. Using a pipette, transfer 25 mL of HCl solution into the conical flask.
3. Add 2–3 drops of phenolphthalein indicator to the flask.
4. Slowly add NaOH from the burette while swirling the flask continuously.
5. Stop when the solution changes from colourless to light pink and the colour persists for 30 seconds.
6. Record the volume of NaOH used. Repeat for three consistent readings.

**Safety Notes:** Wear safety goggles and gloves. Handle acids and bases carefully. Avoid skin contact.

**Expected Results:** The solution turns light pink at the equivalence point. Using M₁V₁ = M₂V₂, the concentration of HCl can be calculated.

**Conclusion Questions:**
1. Why is phenolphthalein used as the indicator in this experiment?
2. What does the colour change indicate about the pH of the solution?
3. How would the result change if you used methyl orange instead?

**Key Takeaways:**
- Neutralization reactions produce salt and water.
- The equivalence point is where moles of acid = moles of base.
- Indicators change colour at different pH ranges.

---

### Lab 2: Electrolysis of Water

**Objective:** To demonstrate the decomposition of water into hydrogen and oxygen gases using electrical energy, and to verify the 2:1 volume ratio of H₂ to O₂.

**Materials:** Water (with dissolved Na₂SO₄ to increase conductivity), DC power supply (6V), two carbon/platinum electrodes, collection tubes, connecting wires, beaker.

**Methodology:**
1. Dissolve a small amount of sodium sulfate (Na₂SO₄) in water to make it conductive.
2. Fill the beaker with this solution and place both electrodes inside.
3. Connect the electrodes to the positive and negative terminals of the DC supply.
4. Observe bubbles forming at each electrode.
5. Collect the gases using inverted test tubes filled with the solution.
6. Measure the volume of gas at each electrode after 5 minutes.

**Safety Notes:** Use low voltage (6V). Keep away from open flames — hydrogen gas is flammable. Do not touch electrodes while power is on.

**Expected Results:** Hydrogen gas (H₂) collects at the cathode (negative). Oxygen gas (O₂) collects at the anode (positive). Volume ratio H₂:O₂ = 2:1.

**Conclusion Questions:**
1. Why is it necessary to add Na₂SO₄ to the water?
2. Write the half-reactions occurring at the cathode and anode.
3. Why is twice as much hydrogen produced compared to oxygen?

**Key Takeaways:**
- Electrolysis uses electrical energy to drive non-spontaneous chemical reactions.
- Water splits into H₂ at the cathode and O₂ at the anode.
- The decomposition equation: 2H₂O → 2H₂ + O₂

---

### Lab 3: Flame Test

**Objective:** To identify metal ions in unknown compounds by observing the characteristic colours they produce when introduced to a flame.

**Materials:** Bunsen burner, nichrome wire loop, test solutions of: Lithium chloride, Sodium chloride, Potassium chloride, Copper(II) chloride, Calcium chloride. Dilute hydrochloric acid for cleaning wire.

**Methodology:**
1. Clean the nichrome wire by dipping it into dilute HCl and holding in the flame until no colour appears.
2. Dip the clean wire into the first metal salt solution.
3. Hold the wire in the hottest part of the Bunsen burner flame.
4. Observe and record the flame colour.
5. Clean the wire with HCl between each test.
6. Repeat for all metal salts.

**Safety Notes:** Tie back hair. Use heat-resistant gloves. Keep flammable materials away. Never point the burner at others.

**Expected Results:**
| Metal | Flame Colour |
|-------|-------------|
| Lithium (Li) | Crimson Red |
| Sodium (Na) | Bright Yellow |
| Potassium (K) | Lilac / Purple |
| Copper (Cu) | Blue-Green |
| Calcium (Ca) | Brick Red |

**Conclusion Questions:**
1. Why do different metals produce different colours in the flame?
2. Why must the wire be cleaned between each test?
3. How could you use the flame test to identify an unknown metal in a sample?

**Key Takeaways:**
- Metal ions emit characteristic wavelengths of light when excited by heat energy.
- The colour depends on the energy difference between electron orbitals.
- Flame tests are a quick qualitative method for metal ion identification.

---

## Tailwind Config (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a73e8',
          dark: '#1557b0',
          light: '#e8f0fe',
        },
        secondary: {
          DEFAULT: '#2d9e44',
          light: '#e6f4ea',
        },
        accent: '#ff6d00',
        surface: '#f7f8fc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'drip': 'drip 1s ease-in infinite',
        'rise': 'rise 2s ease-in infinite',
        'flicker': 'flicker 0.1s ease-in-out infinite alternate',
      },
      keyframes: {
        drip: {
          '0%':   { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(40px)', opacity: '0' },
        },
        rise: {
          '0%':   { transform: 'translateY(0)', opacity: '0.8' },
          '100%': { transform: 'translateY(-80px)', opacity: '0' },
        },
        flicker: {
          '0%':   { transform: 'scaleY(1) scaleX(1)' },
          '100%': { transform: 'scaleY(1.05) scaleX(0.97)' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## Google Fonts Setup (`index.html`)

Add inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

---

## `index.css` (Tailwind Directives)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-surface text-gray-800 font-sans;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200;
  }
  .btn-outline {
    @apply border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200;
  }
  .section-title {
    @apply text-3xl font-bold text-gray-900 mb-2;
  }
  .section-subtitle {
    @apply text-lg text-gray-500 mb-10;
  }
}
```

---

## YouTube Embed Component

```jsx
// Used in the "Video" tab of each lab page
const YouTubeEmbed = ({ videoId, title }) => (
  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
    <iframe
      className="absolute top-0 left-0 w-full h-full rounded-2xl"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allowFullScreen
    />
  </div>
);
```

---

## Component Patterns

### LabCard

```jsx
// src/components/ui/LabCard.jsx
// Props: { lab } — one item from labs.js data, with translated title/description via useTranslation
// Renders: colored top bar, emoji icon, title, short description, "Start Lab →" button
// Hover: scale(1.02), shadow-xl
// Navigate to lab.route on button click
```

### StatsCounter

```jsx
// src/components/ui/StatsCounter.jsx
// Uses useEffect + setInterval to count up from 0 to target on mount
// Shows 3 stats: students, labs, free
// Animates numbers with Framer Motion
```

### HeroSlider

```jsx
// src/components/ui/HeroSlider.jsx
// Uses useState(currentSlide) + useEffect(setInterval 4000ms)
// 3 slides with gradient backgrounds
// Dot navigation at bottom
// Framer Motion AnimatePresence for slide transitions
```

---

## Development Notes

- **No external simulator libraries** — all simulators are built with React state + CSS keyframes
- **i18n keys** follow dot-notation: `t('lab.titration.objective')`
- All lab-specific text (title, objective, materials, methodology, etc.) must be in all 3 locale JSON files
- YouTube video IDs are stored in `src/data/labs.js` — replace `'REPLACE_WITH_REAL_ID'` with actual IDs when available
- Keep each simulator self-contained in its own file
- Use `Framer Motion`'s `<AnimatePresence>` for tab switching on lab pages
- Mobile-first: all layouts must work on 375px screens

---

## Pages to Build (in order)

1. `Layout.jsx` (Header + Footer shell)
2. `Header.jsx` with nav + LanguageSwitcher
3. `HomePage.jsx` sections one by one
4. `LabsListPage.jsx` with LabCard grid
5. `TitrationPage.jsx` + `TitrationSimulator.jsx`
6. `ElectrolysisPage.jsx` + `ElectrolysisSimulator.jsx`
7. `FlameTestPage.jsx` + `FlameTestSimulator.jsx`
8. Fill all 3 locale JSON files completely
9. `Footer.jsx`
10. Final responsive/mobile pass

---

## Deliverable

A fully working React SPA that can be opened with `npm run dev` and deployed to Vercel/Netlify
with `npm run build` with zero backend dependencies.
