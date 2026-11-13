# Project Guidelines

## Project Overview

This project is the admin management application for our platform.

---

## Architecture

- Every root module must contain:
  - `src/` – implementation files
  - `index.ts` – barrel exports
- Keep files grouped by feature whenever possible.
- Place shared code inside `src/shared`.

Example:

```
src/
├── features/
│   └── users/
│       ├── src/
│       └── index.ts
│
└── shared/
    ├── utils/
    ├── hooks/
    ├── services/
    └── components/
```

---

## Naming Conventions

### Components

- Use **PascalCase**.
- Component filenames should end with `Component`.

Example:

```
UserTableComponent.tsx
DashboardComponent.tsx
```

### Hooks

- Use **camelCase**.
- Prefix every hook with `use`.

Example:

```
useAuth.ts
usePagination.ts
useUsers.ts
```

### Utilities, Helpers & Services Or Js functions

- Use **kebab-case**.

Example:

```
date-formatter.ts
calculate-total.ts
auth-service.ts
```

Store them under:

```
src/shared/utils
src/shared/helpers
src/shared/services
```

---

## Component Guidelines

- Keep components focused on a single responsibility.
- Split a component into smaller components only when:
  - it becomes too large,
  - the UI is reusable,
  - or it improves readability.
- Avoid creating unnecessary wrapper components.

---

## Page Structure

- **Do not place the main implementation inside `page.tsx`.**
- `page.tsx` should only compose and render the page component.

Example:

```
page.tsx
    ↓
UsersPageComponent.tsx
```

This keeps routing files clean and makes components easier to test and reuse.

---

## React Query

- Use **React Query** for all server state.
- Keep hooks close to the feature they belong to.

Example:

```
src/features/users/hooks/useUsers.ts
src/features/dashboard/hooks/useDashboard.ts
```

Only place hooks inside `src/shared/hooks` if they are reusable across multiple features.

---

## Code Style

- Write self-explanatory code before relying on comments.
- Keep comments minimal and only add them when they provide context that isn't obvious from the code.
- Prefer descriptive variable and function names over excessive comments.
- Keep functions and components small and easy to understand.
- Follow consistent formatting throughout the project.

## UI Components

### shadcn/ui

- Use **shadcn/ui** as the default UI component library throughout the application.
- Reuse existing shadcn/ui components whenever possible before creating custom components.
- Customize shadcn/ui components through composition and styling instead of modifying their source unless necessary.
- Keep feature-specific UI components within their respective feature folders.
- Place reusable UI components under `src/shared/components`.
- Maintain consistent styling, spacing, and behavior across the application by following the established shadcn/ui patterns.
- Ensure all custom components are compatible with the project's design system and theme.
