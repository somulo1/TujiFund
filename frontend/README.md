# TujiFund Frontend

## Project Structure

```
src/
├── assets/                # Static assets like images, fonts, etc.
│   ├── images/
│   └── fonts/
├── components/           # Reusable components
│   ├── common/          # Shared components like Button, Input, etc.
│   ├── layout/          # Layout components like Navbar, Footer, etc.
│   ├── features/        # Feature-specific components
│   │   ├── auth/       # Authentication related components
│   │   ├── dashboard/  # Dashboard related components
│   │   ├── group/      # Group management components
│   │   └── members/    # Member management components
│   └── ui/             # UI components library
├── config/              # Configuration files
│   └── constants.ts     # App constants
├── hooks/               # Custom React hooks
├── lib/                 # Library code, utilities
│   ├── api/            # API client and related code
│   ├── utils/          # Utility functions
│   └── validation/     # Form validation schemas
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   ├── group/          # Group management pages
│   └── members/        # Member management pages
├── routes/             # Routing configuration
├── services/           # Business logic and API calls
│   ├── auth/
│   ├── group/
│   └── members/
├── store/              # State management
│   ├── auth/
│   ├── group/
│   └── members/
├── styles/             # Global styles and theme
│   ├── global.css
│   └── theme.ts
├── types/              # TypeScript type definitions
├── App.tsx             # Root component
└── main.tsx           # Entry point
```

## Component Organization

1. **Common Components**: Reusable UI elements
   - Button, Input, Card, etc.
   - Layout components (Navbar, Footer, etc.)

2. **Feature Components**: Feature-specific components
   - Authentication (Login, Register forms)
   - Dashboard widgets
   - Group management tools
   - Member management components

3. **Page Components**: Full page components
   - Combine multiple components
   - Handle page-level state and effects
   - Implement page-specific logic

## Best Practices

1. **Component Structure**:
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Implement proper error handling
   - Add loading states

2. **State Management**:
   - Use React Query for server state
   - Use Zustand for client state
   - Implement proper caching strategies

3. **Styling**:
   - Use Tailwind CSS for styling
   - Follow consistent naming conventions
   - Implement responsive design

4. **Performance**:
   - Implement code splitting
   - Use React.lazy for route-based code splitting
   - Optimize images and assets

5. **Testing**:
   - Write unit tests for components
   - Implement integration tests
   - Use React Testing Library

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run test`: Run tests
