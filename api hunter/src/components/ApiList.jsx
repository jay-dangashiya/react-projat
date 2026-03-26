import React from 'react';
import ApiCard from './ApiCard';

const ApiList = ({ apis, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
        <div className="mb-3 text-5xl">⏳</div>
        <p className="text-lg font-semibold text-slate-700">Loading APIs...</p>
        <p className="mt-1 text-sm text-slate-500">This may take a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
        <p className="mb-2 text-2xl">⚠️</p>
        <p className="text-lg font-semibold text-red-700">Error Loading APIs</p>
        <p className="mt-1 text-sm text-red-600">{error}</p>
        <p className="mt-3 text-sm text-red-700">Please refresh the page</p>
      </div>
    );
  }

  if (apis.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
        <p className="mb-2 text-3xl">🔍</p>
        <p className="text-lg font-semibold text-amber-700">No APIs Found</p>
        <p className="mt-1 text-sm text-amber-700">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <p className="text-sm font-semibold text-blue-700">
          📊 Showing {apis.length} API{apis.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {apis.map((api, index) => (
          <ApiCard key={index} api={api} />
        ))}
      </div>
    </div>
  );
};

export default ApiList;
