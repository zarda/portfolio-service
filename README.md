# Portfolio

A responsive personal portfolio website built with React, Vite, and deployed to Firebase Hosting with CI/CD.

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Hero section with call-to-action
- About section with stats
- Skills section with progress bars
- Projects showcase with cards
- Resume section with downloadable PDF and external profile links
- Contact form
- Mobile-friendly hamburger menu
- **Multi-version portfolio support** (switch via URL parameter)
- **Admin Panel** for editing portfolio content (profile, skills, projects, contact)
- **Version Management** (create, switch, publish versions)
- **Live Preview** before publishing changes
- **Advanced Theme System** with 12 preset themes, custom theme builder, and seasonal defaults
- **Light/Dark Mode** with system preference detection

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Architecture**: Feature-Based + Clean Architecture with OOP models
- **Styling**: CSS3 with CSS Variables
- **Animations**: Framer Motion
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Firebase project created

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zarda/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Portfolio Versions

The portfolio supports multiple data versions, allowing you to maintain different portfolio presentations.

### Available Versions

| Version | Description | URL |
|---------|-------------|-----|
| `hengtai25` | Production portfolio (default) | `http://localhost:5173/` |
| `demo` | Demo version with explanatory test data | `http://localhost:5173/?version=demo` |

### Switching Versions

Access different versions via URL parameter:
```
http://localhost:5173/?version=demo
http://localhost:5173/?version=hengtai25
```

Or use the **Admin Panel** to manage versions (see [Admin Panel](#admin-panel) section).

### Creating a New Version

1. Create a new folder under `src/features/portfolio/data/versions/`:
   ```
   src/features/portfolio/data/versions/your-version/
   ├── assets/       # Version-specific images (project previews, etc.)
   ├── index.ts      # Portfolio assembly
   ├── profile.ts    # Personal info
   ├── skills.ts     # Skills data
   ├── projects.ts   # Projects data
   └── contact.ts    # Contact info
   ```

2. Register the version in `src/features/portfolio/data/index.ts`:
   ```typescript
   import { yourPortfolio } from './versions/your-version';
   PortfolioRegistry.register('your-version', yourPortfolio);
   ```

3. Access via `?version=your-version`

## Admin Panel

The admin panel provides a visual interface for managing your portfolio content.

### Accessing the Admin Panel

Navigate to `/admin` in your browser:
```
http://localhost:5173/admin
```

### Admin Features

| Section | Description |
|---------|-------------|
| **Dashboard** | Overview with quick links to all editors |
| **Profile Editor** | Edit name, title, greeting, bio, photo, and stats |
| **Skills Editor** | Add/edit/remove skill categories and individual skills |
| **Projects Editor** | Manage projects with drag-and-drop reordering |
| **Contact Editor** | Edit email, location, and social links |
| **Version Manager** | Create, switch, and publish portfolio versions |
| **Theme Editor** | Select preset themes, create custom themes, configure seasonal defaults |

### Workflow

1. **Edit Content**: Make changes in any editor section
2. **Save Changes**: Click "Save Changes" to persist your edits
3. **Preview**: Use "Preview" to see changes before publishing
4. **Publish**: Go to Versions and click "Publish" to make changes live

### Data Persistence

Currently, all changes are saved to **localStorage**. This means:
- Changes persist across browser sessions on the same device
- Data is not synced across devices
- Clearing browser data will reset to default portfolio

> **Note**: Phase 3 will add Supabase backend for cloud persistence and multi-tenancy.

## Theme System

The portfolio includes an advanced theme system with Strategy and Builder patterns.

### Available Preset Themes

| Theme | Description |
|-------|-------------|
| Default | Modern indigo and pink gradient |
| Spring | Cherry blossoms and fresh greens |
| Summer | Warm coral and cool teal |
| Autumn | Amber and warm rust tones |
| Winter | Ice blue and silver |
| Professional | Minimal and corporate |
| Creative | Vibrant purple and pink |
| Ocean | Deep blues and teals |
| Forest | Natural greens and earth tones |
| Sunset | Warm oranges and pinks |
| Midnight | Deep purples with gold accents |
| Neon | Vibrant cyberpunk colors |

### Theme URL Parameters

Access specific themes via URL:
```
http://localhost:5173/preview/?theme=ocean
http://localhost:5173/preview/?theme=neon&mode=dark
http://localhost:5173/preview/?season=summer
```

The `?season=` parameter uses the configured seasonal theme (customizable in Theme Editor).

### Custom Themes

Create custom themes in the Admin Panel's Theme Editor:
1. Set primary and accent colors
2. Choose heading and body fonts
3. Select light or dark mode
4. Save and apply your custom theme
5. Optionally pair light/dark custom themes for mode switching

### Seasonal Theme Defaults

Configure which theme is used for each season:
- **Spring** (Mar - May)
- **Summer** (Jun - Aug)
- **Autumn** (Sep - Nov)
- **Winter** (Dec - Feb)

When no saved preference exists, the portfolio automatically uses the configured seasonal theme based on the current date.

## Customization

### Adding Images

Replace the placeholder elements with your actual images:

1. Add your images to the `public` folder
2. Update the component files to use `<img>` tags instead of placeholder divs

### Styling

Customize the look by editing CSS variables in `src/index.css`:

```css
:root {
  --color-primary: #3b82f6;      /* Main accent color */
  --color-primary-dark: #2563eb; /* Darker accent */
  --color-text: #1e293b;         /* Main text color */
  /* ... more variables */
}
```

## Firebase Hosting Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firebase Hosting in the console

### 2. Configure Firebase

Update `.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 3. Set Up GitHub Secrets

For CI/CD to work, add these secrets to your GitHub repository:

1. Go to your repo → Settings → Secrets and variables → Actions
2. Add the following secrets:

| Secret Name | Description |
|-------------|-------------|
| `FIREBASE_SERVICE_ACCOUNT` | Firebase service account JSON key |
| `FIREBASE_PROJECT_ID` | Your Firebase project ID |

#### Getting the Service Account Key

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Copy the entire JSON content as the `FIREBASE_SERVICE_ACCOUNT` secret

### 4. Manual Deployment

To deploy manually without CI/CD:

```bash
npm run build
firebase login
firebase deploy
```

## CI/CD Pipeline

The project includes two GitHub Actions workflows:

### On Push to Main
- Runs linting
- Builds the project
- Deploys to Firebase Hosting (production)

### On Pull Request
- Runs linting
- Builds the project
- Deploys to a preview channel
- Comments the preview URL on the PR

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests once with Vitest |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:coverage` | Run unit tests with coverage and generate a report in `coverage/` |

## Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       ├── firebase-hosting-merge.yml
│       └── firebase-hosting-pull-request.yml
├── public/
│   ├── favicon.svg
│   └── CV_YYYYMMDD.pdf
├── src/
│   ├── core/
│   │   └── models/
│   │       └── Entity.ts              # Base entity class
│   ├── features/
│   │   ├── portfolio/
│   │   │   ├── models/                # Domain models (OOP)
│   │   │   │   ├── Profile.ts
│   │   │   │   ├── Skill.ts
│   │   │   │   ├── SkillCategory.ts
│   │   │   │   ├── Project.ts
│   │   │   │   ├── SocialLink.ts
│   │   │   │   ├── ContactInfo.ts
│   │   │   │   ├── Portfolio.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── PortfolioService.ts  # Facade service (singleton)
│   │   │   │   ├── ThemeManager.ts      # Theme/season management
│   │   │   │   └── VersionManager.ts    # Version/data management
│   │   │   ├── hooks/
│   │   │   │   └── useTheme.ts          # React hook for theme
│   │   │   ├── data/
│   │   │   │   ├── PortfolioRegistry.ts # Version management
│   │   │   │   ├── index.ts
│   │   │   │   └── versions/
│   │   │   │       ├── hengtai25/       # Production data
│   │   │   │       │   ├── assets/      # Project preview images
│   │   │   │       │   └── *.ts         # Data files
│   │   │   │       └── demo/            # Demo/test data
│   │   │   └── __tests__/
│   │   │       └── PortfolioService.test.ts
│   │   └── admin/                       # Admin panel feature
│   │       ├── components/
│   │       │   ├── AdminLayout.tsx      # Admin layout with sidebar
│   │       │   ├── Dashboard.tsx        # Admin dashboard
│   │       │   ├── ProfileEditor.tsx    # Profile editing
│   │       │   ├── SkillsEditor.tsx     # Skills editing
│   │       │   ├── ProjectsEditor.tsx   # Projects editing
│   │       │   ├── ContactEditor.tsx    # Contact editing
│   │       │   ├── VersionManager.tsx   # Version management
│   │       │   └── ThemeEditor.tsx      # Theme customization
│   │       ├── hooks/
│   │       │   └── usePortfolioEditor.ts # Editor state hook
│   │       ├── services/
│   │       │   └── PortfolioEditorService.ts # Mutation service
│   │       └── __tests__/
│   │           └── PortfolioEditorService.test.ts
│   │   └── theme/                        # Theme system feature
│   │       ├── models/
│   │       │   ├── Theme.ts              # Theme entity
│   │       │   ├── ColorPalette.ts       # Color palette value object
│   │       │   └── Typography.ts         # Typography value object
│   │       ├── services/
│   │       │   ├── ThemeService.ts       # Theme management (Strategy pattern)
│   │       │   └── ThemeBuilder.ts       # Custom theme builder (Builder pattern)
│   │       ├── presets/
│   │       │   └── index.ts              # 12 preset themes (light/dark variants)
│   │       └── hooks/
│   │           └── useTheme.ts           # React hook for theme state
│   ├── shared/
│   │   └── animations/
│   │       └── presets.ts             # Framer Motion presets
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Resume.tsx
│   │   └── Skills.tsx
│   ├── config/
│   │   └── themeConfig.ts
│   ├── App.tsx
│   ├── utils.ts
│   ├── index.css
│   └── main.tsx
├── .firebaserc
├── .gitignore
├── eslint.config.js
├── firebase.json
├── index.html
├── package.json
├── tsconfig.json
├── README.md
└── vite.config.js
```

## Architecture

This project uses a **Feature-Based + Clean Architecture** pattern:

- **Core**: Shared infrastructure (base classes, types)
- **Features**: Bounded contexts (portfolio, admin)
- **Shared**: Reusable utilities and animations
- **Components**: UI components that consume data from services

### Data Flow

**Public Portfolio (Read-only)**
```
PortfolioRegistry (registers versions)
       ↓
PortfolioService (facade singleton)
├── VersionManager (data access)
└── ThemeManager (theme/season state)
       ↓
React Hooks (useTheme, usePortfolio)
       ↓
Components (Hero, About, Skills, Projects, Contact)

**Theme System**
```
ThemeService (singleton, Strategy pattern)
├── Manages current theme state
├── Handles seasonal auto-detection
├── Persists to localStorage
└── Notifies subscribers on changes
       ↓
ThemeBuilder (Builder pattern)
├── Creates custom themes
└── Generates color variants
       ↓
useTheme hook
       ↓
Components + ThemeEditor
```

**Admin Panel (Read/Write)**
```
PortfolioEditorService (mutation singleton)
├── Loads from PortfolioRegistry
├── Manages draft state
├── Persists to localStorage
└── Publishes to PortfolioRegistry
       ↓
usePortfolioEditor (React hook)
       ↓
Editor Components (ProfileEditor, SkillsEditor, etc.)
```

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details
