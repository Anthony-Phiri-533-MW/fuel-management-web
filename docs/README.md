# Fuel Management System - Documentation

## Overview

The Fuel Management System is a comprehensive web application designed to help businesses efficiently manage their fuel operations. Built with modern web technologies, this application provides tools for tracking fuel sales, managing credit transactions, and generating detailed reports.

## Features

### 1. Metered Readings
Track fuel sales through metered readings from pumps:
- Record readings from up to 4 petrol pumps
- Record readings from up to 4 diesel pumps
- Track fuel prices for accurate sales calculations
- Monitor stock levels with closing stock and receipts tracking
- Automatic calculation of total sales volume and revenue

### 2. Credit Sales Management
Manage credit transactions with customers:
- Record customer details for credit sales
- Track fuel type, quantity, and pricing
- Add optional notes for each transaction
- View total credit sales
- Delete credit sales records when needed

### 3. Reporting
Generate comprehensive reports on fuel operations:
- Daily, weekly, monthly, and yearly report options
- Detailed breakdown of petrol and diesel sales
- Volume tracking for all fuel types
- Credit sales summary
- Export reports as images for sharing

## Technology Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Project Structure

```
fuel-management-web/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   │   ├── ContentArea/    # Main content display
│   │   ├── Forms/          # Form components
│   │   └── Sidepanel/      # Navigation sidebar
│   ├── dashboard/          # Dashboard page
│   ├── login/              # Authentication pages
│   └── logout/             # Logout functionality
├── prisma/                 # Database schema
├── public/                 # Static assets
├── utils/                  # Utility functions and store
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- A Supabase project ([create one here](https://supabase.com))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fuel-management-web
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_database_connection_string
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### Logging In
1. Navigate to the login page
2. Enter your credentials
3. Click "Login" to access the dashboard

### Dashboard Navigation
The dashboard consists of a sidebar navigation and main content area:
- **Metered Readings**: Track pump readings and sales
- **Credit Sales**: Manage customer credit transactions
- **Reports**: Generate and export sales reports

### Metered Readings
1. Select a date for the readings
2. Enter current fuel prices
3. Record meter differences for each pump
4. Update stock information (closing stock and receipts)
5. Review sales summary
6. Click "Save Readings" to store the data

### Credit Sales
1. Fill in customer details
2. Select fuel type (petrol or diesel)
3. Enter quantity and price per liter
4. Add optional notes
5. Click "Add Credit Sale" to record the transaction
6. View all credit sales in the table below
7. Delete transactions using the delete button

### Reports
1. Select report type (daily, weekly, monthly, yearly)
2. Adjust date range if needed
3. Click "Generate Report" to create the report
4. View detailed sales information
5. Export the report as an image using "Export as Image"

## Database Schema

The application uses a PostgreSQL database with the following table:

### fuel-type-prices
Stores fuel type names and their prices:
- `id`: Integer (Primary Key)
- `name`: String (Fuel type name)
- `price`: Integer (Price per unit)

## State Management

The application uses Zustand for state management with the following structure:

### Metered Store
- `petrol`: Number (Current petrol volume)
- `diesel`: Number (Current diesel volume)
- `creditSales`: Array of CreditSale objects
- `meteredReadings`: Array of MeteredReading objects

### CreditSale Object
- `id`: String (Unique identifier)
- `customerName`: String (Customer name)
- `fuelType`: String ('petrol' or 'diesel')
- `quantity`: Number (Fuel quantity in liters)
- `price`: Number (Price per liter)
- `total`: Number (Total sale amount)
- `date`: String (Transaction date)
- `notes`: String (Optional notes)

### MeteredReading Object
- `id`: String (Unique identifier)
- `date`: String (Reading date)
- `petrolVolume`: Number (Total petrol volume)
- `dieselVolume`: Number (Total diesel volume)
- `petrolPrice`: Number (Petrol price per liter)
- `dieselPrice`: Number (Diesel price per liter)
- `petrolSales`: Number (Total petrol sales)
- `dieselSales`: Number (Total diesel sales)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on the GitHub repository or contact the development team.