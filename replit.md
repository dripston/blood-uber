# Overview

Blood Uber is a comprehensive thalassemia donor-patient matching platform featuring advanced ML-powered transfusion scheduling, blockchain-based donor rewards, competitive dashboards, and real-time matching capabilities. The platform includes AI health predictions, token-based reward systems, detailed mapping with route planning, and comprehensive donor/patient management with medical history tracking.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for robust form handling
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API architecture with comprehensive route handling
- **Data Layer**: In-memory storage implementation with interface-based design for easy database migration
- **Middleware**: Custom logging, JSON parsing, and error handling middleware
- **Development**: Hot module replacement with Vite integration for seamless full-stack development

## Data Storage Solutions
- **Current Implementation**: In-memory storage using Maps for development and testing
- **Database Schema**: Designed for PostgreSQL with Drizzle ORM
- **Tables**: Users, donors, patients, donor-patient matches, and messages
- **Migration Strategy**: Drizzle Kit for database schema management and migrations
- **Connection**: Neon Database serverless PostgreSQL integration ready

## Component Architecture
- **UI Components**: Modular Radix UI-based components with consistent theming
- **Pages**: Route-based page components for different user workflows
- **Navigation**: Unified navigation component with role-based menu items
- **Mapping**: Leaflet.js integration for location-based donor discovery
- **Real-time Features**: Message system with conversation management

## External Dependencies

- **Database**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL hosting
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **UI Library**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS for utility-first styling approach
- **State Management**: TanStack Query for server state and caching
- **Mapping**: Leaflet.js for interactive maps and location services
- **Form Handling**: React Hook Form with Hookform Resolvers for validation
- **Validation**: Zod for runtime type checking and schema validation
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation and formatting
- **Development Tools**: Vite with React plugin, ESBuild for production builds
- **Session Management**: connect-pg-simple for PostgreSQL-based session storage
- **Type Safety**: TypeScript with strict configuration across frontend and backend