## Environment Setup Guide

### Prerequisites
- Node.js v18 or higher
- npm or yarn package manager
- Git (for version control)
- VS Code or any code editor

### Installation Steps

1. **Clone or extract the project:**
   ```bash
   cd PR-10-API-Hunter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Open browser and go to `http://localhost:5173`
   - Application should load and fetch APIs automatically

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build project for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint to check code quality |

### Project Structure Explained

```
PR-10-API-Hunter/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx       # Page header
│   │   ├── SearchBar.jsx    # Search functionality
│   │   ├── FilterDropdown.jsx # Category filter
│   │   ├── ApiCard.jsx      # Individual API display
│   │   ├── ApiList.jsx      # Grid of APIs
│   │   └── Footer.jsx       # Footer section
│   ├── pages/               # Page components
│   │   └── Home.jsx         # Main home page
│   ├── utils/               # Utility functions
│   │   └── api.js           # API utilities and hooks
│   ├── App.jsx              # Root component
│   ├── App.css              # Component styles
│   ├── index.css            # Global styles & Tailwind
│   └── main.jsx             # React entry point
├── public/                  # Static files
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS configuration
├── eslint.config.js         # ESLint configuration
└── README.md                # Project documentation
```

### Important Files

#### package.json
- Defines project metadata
- Lists all dependencies
- Contains build and dev scripts

#### vite.config.js
- Vite build tool configuration
- React plugin setup

#### tailwind.config.js
- Tailwind CSS customization
- Theme extensions

#### .env (if needed)
```env
VITE_API_URL=https://api.publicapis.org
VITE_API_TIMEOUT=10000
```

### Common Issues & Solutions

#### Issue: Module not found
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Port 5173 already in use
**Solution:**
```bash
npm run dev -- --port 3000
```

#### Issue: Tailwind styles not applied
**Solution:**
1. Ensure `postcss.config.js` exists
2. Check `tailwind.config.js` content path
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart dev server

#### Issue: API data not loading
**Solution:**
1. Check internet connection
2. Open browser console (F12) for errors
3. Verify API endpoint: https://api.publicapis.org/entries
4. Try disabling ad blockers

### Code Quality

Run linter to check code:
```bash
npm run lint
```

### Git Workflow

```bash
# Clone repository
git clone <repository-url>

# Create feature branch
git checkout -b feature/my-feature

# Stage changes
git add .

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature
```

### Performance Tips

1. **Use Debouncing for Search:**
   - Avoid filtering on every keystroke
   - Use `useDebounce` hook from utils

2. **Implement Pagination:**
   - Don't render all APIs at once
   - Check ADVANCED_FEATURES.js for pagination

3. **Use React.memo:**
   - Memoize expensive components
   ```jsx
   export default React.memo(ApiCard);
   ```

4. **Code Splitting:**
   - Use lazy loading for routes (if using React Router)
   ```jsx
   const Home = React.lazy(() => import('./pages/Home'));
   ```

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Testing (Optional)

Install testing libraries:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

Run tests:
```bash
npm run test
```

### Accessibility Considerations

- Use semantic HTML
- Add alt text to images
- Ensure keyboard navigation
- Maintain good color contrast
- Use aria labels where needed

### Security Best Practices

1. Never commit sensitive data
2. Use environment variables for API URLs
3. Validate and sanitize user input
4. Keep dependencies updated:
   ```bash
   npm update
   npm audit fix
   ```

### Performance Monitoring

Monitor with browser DevTools:
1. Open DevTools (F12)
2. Go to Performance tab
3. Record and analyze

### Next Steps

1. Customize footer with your name and ID
2. Explore ADVANCED_FEATURES.js for enhancements
3. Deploy application (see DEPLOYMENT.md)
4. Add more features based on your needs
5. Share project with others
