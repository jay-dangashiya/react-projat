# 🚀 API Hunter - Public API Explorer

A modern ReactJS web application that allows users to explore, search, and filter public APIs. Built with React, Vite, Tailwind CSS, and powered by the PublicAPIs.org dataset.

## 📋 Project Overview

API Hunter is an educational project designed to teach students how to:
- Fetch data from external APIs using Axios
- Implement search and filter functionality
- Build reusable React components
- Handle loading and error states
- Create responsive user interfaces with Tailwind CSS

## ✨ Features

### Core Features
- **API List Display** - Browse all available public APIs with detailed information
- **Search Functionality** - Search APIs by name or description
- **Category Filtering** - Filter APIs by their categories
- **API Details** - View description, category, authentication requirements, and CORS status
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices
- **Copy URL** - Quick copy button for API links
- **External Links** - Direct links to API documentation

### Advanced Features
- **Loading States** - Smooth loading spinner while fetching data
- **Error Handling** - User-friendly error messages
- **Sorting** - APIs are alphabetically sorted
- **Visual Indicators** - Icons for authentication, CORS support, and HTTPS
- **Smooth Animations** - Card hover effects and transitions

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **ReactJS** | Frontend framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Axios** | HTTP client for API requests |
| **PublicAPIs.org** | Data source for API information |

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Main header with project title
│   ├── SearchBar.jsx        # Search input component
│   ├── FilterDropdown.jsx   # Category filter dropdown
│   ├── ApiCard.jsx          # Individual API card display
│   ├── ApiList.jsx          # Grid of API cards
│   └── Footer.jsx           # Footer with student info
├── pages/
│   └── Home.jsx             # Main page with state management
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
├── App.css                  # Custom styles
└── index.css                # Tailwind directives and base styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 💡 Key Learning Concepts

### 1. React Hooks
- `useState` - Manage component state (apis, search term, selected category)
- `useEffect` - Fetch APIs on component mount and react to changes

### 2. API Integration
- Using Axios to fetch data from external APIs
- Handling loading and error states
- Error handling and user feedback

### 3. Component Architecture
- Functional components with hooks
- Props passing between parent and child components
- Lifting state up for shared state management

### 4. Search & Filter Logic
```jsx
// Filter by search term
result = result.filter(api =>
  api.API.toLowerCase().includes(searchTerm.toLowerCase())
)

// Filter by category
result = result.filter(api => api.Category === selectedCategory)
```

### 5. Responsive Design with Tailwind
- Mobile-first approach
- Grid layouts with breakpoints
- Flexible spacing and typography

## 📊 API Data Structure

The PublicAPIs.org API returns data with the following structure:

```javascript
{
  "API": "String - API Name",
  "Description": "String - Description of the API",
  "Auth": "String - Authentication type (if any)",
  "HTTPS": Boolean - Does the API support HTTPS,
  "CORS": "String - yes/no/unknown",
  "Link": "String - URL to API documentation",
  "Category": "String - API category",
  "requiresOAuth": Boolean
}
```

## 🎯 Component Breakdown

### Header Component
- Displays project title and description
- Gradient background with emoji icons
- Encouraging message for users

### SearchBar Component
- Real-time search input
- Clears search results with Clear button
- Searches both API names and descriptions

### FilterDropdown Component
- Dynamically populated with categories
- Reset filter button
- Selected category display

### ApiCard Component
- Shows API name with gradient header
- Description with line clamping
- Category and feature badges
- Copy URL functionality
- Direct link to API documentation
- HTTPS and authentication status

### ApiList Component
- Responsive grid layout (1-3 columns)
- Loading spinner
- Error message display
- Empty state handling
- Result count display

### Footer Component
- Project information
- Developer details
- API source attribution
- Year and credits

## 🌟 Optional Advanced Features

Students can extend this project with:

### 1. **Dark Mode**
```jsx
const [isDarkMode, setIsDarkMode] = useState(false);

<header className={isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r...'}>
```

### 2. **Pagination**
- Display 20 APIs per page
- Previous/Next buttons
- Page counter

### 3. **Favorites/Bookmarks**
- Save favorite APIs to localStorage
- Favorite APIs page
- Heart icon on cards

### 4. **API Category Tabs**
- Display categories as tabs instead of dropdown
- Better visual navigation

### 5. **Advanced Filtering**
- Filter by authentication type
- Filter by HTTPS support
- Filter by CORS support
- Multiple category selection

### 6. **Copy Feature Enhancements**
- Copy API description
- Copy curl command
- Copy fetch code snippet

### 7. **Statistics Dashboard**
- Total APIs count
- APIs by category
- Authentication type breakdown

## 🐛 Troubleshooting

### APIs not loading?
- Check internet connection
- Verify API endpoint: `https://api.publicapis.org/entries`
- Open browser console for error messages

### Styling not applied?
- Ensure Tailwind CSS is properly initialized
- Clear browser cache
- Check that `postcss.config.js` and `tailwind.config.js` exist

### Port already in use?
```bash
npm run dev -- --port 3000
```

## 📝 Code Examples

### Fetching Data
```jsx
useEffect(() => {
  const fetchApis = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.publicapis.org/entries');
      setApis(response.data.entries);
    } catch (err) {
      setError('Failed to load APIs');
    } finally {
      setLoading(false);
    }
  };
  fetchApis();
}, []);
```

### Search & Filter
```jsx
useEffect(() => {
  let result = apis;
  
  if (searchTerm.trim()) {
    result = result.filter(api => 
      api.API.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (selectedCategory) {
    result = result.filter(api => api.Category === selectedCategory);
  }
  
  setFilteredApis(result);
}, [searchTerm, selectedCategory, apis]);
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)
- [PublicAPIs.org](https://publicapis.org)

## 👨‍💻 Student Information

- **Name:** Your Name
- **Student ID:** Your ID
- **Project:** API Hunter - Public API Explorer
- **Date:** March 2026

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

---

**Happy Coding! 🎉**
