# IVOLEX E-Commerce Platform

Welcome to the IVOLEX E-Commerce Platform, a full-stack application built from the ground up with a focus on modern UI/UX, advanced features, and a premium feel. This project features a complete public-facing storefront and a comprehensive admin panel for managing the store.

## ✨ Features

### 💎 Public-Facing Site
- **Modern UI/UX**: A clean, modern, and responsive design built with Tailwind CSS, featuring a luxurious dark mode.
- **Advanced Product Discovery**: Includes a real-time predictive search bar and an advanced product listing page with animated filters and sorting.
- **Engaging Product Pages**: Features a high-quality image gallery, tabs for detailed information, and an immersive 360° product viewer powered by Three.js.
- **Dynamic Shopping Experience**: A fully functional shopping cart and persistent wishlist, managed with Zustand for efficient state management.
- **Premium Feel**: Enhanced with a parallax scrolling hero section, skeleton loaders for smooth data fetching, and a product quick view modal.

### 👑 Admin Panel
- **Secure & Role-Based**: The admin panel is a protected area, accessible only to authenticated users with an `ADMIN` role.
- **Interactive Dashboard**: Features an overview of key metrics (total sales, orders, etc.) and a live, interactive chart for visualizing sales data over time.
- **Comprehensive CRUD Operations**: Manage Products and Categories with a user-friendly interface, including image uploads.
- **Advanced Data Tables**: All data tables in the admin panel feature advanced sorting, filtering, and pagination for efficient data management.
- **Order & Customer Management**: View all orders and customers, and update order statuses.

## 🚀 Architecture

- **Framework**: Next.js 14 (with App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Radix UI for headless components and custom themes.
- **State Management**: Zustand for lightweight, global state management.
- **Database ORM**: Prisma with a PostgreSQL database.
- **Authentication**: NextAuth.js for secure and robust authentication.
- **Animations**: Framer Motion for all UI animations and transitions.
- **3D Rendering**: Three.js, @react-three/fiber, and @react-three/drei.
- **Charting**: Recharts for interactive data visualizations.
- **Form Management**: React Hook Form with Zod for schema validation.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database
- Docker (for deployment)

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

### 2. Environment Variables

Create a `.env` file in the root of the project by copying the `.env.example` if available, or creating it from scratch. Add the following environment variables:

```
# The connection string for your PostgreSQL database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# A secret key for NextAuth.js. Generate a random string for this.
# You can use `openssl rand -base64 32` to generate one.
NEXTAUTH_SECRET="your-super-secret-key-for-nextauth"
```

### 3. Database Setup

Run the following command to apply the database schema. This will create all the necessary tables in your database based on the `prisma/schema.prisma` file.

```bash
npx prisma migrate dev --name init
```

_Note: You may also want to seed your database with some initial data. A seeding script can be created and run with `npx prisma db seed`._

### 4. Running the Application

To run the application in development mode:

```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 🐳 Deployment

This application is ready to be deployed using Docker. A multi-stage `Dockerfile` is included for building a production-optimized image.

1.  **Build the Docker image:**
    ```bash
    docker build -t ivolex-ecommerce .
    ```

2.  **Run the Docker container:**
    ```bash
    docker run -p 3000:3000 -d --env-file .env ivolex-ecommerce
    ```
The application will be running on port 3000 of the Docker host. Ensure your `.env` file is present and correctly configured for the production environment.
