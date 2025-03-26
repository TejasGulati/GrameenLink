# GrameenLink

## Overview
GrameenLink is an innovative rural distribution platform designed to transform last-mile delivery in rural India using technology. The platform leverages AI-driven micro-warehouses, drone delivery systems, blockchain transparency, and mobile retail vans to empower rural economies with efficient and transparent supply chains.

## Features
- Blockchain-powered transparency
- Drone-based delivery system
- Inventory optimization for rural distribution
- Mobile retail vans for last-mile access
- Sustainability tracking for eco-friendly logistics
- Village kiosks for community-based commerce

## Tech Stack (Current Implementation)
- **Frontend**: React (Vite) with Tailwind CSS 3.2.7

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/GrameenLink.git
   cd GrameenLink
   ```

2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```

### Running the Project
Start the development server:
```sh
npm run dev  # or yarn dev
```
The app will be available at `http://localhost:5173/`.

## Project Structure
```
GrameenLink/
├── public/         # Static assets
├── src/
│   ├── assets/     # Images, icons, and other assets
│   ├── components/ # Reusable UI components
│   │   ├── BlockchainTransparency.jsx
│   │   ├── DroneDashboard.jsx
│   │   ├── InventoryOptimization.jsx
│   │   ├── MobileRetailVan.jsx
│   │   ├── Navbar.jsx
│   │   ├── SustainabilityTracker.jsx
│   │   ├── VillageKiosk.jsx
│   ├── App.jsx     # Root component
│   ├── main.jsx    # Entry point
│   ├── App.css     # Global styles
│   ├── index.css   # Tailwind styles
├── .gitignore      # Git ignore rules
├── eslint.config.js # Linting configuration
├── index.html      # Main HTML file
├── package.json    # Dependencies & scripts
├── postcss.config.cjs # PostCSS configuration
├── README.md       # Project documentation
├── tailwind.config.cjs # Tailwind configuration
├── vercel.json     # Deployment configuration
├── vite.config.js  # Vite configuration
```

## Future Roadmap
- **Backend Implementation**: Django API integration
- **Blockchain-based Transparency**: Hyperledger Fabric
- **Drone and IoT Tracking**: Real-time delivery updates
- **Mobile App**: React Native support
