# Bug Tracker Application - Client

A React-based bug tracking application built with Create React App. This application allows users to create, view, update, and delete bugs with different status levels (Open, In Progress, Resolved).

## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Debugging Techniques](#debugging-techniques)
- [Testing Approach & Coverage](#testing-approach--coverage)

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Steps to Install

1. **Clone or navigate to the project directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - React and React DOM
   - Testing libraries (@testing-library/react, @testing-library/jest-dom)
   - Axios for HTTP requests
   - Jest for testing

---

## Running the Project

### Development Mode

To start the development server:

```bash
npm start
```

- The application will open at [http://localhost:3000](http://localhost:3000)
- The page automatically reloads when you make changes
- Lint errors appear in the console

### Production Build

To create a production-optimized build:

```bash
npm run build
```

- Creates a `build` folder with minified, optimized files
- Ready for deployment

---

## Testing

### Running Tests

To launch the test runner in interactive watch mode:

```bash
npm test
```

Once in watch mode, you can:
- Press `a` to run all tests
- Press `f` to run only failed tests
- Press `p` to filter tests by filename
- Press `q` to quit watch mode
- Press `Enter` to re-run tests

### Available Test Files

- **`App.test.js`** - Tests for the main App component
  - Tests rendering of the bug tracker UI
  - Tests data loading and display functionality

### Running Tests with Coverage

To generate a test coverage report:

```bash
npm test -- --coverage --watchAll=false
```

This will display:
- Statement coverage (% of statements executed)
- Branch coverage (% of if/else branches tested)
- Function coverage (% of functions called)
- Line coverage (% of lines executed)

---

## Debugging Techniques

### 1. **Browser DevTools**

- Open the browser's Developer Tools (F12 or Right-click → Inspect)
- **Console Tab**: View error messages, warnings, and `console.log()` outputs
- **Network Tab**: Monitor API calls to the backend (e.g., `/api/bugs` endpoints)
- **React DevTools**: Install the React DevTools extension to inspect component hierarchy and state

### 2. **Console Logging**

The application includes strategic console logs for debugging:

```javascript
// In App.js - Error catching
console.error("Error fetching bugs:", err);
console.error("React Error Boundary:", error, errorInfo);
```

**How to use:**
- Open the Console tab in DevTools
- Check logs when actions fail (create, update, delete bugs)
- Look for error messages related to API connectivity

### 3. **Error Boundary**

The app implements React's Error Boundary component (`ErrorBoundary` class in `App.js`):

- Catches unhandled errors in the component tree
- Displays a fallback UI: "Something went wrong in the UI."
- Logs error details to the console
- Prevents entire app from crashing

### 4. **VS Code Debugging**

To debug directly in VS Code:

1. Install the "Debugger for Chrome" or "JavaScript Debugger" extension
2. Create a `.vscode/launch.json` file with:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "chrome",
         "request": "launch",
         "name": "Launch Chrome",
         "url": "http://localhost:3000",
         "webRoot": "${workspaceFolder}/src"
       }
     ]
   }
   ```
3. Set breakpoints in the code by clicking on the line number
4. Press F5 to start debugging
5. Step through code with F10 (step over) or F11 (step into)

### 5. **React Developer Profiler**

To analyze component rendering performance:

1. Install React DevTools browser extension
2. Open DevTools → "Profiler" tab
3. Record interactions (add bug, update status, delete)
4. View component render times and re-render triggers

### 6. **Network Monitoring**

- Check DevTools → **Network** tab to inspect API requests
- Verify backend is running at `http://localhost:5000`
- Look for 200 (success) or error status codes (4xx, 5xx)
- Inspect request/response payloads

### 7. **Common Issues and Solutions**

| Issue | Cause | Solution |
|-------|-------|----------|
| "Cannot GET /api/bugs" | Backend not running | Start the backend server on port 5000 |
| App shows "Loading bugs..." forever | API request failing | Check Network tab, verify backend URL |
| Buttons don't work | Event handler issues | Check console for errors, add console.logs |
| Component not re-rendering | State not updating | Verify setState calls, check React DevTools state |

---

## Testing Approach & Coverage

### Testing Strategy

The project uses **Jest** (via Create React App) and **React Testing Library** for testing. The approach focuses on:

1. **Unit Testing**: Testing individual components in isolation
2. **Integration Testing**: Testing component interactions with the API
3. **Error Handling**: Ensuring graceful error management

### Test Structure

#### App.test.js

The main test file validates core functionality:

```javascript
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

### Testing Approach Details

#### 1. **Rendering Tests**
- Verify components render without crashing
- Check for expected UI elements using `screen.getByText()`, `screen.getByRole()`, etc.
- Ensure proper props are passed and displayed

#### 2. **State & Props Tests**
- Verify state updates correctly after user interactions
- Test component re-renders when state changes
- Validate prop drilling from parent to child components

#### 3. **API Integration Tests**
- Mock axios calls using Jest mocks
- Test successful data fetching (GET)
- Test bug creation (POST)
- Test bug updates (PUT)
- Test bug deletion (DELETE)

#### 4. **Error Handling Tests**
- Test Error Boundary catches errors
- Verify error messages display
- Ensure app doesn't crash on API failures

#### 5. **User Interaction Tests**
- Test form submissions (add bug)
- Test button clicks (update status, delete)
- Test input field changes
- Use `userEvent` or `fireEvent` from testing-library

### Coverage Goals

| Type | Current | Target |
|------|---------|--------|
| Statements | Partial | >80% |
| Branches | Partial | >75% |
| Functions | Partial | >80% |
| Lines | Partial | >80% |

### How to Expand Test Coverage

1. **Add component tests** for `BugForm.jsx` and `BugList.jsx`
2. **Mock API calls** in tests using Jest mocks
3. **Test error scenarios** (network failures, invalid inputs)
4. **Test user interactions** (clicks, form submissions, typing)
5. **Test state management** (adding, updating, deleting bugs)

### Example Extended Test

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('creates a new bug', async () => {
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: { _id: '1', title: 'Test Bug', status: 'open' } });

  render(<App />);
  
  const input = screen.getByPlaceholderText('Bug title');
  fireEvent.change(input, { target: { value: 'New Bug' } });
  fireEvent.click(screen.getByText('Add Bug'));

  await waitFor(() => {
    expect(screen.getByText('New Bug')).toBeInTheDocument();
  });
});
```

---

## Project Structure

```
client/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── BugForm.jsx      # Form for creating bugs
│   │   └── BugList.jsx      # Display list of bugs
│   ├── App.js               # Main app component with error boundary
│   ├── App.test.js          # App component tests
│   ├── App.css              # App styling
│   ├── index.js             # React entry point
│   ├── index.css            # Global styles
│   ├── setupTests.js        # Jest configuration
│   └── reportWebVitals.js   # Performance monitoring
├── package.json
└── README.md
```

---

## Key Dependencies

- **React** (v19.2.0) - UI library
- **Axios** (v1.13.2) - HTTP client for API calls
- **@testing-library/react** (v16.3.0) - React testing utilities
- **@testing-library/jest-dom** (v6.9.1) - DOM matchers for Jest
- **Jest** (v27.5.1) - Testing framework

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests fail with "Cannot find module" | Run `npm install` to install all dependencies |
| Port 3000 already in use | Kill process or use `PORT=3001 npm start` |
| API requests fail | Ensure backend server is running on port 5000 |
| Changes not reflecting | Try clearing browser cache (Ctrl+Shift+Delete) and restarting dev server |

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Testing Library Docs](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io)
- [Create React App Docs](https://create-react-app.dev)
