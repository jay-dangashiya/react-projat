## Troubleshooting Guide

### Common Issues and Solutions

---

## Issue: APIs Not Loading

### Symptoms
- Blank screen where APIs should be
- Loading spinner keeps spinning
- No data displayed

### Solutions

**1. Check Internet Connection**
```bash
ping google.com
```

**2. Check API Endpoint Directly**
- Open in browser: https://api.publicapis.org/entries
- Should return JSON data
- If not, API might be down

**3. Check Browser Console**
1. Press `F12` to open DevTools
2. Go to Console tab
3. Look for red error messages
4. Common errors:
   - `CORS error` - API doesn't allow cross-origin requests
   - `404 Not Found` - Wrong API endpoint
   - `Network Error` - Connection issue

**4. Enable CORS**
If API returns CORS error:
```jsx
// Option 1: Use CORS proxy (temporary)
const response = await axios.get(
  'https://cors-anywhere.herokuapp.com/https://api.publicapis.org/entries'
);

// Option 2: Backend proxy
// Create backend endpoint that fetches from API
// Call backend instead of API directly

// Option 3: Use different API that allows CORS
```

**5. Check Network Tab**
1. Open DevTools → Network tab
2. Reload page
3. Look for API request
4. Check Response status:
   - 200 = Success
   - 404 = Not found
   - 500 = Server error
   - CORS error = Check response headers

---

## Issue: Styling Not Applied (Tailwind CSS)

### Symptoms
- Classes like `text-blue-600` show as raw HTML
- No colors or formatting
- Generic browser styling

### Solutions

**1. Verify Tailwind Installation**
```bash
# List Tailwind files
dir tailwind.config.js
dir postcss.config.js
```

**2. Clear Browser Cache**
- Hard refresh: `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
- Or use DevTools: Network tab → Disable cache

**3. Check Configuration Files**

`tailwind.config.js` should have:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // ...
}
```

`postcss.config.js` should have:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**4. Check CSS Import**
In `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**5. Restart Dev Server**
```bash
# Stop: Ctrl + C
npm run dev
```

---

## Issue: Port 5173 Already in Use

### Symptoms
```
Error: Port 5173 is already in use
```

### Solutions

**Option 1: Kill Process Using Port**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

**Option 2: Use Different Port**
```bash
npm run dev -- --port 3000
```

**Option 3: Restart Computer**
- Extreme but effective

---

## Issue: "Cannot find module 'axios'"

### Symptoms
```
Error: Cannot find module 'axios'
```

### Solutions

**1. Install Axios**
```bash
npm install axios
```

**2. Install All Dependencies**
```bash
rm -rf node_modules
npm install
```

**3. Check package.json**
Make sure axios is listed:
```json
{
  "dependencies": {
    "axios": "^1.4.0"
  }
}
```

---

## Issue: "React is not defined"

### Symptoms
```
ReferenceError: React is not defined
```

### Solutions

**Import React in every component:**
```jsx
import React from 'react';

export default function MyComponent() {
  return <div>Hello</div>;
}
```

Or enable automatic imports in tsconfig/jsconfig:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

---

## Issue: Components Not Updating

### Symptoms
- State changes but UI doesn't update
- Old data still displayed
- Search/filter not working

### Solutions

**1. Check useState Usage**
```jsx
// ✓ Correct
const [filtered, setFiltered] = useState([]);
setFiltered(newData); // Causes re-render

// ✗ Wrong
const filtered = apis; // Direct assignment
filtered = newData; // Won't trigger re-render
```

**2. Check useEffect Dependencies**
```jsx
// ✓ Run when searchTerm changes
useEffect(() => {
  filter();
}, [searchTerm]); // searchTerm in dependency array

// ✗ Never re-runs
useEffect(() => {
  filter();
}); // No dependency array - runs every render

// ✗ Runs infinite times
useEffect(() => {
  setApis([...]); // Updates apis, which re-runs effect
}, [apis]); // Infinite loop!
```

**3. Check Key Prop in Lists**
```jsx
// ✓ Correct - unique key
{apis.map((api) => (
  <ApiCard key={api.API} api={api} />
))}

// ✗ Wrong - array index (can cause issues)
{apis.map((api, index) => (
  <ApiCard key={index} api={api} />
))}
```

---

## Issue: Search/Filter Not Working

### Symptoms
- Search box appears but doesn't filter
- Filter dropdown doesn't change results
- Shows all APIs regardless of filters

### Solutions

**1. Check Filter Logic**
```jsx
// ✓ Correct
const filtered = apis.filter(api =>
  api.API.toLowerCase().includes(searchTerm.toLowerCase())
);

// ✗ Wrong - missing toLowerCase()
const filtered = apis.filter(api =>
  api.API.includes(searchTerm) // Case sensitive!
);
```

**2. Verify useState/setSearchTerm**
```jsx
// Make sure you're calling setSearchTerm
<input 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)} // ← Important!
/>
```

**3. Check useEffect Dependency**
```jsx
// Make sure searchTerm is in dependencies
useEffect(() => {
  // Filtering logic
  setFilteredApis(filtered);
}, [searchTerm, selectedCategory, apis]); // ← All dependencies included
```

---

## Issue: API Data Structure Wrong

### Symptoms
```
TypeError: Cannot read property 'API' of undefined
Cannot read property 'entries' of undefined
```

### Solutions

**1. Log API Response**
```jsx
const response = await axios.get('https://api.publicapis.org/entries');
console.log(response.data); // Check structure
```

**2. Handle Nested Data**
```jsx
// ✓ Correct - entries is inside data
const { data } = await axios.get(url);
const apis = data.entries;

// ✗ Wrong
const apis = data; // Missing .entries
```

**3. Add Error Boundaries**
```jsx
try {
  const response = await axios.get(url);
  if (response.data && response.data.entries) {
    setApis(response.data.entries);
  } else {
    setError('Unexpected API response structure');
  }
} catch (error) {
  setError(error.message);
}
```

---

## Issue: App Crashes or White Screen

### Symptoms
- Completely blank page
- Error in browser console
```
Cannot read property of undefined
```

### Solutions

**1. Check Browser Console**
- Press F12
- Look for red error messages
- Read error message carefully

**2. Add Error Boundaries**
```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

Create `ErrorBoundary.jsx`:
```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

**3. Use Debugging**
```jsx
console.log('Before error point:', data);
// Narrow down where error occurs
```

---

## Issue: Slow Performance

### Symptoms
- UI feels slow/laggy
- Search is delayed
- Scrolling is janky
- Page takes long to load

### Solutions

**1. Use Debouncing for Search**
```jsx
import { useDebounce } from './hooks/useDebounce';

const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  // Only filters when user stops typing for 500ms
  filterApis(debouncedSearchTerm);
}, [debouncedSearchTerm]);
```

**2. Memoize Components**
```jsx
export default React.memo(ApiCard);
```

**3. Use Pagination**
- Show 20 APIs per page instead of all
- See ADVANCED_FEATURES.js

**4. Check Network Performance**
- Open DevTools → Network tab
- See which requests are slow
- Compress images
- Use CDN for large assets

**5. Use Production Build**
```bash
npm run build
npm run preview # Test production build
```

---

## Issue: localStorage Not Working

### Symptoms
- Favorites not saved
- Preferences lost after refresh
- localStorage data not persisting

### Solutions

**1. Check if Storage is Enabled**
```javascript
if (typeof(Storage) !== "undefined") {
  console.log("localStorage supported");
} else {
  console.log("localStorage not supported");
}
```

**2. Check Storage Quota**
- Private browsing might limit storage
- Clear old data: `localStorage.clear()`

**3. Use try-catch**
```jsx
try {
  localStorage.setItem('key', JSON.stringify(data));
} catch (error) {
  console.error('Storage error:', error);
}
```

**4. Verify JSON Parsing**
```jsx
// Save
localStorage.setItem('data', JSON.stringify(obj));

// Load
const obj = JSON.parse(localStorage.getItem('data'));
```

---

## Issue: Build Fails

### Symptoms
```
error during build
```

### Solutions

**1. Check Build Output**
```bash
npm run build 2>&1 | tee build.log
# Check build.log for errors
```

**2. Clear Cache**
```bash
rm -rf dist node_modules .vite
npm install
npm run build
```

**3. Check for Syntax Errors**
```bash
npm run lint
```

**4. Verify Configuration**
- Check `vite.config.js`
- Check `tailwind.config.js`
- Check `postcss.config.js`

---

## Issue: Deployment Fails

### Symptoms
- Build succeeds locally
- Fails on deployment platform
- Environment errors

### Solutions

**1. Check Environment Variables**
- Create `.env.production`
- Don't commit sensitive data
- Use platform's environment variables UI

**2. Check Build Output**
```bash
# Build locally first
npm run build

# Check dist folder exists
ls dist/
```

**3. Platform-Specific**

**Vercel:**
- Check build logs in dashboard
- Verify framework detected correctly

**Netlify:**
- Check Deploy settings
- Verify build command: `npm run build`
- Verify publish directory: `dist`

**GitHub Pages:**
- Check if base URL is correct in vite.config.js
- Verify CNAME file exists (for custom domain)

---

## Getting Help

**1. Check Error Message Carefully**
- Error message often tells you exactly what's wrong
- Google the error message

**2. Check Documentation**
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Axios Docs](https://axios-http.com)

**3. Stack Overflow**
- Search your error on Stack Overflow
- Many common issues already solved

**4. Browser DevTools**
- Network tab: See API calls
- Console tab: See errors
- Application tab: See localStorage

**5. Debugging Steps**
1. Identify exactly when error occurs
2. Add console.log before error point
3. Check what values variables have
4. Work backwards from error

---

## Quick Tips

| Problem | Quick Fix |
|---------|-----------|
| Nothing shows | Press F5 to refresh |
| Styling broken | Clear cache (Ctrl+Shift+Delete) |
| Port in use | Kill process or use `--port 3000` |
| npm error | Run `npm install` |
| Can't find module | `npm install <package>` |
| Infinite loop | Check useEffect dependencies |
| Can't copy | Check clipboard permissions |
| API not working | Check CORS, check URL, check internet |

---

Remember: **Most errors are solved by:**
1. Reading the error message
2. Googling the error
3. Checking documentation
4. Restarting dev server
5. Clearing cache and reinstalling

**Happy Debugging! 🐛**
