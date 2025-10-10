# TokenTrail Frontend

This directory contains the frontend for the TokenTrail application. It is a React application built with Vite and TypeScript. It uses the Shadcn UI component library and Tailwind CSS for styling. The frontend provides a user interface for festival attendees to participate in quests and for organizers to manage their events.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool for modern web development.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Shadcn UI**: Re-usable component library.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Router**: For client-side routing.
- **Solana Wallet Adapter**: For connecting to Solana wallets.

## Getting Started

### Prerequisites

- [Node.js](httpss://nodejs.org/) (v18 or later)
- [npm](httpss://www.npmjs.com/)

### Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Development Server

To run the frontend application in development mode, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To build the application for production, run the following command:

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## Key Features

- **User Authentication**: Connect with a Solana wallet to authenticate.
- **Festival Dashboard**: View and manage festivals.
- **Quest Participation**: Browse and complete quests.
- **Reward Claims**: Claim rewards with earned tokens.

## Project Structure

- **`src/components`**: Reusable UI components.
- **`src/pages`**: Top-level page components.
- **`src/contexts`**: React contexts for state management.
- **`src/hooks`**: Custom React hooks.
- **`src/lib`**: Utility functions.
- **`public`**: Static assets.
