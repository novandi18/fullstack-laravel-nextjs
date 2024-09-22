# Laravel 11 RESTful API & Next.js TypeScript Frontend

This is a simple project using Laravel 11 to build a RESTful API and Next.js with TypeScript as the frontend.

## Features

- **Backend**: Laravel 11
  - RESTful API
  - Products CRUD Operations

- **Frontend**: Next.js with TypeScript
  - Dynamic Pages
  - API Consumption
  - Redux

## Requirements

- PHP >= 8.1
- Composer
- Node.js >= 16.x
- npm or yarn

## Installation
```
git clone https://github.com/novandi18/fullstack-laravel-nextjs.git
```

### Backend (Laravel 11)

1. Navigate to the laravel directory
    ```
    cd laravel
    ```

2. Install dependencies
    ```
    composer install
    ```

3. Copy the `.env.example` file to `.env` and adjust the database configuration
    ```
    cp .env.example .env
    ```

4. Generate application key
    ```
    php artisan key:generate
    ```

5. Run database migrations
    ```
    php artisan migrate
    ```

6. Start the server
    ```
    php artisan serve
    ```

### Frontend (Next.js with TypeScript)

1. Navigate to the frontend directory
    ```
    cd ../nextjs
    ```

2. Install dependencies
    ```
    npm install
    // or
    yarn install
    ```

3. Start the development server
    ```
    npm run dev
    // or
    yarn dev
    ```

## Usage

1. Run the Laravel backend at `http://localhost:8000`
2. Run the Next.js frontend at `http://localhost:3000`

Thank you!
