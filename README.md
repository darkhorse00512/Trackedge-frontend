# TrackEdge - Professional Trading Journal

A modern, feature-rich trading journal application built with React, TypeScript, and Vite. Track your trades, analyze performance, and improve your trading strategy with data-driven insights.

## 🚀 Features

- **Trade Journaling**: Document trades with detailed notes, screenshots, and analysis
- **Performance Analytics**: Track win rate, profit/loss, and trading patterns
- **Strategy Management**: Create and manage trading strategies with detailed setups
- **Progress Tracking**: Monitor growth and identify improvement areas
- **Modern UI**: Beautiful, responsive design with dark mode support
- **Real-time Data**: Live updates and notifications
- **Export Capabilities**: Export data for external analysis

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **State Management**: React Context, TanStack Query
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod validation
- **Charts**: Recharts
- **Testing**: Vitest, React Testing Library

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm 8+ or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trackedge-trading-journal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the environment variables with your configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:8080](http://localhost:8080)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layouts/        # Layout components
├── pages/              # Page components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── utils/              # Utility functions
├── constants/          # Application constants
├── types/              # TypeScript type definitions
├── styles/             # Global styles
└── assets/             # Static assets
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run build:prod` - Build for production with optimizations
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## 🧪 Testing

The project uses Vitest for testing. Run tests with:

```bash
npm run test
```

For UI testing:
```bash
npm run test:ui
```

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

### Manual Deployment

1. Build the project:
   ```bash
   npm run build:prod
   ```

2. Upload the contents of the `dist` folder to your web server

## �� Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App Configuration
VITE_APP_NAME=TrackEdge
VITE_APP_URL=http://localhost:8080
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://reactjs.org/) for the amazing framework

---

**TrackEdge** - Elevate your trading performance with data-driven insights.
