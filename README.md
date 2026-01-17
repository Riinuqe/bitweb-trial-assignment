# Cards Carousel

A React-based cards carousel component built with TypeScript, Vite, and Storybook.

## Project Setup

### Prerequisites

- Node.js (v20 or higher recommended)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Storybook

### Local Development

Run Storybook locally:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`.

### Running Storybook with Docker

This project includes a Dockerfile that allows running Storybook without installing Node or dependencies locally.

#### 1. Install Docker

If you don't have Docker installed:

- **macOS**: Download and install [Docker Desktop for macOS](https://www.docker.com/products/docker-desktop/)
- **Windows**: Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- **Linux**: Follow the [Docker installation guide](https://docs.docker.com/get-docker/)

After installation:

1. Open Docker Desktop
2. Wait until Docker is running (green indicator in the system tray)
3. Verify installation in terminal:
   ```bash
   docker --version
   ```

#### 2. Build the Docker Image

From the project root directory:

```bash
docker build -t cards-carousel-storybook .
```

This will install dependencies and prepare the Storybook environment inside Docker.

#### 3. Run Storybook

Start the Storybook container:

```bash
docker run -p 6006:6006 cards-carousel-storybook
```

Once the container is running, open Storybook in your browser:

**http://localhost:6006**

#### 4. Stop Storybook

To stop the running container, press:

```
Ctrl + C
```

Or in a separate terminal, find and stop the container:

```bash
docker ps
docker stop <container-id>
```

## Project Structure

```
src/
├── components/          # React components
│   ├── CardsCarousel/   # Main carousel component
│   ├── ProductCard/     # Product card component
│   └── ArrowButton/     # Navigation arrow buttons
├── hooks/               # Custom React hooks
├── styles/              # Global styles and variables
└── assets/              # Static assets (images, icons)
```

## Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Storybook** - Component development and documentation
- **Sass** - CSS preprocessing
- **Jest** - Testing framework
- **ESLint** - Code linting
