## API Hunter - Complete Learning Guide

### Table of Contents
1. [Project Architecture](#architecture)
2. [React Concepts](#react-concepts)
3. [Component Deep Dive](#component-deep-dive)
4. [API Integration](#api-integration)
5. [Styling with Tailwind](#tailwind-css)
6. [State Management](#state-management)
7. [Performance](#performance)
8. [Common Patterns](#common-patterns)

---

## Architecture

### Component Hierarchy

```
App
├── Header
├── Home (State Management)
│   ├── SearchBar
│   ├── FilterDropdown
│   └── ApiList
│       └── ApiCard (multiple)
└── Footer
```

### Data Flow

```
User Input (Search/Filter)
         ↓
State Updates (useState)
         ↓
Side Effect (useEffect)
         ↓
Re-render with new data
         ↓
UI Update
```

---

## React Concepts

### 1. Functional Components

Modern React uses functional components with hooks:

```jsx
// Old way (Class Component)
class Header extends React.Component {
  render() {
    return <h1>Title</h1>;
  }
}

// New way (Functional Component)
function Header() {
  return <h1>Title</h1>;
}

// Or arrow function
const Header = () => <h1>Title</h1>;
```

### 2. useState Hook

Manages component state:

```jsx
const [apis, setApis] = useState([]);
// apis: current state
// setApis: function to update state
// []: initial value

// Updating state
setApis([...apis, newApi]); // Add item
setApis(apis.filter(a => a.id !== id)); // Remove item
setApis(prevApis => ({...prevApis, name: 'new'})); // Update

// Multiple state
const [search, setSearch] = useState('');
const [category, setCategory] = useState('');
```

### 3. useEffect Hook

Handles side effects (API calls, subscriptions, etc.):

```jsx
// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when dependencies change
useEffect(() => {
  filterApis();
}, [searchTerm, category]); // Runs when search or category changes

// Cleanup
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer); // Cleanup when component unmounts
}, []);
```

### 4. Props

Pass data from parent to child:

```jsx
// Parent
<ApiCard api={apiData} onToggleFavorite={toggleFav} />

// Child
function ApiCard({ api, onToggleFavorite }) {
  return (
    <div>
      <h3>{api.API}</h3>
      <button onClick={() => onToggleFavorite(api)}>
        Favorite
      </button>
    </div>
  );
}
```

### 5. Event Handling

Responding to user interactions:

```jsx
// Click event
const handleClick = () => {
  console.log('Clicked');
};
<button onClick={handleClick}>Click</button>

// Input change
const handleChange = (e) => {
  setSearchTerm(e.target.value);
};
<input onChange={handleChange} />

// Form submit
const handleSubmit = (e) => {
  e.preventDefault(); // Prevent page reload
  // Handle form
};
<form onSubmit={handleSubmit}></form>

// Keyboard events
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    // Handle enter
  }
};
<input onKeyDown={handleKeyDown} />
```

### 6. Conditional Rendering

```jsx
// if-else in JSX
{loading ? <Spinner /> : <Content />}

// &&
{isAdmin && <AdminPanel />}

// switch
{status === 'loading' && <Spinner />}
{status === 'error' && <Error />}
{status === 'success' && <Data />}

// ternary with multiple conditions
{status === 'loading' ? (
  <Spinner />
) : error ? (
  <Error message={error} />
) : (
  <Content />
)}
```

---

## Component Deep Dive

### Header Component

```jsx
const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600">
      <h1>🔍 API Hunter</h1>
      {/* Content */}
    </header>
  );
};
```

**Key Concepts:**
- Static component (no state or effects)
- Uses Tailwind's gradient utilities
- Emoji for visual appeal

### SearchBar Component

```jsx
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search APIs..."
    />
  );
};
```

**Key Concepts:**
- Controlled component (state controlled by parent)
- Callback function for parent state update
- Two-way data binding

### FilterDropdown Component

```jsx
const FilterDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};
```

**Key Concepts:**
- Dynamic list rendering with `.map()`
- `key` prop for list items
- Controlled select element

### ApiCard Component

```jsx
const ApiCard = ({ api }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(api.Link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h3>{api.API}</h3>
      <p>{api.Description}</p>
      <button onClick={copyToClipboard}>
        {copied ? '✓ Copied' : '📋 Copy'}
      </button>
    </div>
  );
};
```

**Key Concepts:**
- Local state management
- Temporary state updates
- Copy to clipboard API
- Conditional rendering based on state

### Home Component (Main Logic)

```jsx
const Home = () => {
  // State
  const [apis, setApis] = useState([]);
  const [filteredApis, setFilteredApis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchApis = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.publicapis.org/entries');
        setApis(response.data.entries);
        // Extract categories
        const uniqueCats = [...new Set(response.data.entries.map(a => a.Category))];
        setCategories(uniqueCats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApis();
  }, []);

  // Filter data
  useEffect(() => {
    let filtered = apis;
    if (searchTerm) {
      filtered = filtered.filter(a => a.API.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory) {
      filtered = filtered.filter(a => a.Category === selectedCategory);
    }
    setFilteredApis(filtered);
  }, [searchTerm, selectedCategory, apis]);

  return (
    <main>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FilterDropdown {...filterProps} />
      <ApiList apis={filteredApis} loading={loading} error={error} />
    </main>
  );
};
```

**Key Concepts:**
- Multiple state variables
- Multiple useEffect hooks
- State lifting (passing to children)
- Separation of concerns

---

## API Integration

### Using Axios

```jsx
import axios from 'axios';

// GET request
axios.get('https://api.publicapis.org/entries')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Async/Await (cleaner)
const fetchData = async () => {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Error handling
try {
  const response = await axios.get(url);
  // response.status
  // response.data
  // response.headers
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.log(error.response.status); // 404, 500, etc.
  } else if (error.request) {
    // Request made but no response
    console.log('No response:', error.request);
  } else {
    // Error in request setup
    console.log('Error:', error.message);
  }
}
```

### CORS (Cross-Origin Resource Sharing)

```jsx
// CORS issues when API doesn't allow requests from different domain
// Check API response headers

const api = {
  CORS: 'yes', // ✓ Safe to use from browser
  CORS: 'no',  // ✗ Cannot use from browser
  CORS: 'unknown' // ? Check API documentation
};

// If CORS is 'no', you need backend proxy
// Or use services like CORS Anywhere
```

### Loading and Error States

```jsx
const ApiList = ({ apis, loading, error }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (apis.length === 0) {
    return <div>No APIs found</div>;
  }

  return <div>{/* Render APIs */}</div>;
};
```

---

## Styling with Tailwind CSS

### Utility-First CSS

```jsx
// Instead of writing CSS classes
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
  Click me
</button>

/* Traditional CSS
.button {
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  transition: 0.3s;
}
.button:hover {
  background: #1d4ed8;
}
*/
```

### Responsive Design

```jsx
// Mobile First
<div className="
  w-full                    // 100% width
  md:w-1/2                  // 50% on medium screens
  lg:w-1/3                  // 33% on large screens
  grid-cols-1               // 1 column mobile
  md:grid-cols-2            // 2 columns tablet
  lg:grid-cols-3            // 3 columns desktop
  p-4                       // 16px padding mobile
  md:p-6                    // 24px padding tablet
  lg:p-8                    // 32px padding desktop
">
  {/* Content */}
</div>

// Breakpoints
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Tailwind Classes

```jsx
// Colors
className="bg-blue-600 text-white border-red-500"
// Structure: {property}-{color}-{shade}
// Shades: 50, 100, 200, ..., 900

// Sizing
className="w-full h-12 px-4 py-2"
// w: width, h: height
// px: horizontal padding, py: vertical padding

// Layout
className="flex justify-center items-center gap-4"
// flex: display flex
// justify-*: horizontal alignment
// items-*: vertical alignment
// gap-*: spacing between items

// Effects
className="shadow-lg hover:shadow-2xl transition"
// shadow-*: box shadow
// hover:*: hover state
// transition: smooth animation
```

---

## State Management

### Local State (This Project)

```jsx
const [count, setCount] = useState(0);
```

**Pros:** Simple, built-in
**Cons:** Hard to share between distant components

### Lifting State Up

```jsx
// Parent manages state
function Parent() {
  const [data, setData] = useState('');
  
  return (
    <>
      <ChildA data={data} onChange={setData} />
      <ChildB data={data} />
    </>
  );
}

function ChildA({ data, onChange }) {
  return <input value={data} onChange={(e) => onChange(e.target.value)} />;
}

function ChildB({ data }) {
  return <p>{data}</p>;
}
```

### Context API (for complex apps)

```jsx
// Create context
const ApiContext = React.createContext();

// Provider component
function ApiProvider({ children }) {
  const [apis, setApis] = useState([]);
  return (
    <ApiContext.Provider value={{ apis, setApis }}>
      {children}
    </ApiContext.Provider>
  );
}

// Use in component
function MyComponent() {
  const { apis, setApis } = useContext(ApiContext);
  return <div>{/* Use apis */}</div>;
}
```

### LocalStorage

```jsx
// Save for persistence
useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);

// Load from storage
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
});
```

---

## Performance

### Avoiding Re-renders

```jsx
// 1. useMemo - Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]); // Only recalculates when data changes

// 2. useCallback - Memoize functions
const handleClick = useCallback(() => {
  // Function logic
}, [dependencies]);

// 3. React.memo - Memoize components
export default React.memo(ApiCard);

// 4. Key prop in lists
{apis.map(api => <ApiCard key={api.API} api={api} />)}
```

### Code Splitting

```jsx
// Dynamic imports for lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Common Patterns

### Custom Hook

```jsx
// useApi.js
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function Home() {
  const { data: apis, loading, error } = useApi('https://api.publicapis.org/entries');
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {apis && <ApiList apis={apis} />}
    </>
  );
}
```

### Form Handling

```jsx
function ApiForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit to API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Filtering and Searching

```jsx
const [filters, setFilters] = useState({
  search: '',
  category: '',
  https: false
});

const filtered = apis.filter(api => {
  // Search
  if (filters.search && !api.API.toLowerCase().includes(filters.search.toLowerCase())) {
    return false;
  }
  // Category
  if (filters.category && api.Category !== filters.category) {
    return false;
  }
  // HTTPS
  if (filters.https && !api.HTTPS) {
    return false;
  }
  return true;
});
```

---

## Debugging Tips

### Console Logging

```jsx
// Log state changes
useEffect(() => {
  console.log('APIs updated:', apis);
}, [apis]);

// Log component renders
console.log('Rendering ApiCard with:', api);
```

### React DevTools

```jsx
// Install React DevTools extension
// Inspect component tree
// Check props and state
// Trace why components render
```

### Browser Console

```javascript
// Check network requests
// Open Network tab in DevTools
// Look for API call failures

// Check for errors
// Open Console tab
// Red X = errors
```

---

## Best Practices

1. **One Responsibility:** Each component does one thing
2. **Reusable:** Components should be reusable
3. **Props Validation:** Pass correct prop types
4. **Comments:** Comment complex logic
5. **Naming:** Use descriptive names
6. **DRY:** Don't Repeat Yourself
7. **Performance:** Use memoization when needed
8. **Accessibility:** Add alt text, labels, etc.
9. **Testing:** Test edge cases
10. **Documentation:** Document usage

---

## Next Steps

1. Read [React Documentation](https://react.dev)
2. Implement features from ADVANCED_FEATURES.js
3. Try different UI libraries (Material-UI, chakra-ui)
4. Learn state management (Redux, Zustand)
5. Add testing (Vitest, React Testing Library)
6. Deploy your application
7. Get feedback and iterate

---

**Happy Learning! 🚀**
