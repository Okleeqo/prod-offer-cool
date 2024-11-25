# VitaminCFO OfferLab

A professional financial advisory proposal generator built with React, TypeScript, and OpenAI GPT-4.

## Features

- 🚀 Automated gap analysis using AI
- 💼 Professional service package templates
- 📊 Custom service configuration
- 🤖 AI-powered proposal generation
- 📝 Markdown-formatted deliverables
- 🎨 Beautiful, responsive UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- OpenAI GPT-4
- Zustand for state management
- React Router for navigation
- Lucide React for icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vitamincfo-offerlab.git
   cd vitamincfo-offerlab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your-api-key-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key for proposal generation

## Project Structure

```
src/
├── components/         # React components
│   ├── sections/      # Page sections
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API services
├── store/             # Zustand store
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.