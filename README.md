# HerbTech Smart Cultivation MVP

A frontend-only demo of a smart hydroponic cultivation system built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Live telemetry display with animated plants that grow and move based on care quality
- **Charts**: 24-hour historical data visualization using Recharts
- **Settings**: Configurable cultivation parameters saved to localStorage
- **Authentication**: Demo login system (any credentials work)
- **Real-time Updates**: Simulated telemetry data updates every 2 seconds
- **Toast Notifications**: System events and manual control feedback
- **Animated Plants**: SVG plants with moving leaves, realistic growth, and health indicators

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Add plant images to the public directory:
   - `/public/plants/Brahmi.png`
   - `/public/plants/Ashwagandha.png`

3. Start the development server:
```bash
npm run dev
```

4. Try it in your browser: [View the website](https://deluxe-platypus-d1a76e.netlify.app)

## Animated Plants

The app features custom SVG animated plants:
- **Brahmi**: Small round leaves that sway gently, produces yellow flowers when healthy
- **Ashwagandha**: Elongated leaves with more dramatic movement, produces red berries when very healthy
- **Growth Animation**: Plants scale from 0.4x to 1.2x based on overall health
- **Leaf Movement**: Leaves sway with intensity based on plant health
- **Health Indicators**: Plant colors change from green (healthy) to red (poor care)
- **Environmental Effects**: Visual humidity droplets when humidity is high

## Demo Features

- **Live Telemetry**: Temperature, humidity, soil moisture, pH, and light intensity
- **Plant Growth Simulation**: Animated plants grow and change based on care quality
- **Moving Leaves**: Continuous leaf animation that responds to plant health
- **Care Indicators**: Real-time feedback on soil, temperature, humidity, and light conditions
- **Manual Controls**: Prime pump and toggle LED buttons (logged-in users only)
- **Settings Management**: Photoperiod, soil thresholds, LED PWM, watering duration
- **Historical Charts**: 24-hour data visualization with realistic sin-wave patterns
- **Authentication**: Demo login (use any username/password)
- **Health Visualization**: Chamber background changes color based on plant health

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts
- **Notifications**: React Toastify
- **Forms**: React Hook Form + Zod validation
- **State**: React hooks with localStorage persistence

## Architecture

- Pure frontend application with no backend dependencies
- Simulated telemetry data using mathematical functions
- Local state management with React hooks
- localStorage for settings and authentication persistence
- Responsive design optimized for desktop and mobile

## Demo Login

Use any username and password combination to log in. The demo mode provides full access to all features including manual controls and settings modification.

## Plant Care System

The animated plants respond to environmental conditions:
- **Optimal Conditions**: Plants grow larger, leaves move more, produce flowers/berries
- **Poor Conditions**: Plants become smaller, leaves droop, colors fade to gray/red
- **Real-time Feedback**: Health percentage and care indicators update every 2 seconds
- **Visual Effects**: Chamber lighting and soil moisture affect the visual environment
