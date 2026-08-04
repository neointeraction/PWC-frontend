# Frontend Development Instructions

## Project Overview

This project is the **Super Admin Portal** for the **Phoenix Water Club (PWC) Career Counselling Platform**.

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

- React Icons

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
import Button from "@/components/Button";
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
