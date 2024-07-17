# ![RealWorld Example App](./public/logo.png)

## Project Description

Conduit is a social blogging site (i.e. a Medium.com clone). It uses a custom API for all requests, including authentication.
This codebase was created to demonstrate a frontend application built with [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/) including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## General functionality:

- [x] Authenticate users via JWT (login/signup pages + logout button on settings page)
- [x] CRU- users (sign up & settings page - no deleting required)
- [x] CRUD Articles
- [x] CR-D Comments on articles (no updating required)
- [x] GET and display paginated lists of articles
- [x] Favorite articles
- [x] Follow other users

## Routing Guidelines

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

## Tech Stack

- **Frontend:** React, TypeScript, Next.js, Tailwind CSS
- **State Management:** React Query, Zustand
- **Form Management:** React Hook Form
- **Testing:** Jest, React Testing Library

## Installation and Setup

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
