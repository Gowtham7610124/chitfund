# CHIT Fund Management Web Application

A professional frontend prototype for a chit fund management system built with React, TypeScript, Vite, Tailwind CSS, and a modular mock-data service layer.

## Purpose

This project is the web application frontend for an admin and office-side chit fund management platform. It is intentionally built with mock data and clear service boundaries so it can later connect to a real backend or Supabase API without needing a major rewrite.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Modular service architecture

## Local setup

1. Install dependencies:
   npm install
2. Start the app:
   npm run dev
3. Open the local Vite URL shown in the console.

## Core architecture

The app is organized with a service-first flow:

UI -> Service layer -> Mock data

This keeps the pages decoupled from raw data and allows future backend integration with minimal change.

## Folder structure

- src/components: reusable UI blocks
- src/context: auth and app state
- src/layouts: main shell layout
- src/mock: realistic mock data records
- src/pages: screens for dashboard and modules
- src/routes: protected routing setup
- src/services: service layer abstraction
- src/types: shared TypeScript interfaces
- src/utils: formatting, validation, permissions, utilities

## Mock data architecture

Mock data is kept outside the UI to reflect the future backend-compatible structure. This means that pages request data via service functions instead of directly reading arrays from components.

## Roles in the prototype

Mock role-based access is available for:

- Super Admin
- Admin
- Office Manager
- Office Staff
- Accountant
- Collection Agent

These are frontend-only permissions and should be replaced by real backend authorization later.

## Current limitations

- No real database or backend
- No real authentication provider
- No real payment or SMS integrations
- No live file uploads or external API calls
- Financial rule logic is intentionally placeholder-based

## Future backend architecture

The app is designed with a future architecture in mind:

- Web admin + office frontend
- Mobile customer + agent app later
- Common backend and shared database
- Replaced service layer with Supabase or API calls

## How to replace mock services later

To integrate real backend services later, replace the implementations inside the service folder while keeping the page interfaces unchanged. The UI should continue to call the same service methods.

## Relevant future notes

See [FUTURE.md](FUTURE.md) for detailed notes on authentication, authorization, database design, payment gateways, file storage, audit logging, and mobile integration.
