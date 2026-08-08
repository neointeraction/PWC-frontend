# Frontend Development Instructions

## Project Overview

This project is for the **Phoenix Water Club (PWC) Career Counselling Platform**.

The application follows a modular architecture and is built for future scalability, where additional portals (Admin, Counsellor, Student) will share the same design system and architecture.

The objective is to build clean, maintainable, production-ready code with reusable components and consistent patterns.

---

# Tech Stack

Use the following technologies only.

## Core

- React 18
- Vite
- TypeScript

## Styling

- styled-components
- ThemeProvider
- Global Styles

## State Management

- Zustand

## Routing

- React Router DOM v6+

## Data Fetching

- TanStack React Query
- Axios

## Forms

- React Hook Form
- Zod

## Animation

- Framer Motion (only where necessary)

## Icons

- React Icons (Line icons family exclusively across all pages and tables - e.g. `react-icons/ri` Remix Line icons or `react-icons/md` outline line icons `MdOutline...`)
- **Line Icon Consistency Rule**: Always use line icons (outline/line style variants) everywhere across all components, pages, and data tables. Do not mix solid/filled icons with line icons (maintain uniform line weight and visual line styling throughout).
- **Table Icon Styling**: All table icons (action buttons, row actions, sorting controls, status indicators, filters, and headers) must share the exact same line icon style (e.g. `RiEditLine`, `RiDeleteBinLine`, `RiEyeLine`, `RiAddLine`, etc. or `MdOutline...`) and standardized theme colors across all data tables in the platform.

## Utilities

- Day.js

---

# General Rules

## TypeScript

- Always use strict typing.
- Never use `any`.
- Prefer interfaces over types for object models.
- Create reusable interfaces.
- Export interfaces from dedicated files.

Example:

```ts
export interface Tenant {
  id: string;
  name: string;
  domain: string;
}
```

---

## Components

Every UI should be reusable.

Avoid writing page-specific UI if it can become a reusable component.

Examples:

- Button
- Card
- Input
- Select
- Modal
- Table
- Badge
- Avatar
- Empty State
- Search Box
- Pagination
- Breadcrumb
- Tabs

Each component should live in its own folder.

Example

```
Button/
    Button.tsx
    Button.styles.ts
    index.ts
```

---

## Styling Rules

Use only:

- styled-components

Never use

- CSS Modules
- SCSS
- Tailwind
- Bootstrap
- Material UI
- Chakra UI
- Inline CSS
- HTML elements (like `div`, `span`, `p`, etc.) with inline styles (`style={{ ... }}`). Always create and use styled-components.

Component styles should always be colocated.

Example

```
Button.styles.ts
```

---

## Theme

All colors must come from the theme.

Never hardcode colors.

Example

```ts
theme.colors.primary;
theme.colors.background;
theme.colors.border;
theme.colors.text;
```

Support both

- Light Theme
- Dark Theme

Theme switching should use Zustand.

Persist theme using localStorage.

---

## Folder Structure

Keep feature-based organization.

```
src/

app/
components/
layouts/
pages/
hooks/
services/
store/
styles/
types/
constants/
utils/
assets/
```

---

## Naming Convention

Components

```
TenantTable.tsx
DashboardCard.tsx
```

Hooks

```
useAuth.ts
useTheme.ts
```

Stores

```
auth.store.ts
theme.store.ts
sidebar.store.ts
```

Services

```
tenant.service.ts
career.service.ts
auth.service.ts
```

Interfaces

```
tenant.types.ts
career.types.ts
```

---

# Import Rules

Use absolute imports.

Example

```ts
import Button from '@/components/Button';
```

Avoid long relative imports like

```ts
../../../components/Button
```

---

# State Management

Use Zustand only.

Create separate stores.

Examples

```
auth.store.ts

theme.store.ts

sidebar.store.ts

notification.store.ts
```

Never keep unrelated state inside one store.

---

# API Layer

Use Axios.

Create one reusable Axios instance.

Include

- Request Interceptor
- Response Interceptor
- JWT Injection
- Global Error Handling

Business logic should never exist inside components.

Use services.

Example

```
tenant.service.ts
```

---

# React Query

All API requests must use React Query.

Use

- useQuery
- useMutation

Never manually manage loading states unless necessary.

---

# Forms

Always use

- React Hook Form
- Zod

Never use uncontrolled forms.

Validation belongs in dedicated schema files.

---

# Routing

Use React Router v6.

Protected routes should be implemented.

Public routes

```
/login
```

Protected routes

```
/dashboard

/tenants

/career-library

/settings
```

Unknown routes should redirect to Dashboard.

---

# Authentication

Authentication should use Zustand.

Store

```
token

user

role

isAuthenticated
```

Persist session.

Logout should clear

- token
- user
- query cache
- localStorage

---

# Error Handling

Create reusable

- Error Page
- Empty State
- Loading State

Avoid rendering blank pages.

---

# Tables

Create one reusable DataTable component.

Support

- Sorting
- Pagination
- Search
- Loading
- Empty State
- Sticky Header
- Responsive Scroll
- **Icon & Color Standardization**: All table icons (view, edit, delete, row actions, status indicators, header sorting) must strictly use line icons (e.g., Remix Line `react-icons/ri` or Material Outline `MdOutline...`) and consistent theme colors across all tables.

---

# Modals

Create reusable modal component.

Support

- Small
- Medium
- Large

Include

- ESC close
- Backdrop click
- Animation

---

# Responsive Design

Support

Desktop

Tablet

Mobile

Sidebar should collapse automatically.

Tables should scroll horizontally.

---

# Accessibility

Always

- Label form controls
- Use semantic HTML
- Keyboard accessible dialogs
- Visible focus states
- Proper aria attributes where necessary

---

# Performance

Use

- React.memo
- useMemo
- useCallback

Only when beneficial.

Lazy load pages using React.lazy.

---

# Code Quality

Prefer

Small components.

Avoid files larger than ~300 lines.

Move reusable logic into hooks.

Move API logic into services.

Move constants into constants folder.

---

# Logging

Do not use

```ts
console.log();
```

Use a logger utility if debugging is required.

---

# Dummy Data

Mock data should live under

```
src/mocks/
```

Do not hardcode mock data inside components.
All imaginary/placeholder names (student names, parent names, counselor names, etc.) must strictly be Indian names.

---

# File Structure Example

```
TenantTable/

    TenantTable.tsx

    TenantTable.styles.ts

    TenantTable.types.ts

    index.ts
```

---

# Git Rules

Commit messages

```
feat:

fix:

refactor:

style:

docs:

test:

chore:
```

Examples

```
feat: add tenant listing page

fix: resolve sidebar collapse issue

refactor: extract reusable stat card
```

---

# AI Coding Rules

When generating code:

- Follow existing folder structure.
- Reuse components whenever possible.
- Never duplicate code.
- Never hardcode API URLs.
- Never hardcode colors.
- Never hardcode spacing values.
- Use theme variables.
- Use TypeScript strictly.
- Always use line icons everywhere across all components, pages, and views (strictly use line/outline icon style variants like `react-icons/ri` Remix Line icons or `react-icons/md` `MdOutline...` for visual uniformity). Avoid filled/solid icons.
- Ensure all table icons (actions, edit, view, delete, filters, sorting) share the exact same line icon style (`react-icons/ri` line variants or `react-icons/md` `MdOutline...`) and uniform theme colors.
- All table action buttons (edit, view, delete, credentials, save, approve, reject, etc.) must strictly be square icon-only buttons with light borders (`width: 32px; height: 32px; border: 1px solid theme.colors.border; border-radius: 4px; background-color: theme.colors.surface;`), hover state (`border-color: theme.colors.primary; color: theme.colors.primary; background-color: theme.colors.primaryLight;`), line icons, and wrapped with `Tooltip`. Never use text buttons inside table action cells.
- All component border radius must strictly be `4px` always (never more, never less).
- Whenever showing alerts or confirmations, NEVER use native browser `alert()` or `confirm()`. Always use `AlertModal` component. If `AlertModal` component is not present, create a reusable `AlertModal` in `src/components/` and reuse it.
- Whenever using select inputs, NEVER use native HTML `<select>` elements. Always use the custom `Select` component.
- Always use `Tooltip` component for showing tooltips in table actions and other page-level hover items. If `Tooltip` is not present, create a reusable `Tooltip` component in `src/components/`.
- All placeholder/imaginary names used across the application (students, counselors, parents, teachers, mock data, etc.) must strictly be Indian names.
- Keep components small and composable.
- Prefer composition over inheritance.
- Extract repeated logic into custom hooks.
- Keep business logic out of UI components.
- Ensure code is production-ready and backend integration-friendly.
- Write code that is scalable for future Admin, Counsellor, Student, and Parent portals.
- Follow SOLID principles where applicable.
- Prioritize readability over clever implementations.

---

# UI Design Principles

The application should feel like a modern enterprise SaaS platform.

Characteristics

- Minimal
- Clean
- Spacious
- Consistent spacing
- Soft shadows
- Rounded corners
- Neutral color palette
- Blue primary accent
- Uniform line icon styling everywhere (`react-icons/ri` Remix Line or `react-icons/md` Outline line icons)
- Responsive
- Accessible

Design inspiration

- Stripe Dashboard
- Linear
- Vercel
- Clerk
- Notion
- GitHub

Consistency is more important than visual complexity.

Always favor reusable design patterns over one-off implementations.

---

# Skills Reference

The following skills are available in this project. Always read and apply the relevant skill BEFORE starting any task that matches its description.

## 1. Frontend Developer

**Path:** `.agents/skills/frontend-developer/SKILL.md`

**Trigger:** Use PROACTIVELY when building React components, implementing responsive layouts, handling client-side state management, fixing frontend performance issues, or resolving accessibility problems.

**Covers:**
- React 18 component architecture, hooks, and patterns
- Vite + TypeScript project setup
- Styled-components, ThemeProvider, and Global Styles
- TanStack React Query, Axios, React Hook Form, Zod
- Framer Motion animations
- Performance optimization (React.memo, useMemo, useCallback, lazy loading)
- Accessibility (WCAG, ARIA, keyboard navigation)

---

## 2. UI/UX Pro Max

**Path:** `.agents/skills/ui-ux-pro-max/SKILL.md`

**Trigger:** Use when designing new UI components or pages, choosing color palettes and typography, reviewing code for UX issues, building dashboards or landing pages, or implementing accessibility requirements.

**Covers:**
- 50+ UI styles (glassmorphism, minimalism, dark mode, bento grid, etc.)
- 21 curated color palettes and 50 font pairings
- Design system generation via `python3 skills/ui-ux-pro-max/scripts/search.py`
- UX best practices, animation guidelines, and pre-delivery checklist
- Stack-specific guidance for React, Next.js, and more

**Quick command:**
```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<product_type> <keywords>" --design-system -p "PWC"
```

---

## 3. Zustand Store (TypeScript)

**Path:** `.agents/skills/zustand-store-ts/SKILL.md`

**Trigger:** Use when creating or modifying Zustand stores, implementing global state, or adding reactive state patterns with TypeScript.

**Covers:**
- Store creation with `subscribeWithSelector` middleware
- Strict TypeScript interfaces (separate State and Actions)
- Individual selector patterns to prevent unnecessary re-renders
- Store file placement: `src/store/<name>.store.ts`
- Export pattern via `src/store/index.ts`
