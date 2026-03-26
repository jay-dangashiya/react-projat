// utils/hooks.js - Custom React Hooks for API Hunter

import { useState, useEffect, useCallback } from 'react';

/**
 * useLocalStorage - Custom hook for managing localStorage
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {[value, setValue]} - Current value and setter function
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

/**
 * useDebounce - Custom hook for debounced values
 * Useful for search inputs to avoid excessive filtering
 * @param {*} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {*} - Debounced value
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * useAsync - Custom hook for handling async operations
 * @param {function} asyncFunction - Async function to execute
 * @param {boolean} immediate - Should execute immediately on mount
 * @returns {object} - { data, loading, error }
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      const timer = setTimeout(() => {
        execute();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};

/**
 * usePagination - Custom hook for handling pagination
 * @param {array} items - Items to paginate
 * @param {number} itemsPerPage - Items per page
 * @returns {object} - Pagination state and methods
 */
export const usePagination = (items, itemsPerPage = 20) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    const pageNum = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(pageNum);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    itemsPerPage,
  };
};

/**
 * useFavourites - Custom hook for managing favorite items
 * @param {string} storageKey - LocalStorage key
 * @returns {object} - Favorites state and methods
 */
export const useFavourites = (storageKey = 'favorites') => {
  const [favorites, setFavorites] = useLocalStorage(storageKey, []);

  const toggleFavourite = (item) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some(
        (fav) => JSON.stringify(fav) === JSON.stringify(item)
      );
      if (isFavorited) {
        return prevFavorites.filter(
          (fav) => JSON.stringify(fav) !== JSON.stringify(item)
        );
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  const isFavourite = (item) => {
    return favorites.some(
      (fav) => JSON.stringify(fav) === JSON.stringify(item)
    );
  };

  const clearFavourites = () => setFavorites([]);

  return {
    favorites,
    toggleFavourite,
    isFavourite,
    clearFavourites,
    favouriteCount: favorites.length,
  };
};

// ==========================================
// utils/api.js - API utility functions

import axios from 'axios';

const API_BASE_URL = 'https://api.publicapis.org';

/**
 * Fetch all APIs from PublicAPIs.org
 * @returns {Promise<array>} - Array of API objects
 */
export const fetchAllApis = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/entries`);
    return response.data.entries || [];
  } catch (error) {
    console.error('Error fetching APIs:', error);
    throw error;
  }
};

/**
 * Fetch categories from APIs
 * @returns {Promise<array>} - Array of unique categories
 */
export const fetchCategories = async () => {
  try {
    const apis = await fetchAllApis();
    const uniqueCategories = [...new Set(apis.map((api) => api.Category))].sort();
    return uniqueCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Filter APIs by search term
 * @param {array} apis - Array of APIs
 * @param {string} searchTerm - Search term
 * @returns {array} - Filtered APIs
 */
export const filterBySearch = (apis, searchTerm) => {
  if (!searchTerm.trim()) return apis;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return apis.filter(
    (api) =>
      api.API.toLowerCase().includes(lowerSearchTerm) ||
      api.Description.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * Filter APIs by category
 * @param {array} apis - Array of APIs
 * @param {string} category - Category name
 * @returns {array} - Filtered APIs
 */
export const filterByCategory = (apis, category) => {
  if (!category) return apis;
  return apis.filter((api) => api.Category === category);
};

/**
 * Filter APIs by authentication
 * @param {array} apis - Array of APIs
 * @param {boolean} noAuthOnly - Show only APIs that don't require auth
 * @returns {array} - Filtered APIs
 */
export const filterByAuth = (apis, noAuthOnly = false) => {
  if (!noAuthOnly) return apis;
  return apis.filter((api) => !api.Auth);
};

/**
 * Filter APIs by HTTPS support
 * @param {array} apis - Array of APIs
 * @param {boolean} httpsOnly - Show only HTTPS APIs
 * @returns {array} - Filtered APIs
 */
export const filterByHttps = (apis, httpsOnly = false) => {
  if (!httpsOnly) return apis;
  return apis.filter((api) => api.HTTPS === true);
};

/**
 * Filter APIs by CORS support
 * @param {array} apis - Array of APIs
 * @param {boolean} corsOnly - Show only CORS-enabled APIs
 * @returns {array} - Filtered APIs
 */
export const filterByCors = (apis, corsOnly = false) => {
  if (!corsOnly) return apis;
  return apis.filter((api) => api.CORS === 'yes');
};

/**
 * Apply multiple filters
 * @param {array} apis - Array of APIs
 * @param {object} filters - Filter object
 * @returns {array} - Filtered APIs
 */
export const applyFilters = (apis, filters = {}) => {
  let result = apis;

  if (filters.searchTerm) {
    result = filterBySearch(result, filters.searchTerm);
  }

  if (filters.category) {
    result = filterByCategory(result, filters.category);
  }

  if (filters.noAuthOnly) {
    result = filterByAuth(result, true);
  }

  if (filters.httpsOnly) {
    result = filterByHttps(result, true);
  }

  if (filters.corsOnly) {
    result = filterByCors(result, true);
  }

  return result;
};

/**
 * Get API statistics
 * @param {array} apis - Array of APIs
 * @returns {object} - Statistics object
 */
export const getApiStatistics = (apis) => {
  return {
    totalApis: apis.length,
    httpsApis: apis.filter((api) => api.HTTPS).length,
    authRequiredApis: apis.filter((api) => api.Auth).length,
    corsEnabledApis: apis.filter((api) => api.CORS === 'yes').length,
    categoriesCount: new Set(apis.map((api) => api.Category)).size,
    apisByCategory: apis.reduce((acc, api) => {
      acc[api.Category] = (acc[api.Category] || 0) + 1;
      return acc;
    }, {}),
  };
};

/**
 * Sort APIs alphabetically
 * @param {array} apis - Array of APIs
 * @returns {array} - Sorted APIs
 */
export const sortApisAlphabetically = (apis) => {
  return [...apis].sort((a, b) => a.API.localeCompare(b.API));
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} - Promise that resolves when text is copied
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Generate curl command from API
 * @param {object} api - API object
 * @returns {string} - curl command
 */
export const generateCurlCommand = (api) => {
  return `curl "${api.Link}"`;
};

/**
 * Generate JavaScript fetch code
 * @param {object} api - API object
 * @returns {string} - Fetch code
 */
export const generateFetchCode = (api) => {
  return `fetch('${api.Link}')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
};

/**
 * Export API data as JSON
 * @param {array} apis - Array of APIs
 * @returns {string} - JSON string
 */
export const exportAsJson = (apis) => {
  return JSON.stringify(apis, null, 2);
};

/**
 * Export API data as CSV
 * @param {array} apis - Array of APIs
 * @returns {string} - CSV string
 */
export const exportAsCsv = (apis) => {
  const headers = ['API', 'Description', 'Category', 'Auth', 'HTTPS', 'CORS', 'Link'];
  const rows = apis.map((api) => [
    `"${api.API}"`,
    `"${api.Description}"`,
    `"${api.Category}"`,
    `"${api.Auth || 'None'}"`,
    api.HTTPS ? 'Yes' : 'No',
    api.CORS,
    `"${api.Link}"`,
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
};
