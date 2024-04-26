# Clean Template Node TypeScript

This is a template repository for creating clean and scalable Node.js applications using TypeScript. The template is configured with essential dependencies for building a robust server-side application.

## Features

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Cors**: Middleware for handling Cross-Origin Resource Sharing.
- **Dotenv**: Loads environment variables from a .env file for development.
- **TypeScript**: A superset of JavaScript that adds static types to the language.
- **Eslint**: A pluggable linting utility for identifying and fixing problems in your TypeScript code.
- **Prettier**: Opinionated code formatter to maintain consistent code style.
- **Ts-node-dev**: TypeScript execution environment with fast restarts for development.

## Usage

Follow these steps to use this template and start building your Node.js application:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/clean-template.git
cd clean-template
```
### 2. Install Dependencies

```
npm install
```
### 3. Set Environment Variables

```
PORT=3000
```

### 4.  Development

```
npm run start:dev
```

### 5.  Linting and Formatting

```
npm run lint      # Run TypeScript linting
npm run lint:fix  # Run TypeScript linting and automatically fix issues
npm run prettier:format  # Format TypeScript code using Prettier
npm run prettier:fix     # Format and fix TypeScript code using Prettier

```

