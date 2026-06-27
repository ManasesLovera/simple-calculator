# Simple Calculator

A modern, fully-tested calculator application built with React, TypeScript, and Vite.

## Features

- ✨ **Arithmetic Operations**: Addition, subtraction, multiplication, and division
- 🎨 **Modern UI**: Clean, responsive design with light/dark mode support
- 🧪 **Comprehensive Tests**: 31 unit tests covering all operations
- ⚡ **Fast & Performant**: Built with Vite for instant HMR and optimized builds
- 🔍 **Type Safe**: Full TypeScript support
- 🔄 **CI/CD Ready**: GitHub Actions workflow for automated testing

## Tech Stack

- **Framework**: React 19.2.7
- **Language**: TypeScript 6.0.2
- **Build Tool**: Vite 8.1.0
- **Testing**: Vitest 4.1.9
- **Linting**: ESLint 10.5.0
- **Node**: 20.x, 22.x

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
npm install
```

### Development

Start the development server with hot module reloading:

```bash
npm run dev
```

The app will be available at `http://localhost:5174`

### Build

Create a production-optimized build:

```bash
npm run build
```

### Testing

Run all unit tests with Vitest:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## Project Structure

```text
src/
├── App.tsx                 # Main calculator component
├── App.css                 # Calculator styles
├── index.css               # Global styles
├── main.tsx                # Entry point
└── utils/
    ├── calculator.ts       # Calculation logic
    └── calculator.test.ts  # Unit tests (31 tests)
.github/
└── workflows/
    └── test.yml           # GitHub Actions CI/CD
```

## Calculator Features

### Supported Operations

- **Addition** (+): Add two numbers
- **Subtraction** (−): Subtract two numbers
- **Multiplication** (×): Multiply two numbers
- **Division** (÷): Divide two numbers
- **Decimal**: Support for decimal numbers
- **Clear**: Reset calculator to initial state

### Usage

1. Click number buttons to enter values
2. Click an operation button (+, −, ×, ÷)
3. Enter the second number
4. Click **=** to see the result
5. Click **AC** to clear and start over

## Testing

The calculator includes comprehensive unit tests covering:

- ✅ All arithmetic operations
- ✅ Negative number handling
- ✅ Decimal number support
- ✅ Edge cases (zero, very small numbers, large numbers)
- ✅ Invalid operation fallbacks

View test results:

```bash
npm test -- --reporter=verbose
```

## CI/CD Pipeline

GitHub Actions automatically:

- Runs all tests on Node 20.x and 22.x
- Checks code quality with ESLint
- Validates on push and pull requests

View workflows: [GitHub Actions](https://github.com/ManasesLovera/simple-calculator/actions)

## Design System

The calculator uses a modern color system with CSS custom properties:

- **Primary Accent**: Purple (`#aa3bff` light, `#c084fc` dark)
- **Light Mode**: Clean white background with subtle borders
- **Dark Mode**: Modern dark palette with high contrast
- **Typography**: System fonts with optimized readability

## Contributing

Contributions are welcome! Please:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

All PRs must:

- Pass all tests
- Pass linting checks
- Include updated tests if applicable

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an [issue](https://github.com/ManasesLovera/simple-calculator/issues) on GitHub.

---

Built with ❤️ using React + TypeScript + Vite
