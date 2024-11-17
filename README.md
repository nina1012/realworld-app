# ![RealWorld Example App](./public/logo.png)

## Project Description 📖

Conduit is a social blogging site (i.e. a Medium.com clone). It uses a custom API for all requests, including authentication.
This codebase was created to demonstrate a frontend application built with [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/) including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## General functionality and features✨

- [x] Authenticate users via JWT (login/signup pages + logout button on settings page)
- [x] CRU- users (sign up & settings page - no deleting required)
- [x] CRUD Articles
- [x] CR-D Comments on articles (no updating required)
- [x] GET and display paginated lists of articles
- [x] Favorite articles
- [x] Follow other users

## Routing Guidelines 🧭

- Home page (URL:'/'):
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /auth/login, /auth/register):
  - Uses JWT (store the token in localStorage)
  - Authentication can be easily switched to session/cookie based
- Settings page (URL: /auth/settings)
- Editor page to create/edit articles:
  - Create articles (URL: /editor/new)
  - Edit articles (URL: /editor/slug)
- Article page (URL: /article/slug):
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /profile/:username)
  - Get authenticated user info and profile (URL: /auth/me)
  - Show basic user info

## Tech Stack 🛠️

- **Frontend:** React, TypeScript, Next.js, Tailwind CSS
- **State Management:** React Query, Zustand
- **Form Management:** React Hook Form
- **Testing:** Jest, Cypress, React Testing Library
- **CI/CD**: GitHub Actions

## Installation and Setup 🛠️

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nina1012/realworld-app.git
   cd realworld-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
    Command goes here... TO DO!!!
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

## Usage 👥

To explore the app without registering, use the following demo account credentials:

- Email: demo@user.com
- Password: password123

Simply log in with these credentials to start using the application. 🚀

## Important Notice ⚠️

**Please note:** The app may not render or function correctly if the API (https://api.realworld.io/api/) is down or experiencing issues. This could affect features such as user authentication, data fetching, and any dynamic content relying on the backend. To demonstrate the functionality of the application, I have included several demo Articles and Tags. These are designed to showcase the core features of the app, even if the API is not working properly or is unavailable.

If you encounter problems:

1. Try refreshing the page.
2. Check if the API service is available.

I apologize for any inconvenience this may cause.

**Additional Note:** `dashboard.cy.ts` tests have been temporarily commented out in the workflow due to their dependency on the API, which is currently unstable (as of October 26th). This allows other tests to proceed until the API is reliable.
