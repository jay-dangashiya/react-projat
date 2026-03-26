import React from 'react';

const FilterDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center text-sm font-semibold text-slate-700 sm:text-base">
          <span className="mr-2 text-lg">📁</span>
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="min-w-[200px] rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {selectedCategory && (
          <button
            onClick={() => onCategoryChange('')}
            className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
          >
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
