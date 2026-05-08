# TraceIT

TraceIT is a user-friendly platform developed for a college environment that helps students report lost items, share found belongings, and exchange goods within the campus. It aims to simplify communication among students while promoting responsibility, collaboration, and sustainable practices within the college community.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

Lost and found management in college environments is often fragmented, relying on informal group chats or physical notice boards that are easy to miss. TraceIT centralizes this experience into a single, accessible platform where students can:

- Report items they have lost on campus.
- Announce items they have found and wish to return.
- List goods they want to give away or exchange within the community.

The platform is built with a focus on ease of use, community trust, and sustainability, encouraging students to return lost belongings and make use of goods that would otherwise go to waste.

---

## Features

- Report lost items with descriptions, location hints, and date of loss.
- Post found items for other students to identify and claim.
- Community goods exchange for donating or swapping items within the campus.
- Search and filter listings by category, date, or location.
- AI-powered assistance via Genkit for smarter item matching and suggestions.
- Responsive design for seamless use on desktop and mobile devices.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| UI Components | Radix UI |
| AI Integration | Genkit, Google AI |
| Database / Backend | Firebase |
| Forms | React Hook Form, Zod |
| Data Fetching | TanStack Query |
| Charts | Recharts |

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/traceit.git
   cd traceit
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add the required configuration values. Refer to `.env.example` if available, or consult the project documentation for required keys (Firebase config, Google AI API key, etc.).

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

To run the Genkit AI development server alongside the app:

```bash
npm run genkit:dev
```

---

## Project Structure

```
traceit/
├── src/
│   ├── app/            # Next.js App Router pages and layouts
│   ├── components/     # Reusable UI components
│   │   └── ui/         # shadcn/ui base components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and shared logic
│   └── ai/             # Genkit AI flows and configuration
├── public/             # Static assets
├── tailwind.config.ts  # Tailwind CSS configuration
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server on port 9002 with Turbopack |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint across the project |
| `npm run typecheck` | Runs TypeScript type checking without emitting files |
| `npm run genkit:dev` | Starts the Genkit AI development server |
| `npm run genkit:watch` | Starts the Genkit AI server in watch mode |

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix: `git checkout -b feature/your-feature-name`
3. Commit your changes with clear and descriptive messages.
4. Push to your fork and open a pull request against the `main` branch.

Please ensure your code passes linting and type checks before submitting a pull request.

---

## Author

Sandhya Kumari

GitHub: [SANDHYAKUMARI1504](https://github.com/SANDHYAKUMARI1504)
