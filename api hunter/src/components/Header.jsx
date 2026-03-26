import React from 'react';

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-lg">
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-cyan-200/20 blur-2xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">🔍 API Hunter</h1>
            <p className="mt-2 text-base text-blue-100 sm:text-lg">Explore and discover public APIs</p>
          </div>
          <div className="text-4xl sm:text-5xl">🚀</div>
        </div>
        <p className="max-w-3xl text-sm text-blue-50 sm:text-base">
          Browse a large API directory, search by name, and filter by category to quickly find what you need.
        </p>
      </div>
    </header>
  );
};

export default Header;
