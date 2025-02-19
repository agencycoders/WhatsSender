# WhatsApp Manager

A modern web application for managing WhatsApp business communications, built with React, TypeScript, and Tailwind CSS.

## Features

- 🌓 Light/Dark mode support
- 📱 Fully responsive design
- 📊 Dashboard with analytics
- 👥 Contact management
- 📝 Message templates
- 📈 Campaign management
- 🔔 Real-time notifications
- 🔒 Secure authentication
- 🌐 API integration with retry logic
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Axios
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/whatsapp-manager.git
cd whatsapp-manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── services/       # API services
├── styles/         # Global styles
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/) 