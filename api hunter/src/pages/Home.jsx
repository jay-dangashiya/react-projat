import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import ApiList from '../components/ApiList';
import axios from 'axios';

const API_DIRECTORY_URL = 'https://api.apis.guru/v2/list.json';

const normalizeApisGuruData = (payload) => {
  const entries = Object.entries(payload || {});

  return entries
    .map(([apiKey, apiValue]) => {
      const preferredVersion = apiValue?.preferred;
      const versionData =
        (preferredVersion && apiValue?.versions?.[preferredVersion]) ||
        Object.values(apiValue?.versions || {})[0];
      const info = versionData?.info || {};
      const category = info['x-apisguru-categories']?.[0] || 'Other';
      const link =
        versionData?.swaggerUrl ||
        versionData?.swaggerYamlUrl ||
        versionData?.link ||
        info?.contact?.url ||
        `https://${apiKey}`;

      return {
        API: info.title || apiKey,
        Description: info.description || 'No description available.',
        Category: category,
        Link: link,
        Auth: '',
        HTTPS: String(link).startsWith('https://'),
        CORS: 'unknown',
      };
    })
    .filter((api) => api.API && api.Link);
};

const Home = () => {
  const [apis, setApis] = useState([]);
  const [filteredApis, setFilteredApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch APIs on component mount
  useEffect(() => {
    const fetchApis = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_DIRECTORY_URL);

        if (response.data) {
          const normalizedApis = normalizeApisGuruData(response.data);
          const sortedApis = normalizedApis.sort((a, b) =>
            a.API.localeCompare(b.API)
          );
          setApis(sortedApis);

          // Extract unique categories
          const uniqueCategories = [...new Set(sortedApis.map(api => api.Category))].sort();
          setCategories(uniqueCategories);

          setFilteredApis(sortedApis);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching APIs:', err);
        setError('Failed to load APIs. The source API may be temporarily unavailable.');
        setApis([]);
        setFilteredApis([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  // Filter APIs based on search term and category
  useEffect(() => {
    let result = apis;

    // Filter by search term
    if (searchTerm.trim()) {
      result = result.filter(api =>
        api.API.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.Description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(api => api.Category === selectedCategory);
    }

    setFilteredApis(result);
  }, [searchTerm, selectedCategory, apis]);

  return (
    <main className="flex-grow">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Explore APIs</h2>
          <p className="mt-1 text-sm text-slate-600">Search and filter to quickly find a suitable API.</p>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <FilterDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ApiList apis={filteredApis} loading={loading} error={error} />
      </div>
    </main>
  );
};

export default Home;
