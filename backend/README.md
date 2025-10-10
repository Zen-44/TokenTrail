# TokenTrail Backend

This directory contains the backend for the TokenTrail application. It is a Node.js application built with Express and TypeScript. It uses Prisma as an ORM for interacting with a PostgreSQL database. The backend is responsible for managing festivals, quests, rewards, and user data. It also integrates with the Solana blockchain for token-based rewards.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **PostgreSQL**: Open-source relational database.
- **Solana**: Blockchain platform for decentralized applications.
- **JSON Web Tokens (JWT)**: For user authentication.

## Getting Started

### Prerequisites

- [Node.js](httpss://nodejs.org/) (v18 or later)
- [npm](httpss://www.npmjs.com/)
- [PostgreSQL](httpss://www.postgresql.org/)

### Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Zen-44/TokenTrail.git
    cd TokenTrail/backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up the database**:
    - Create a PostgreSQL database.
    - Create a `.env` file in the `backend` directory and add the database connection string:
      ```
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
      ```

4.  **Run database migrations**:
    ```bash
    npx prisma migrate dev
    ```

5.  **Generate Prisma Client**:
    ```bash
    npx prisma generate
    ```

### Running the Development Server

To run the backend server in development mode, use the following command:

```bash
npm run start
```

The server will start on `http://localhost:3000`.

## Database

The database schema is defined in `prisma/schema.prisma`. Prisma is used to manage database migrations and to generate a type-safe client for database access.

- To create a new migration, modify the `schema.prisma` file and run:
  ```bash
  npx prisma migrate dev --name <migration-name>
  ```
- To apply migrations, run:
  ```bash
  npx prisma migrate deploy
  ```

## API Endpoints

The API is organized into the following routes:

- `auth`: User authentication.
- `festivals`: Managing festivals.
- `quests`: Managing quests.
- `rewards`: Managing rewards.
- `claims`: Handling reward claims.

For more details on the API, refer to the route handlers in `src/routes`.
