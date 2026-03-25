import { useState } from "react";

export default function DataTable({ data }) {
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [page, setPage] = useState(1);

    const perPage = 5;

    // Search filter
    const filtered = data.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    // Sorting
    const sorted = [...filtered].sort((a, b) =>
        sortAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
    );

    // Pagination logic
    const totalPages = Math.ceil(sorted.length / perPage);
    const start = (page - 1) * perPage;
    const users = sorted.slice(start, start + perPage);

    // Smart pagination (no duplicates)
    const getPages = () => {
        let pages = [];

        // Always include first page
        pages.push(1);

        // Add dots if needed
        if (page > 3) {
            pages.push("...");
        }

        // Middle pages
        for (
            let i = Math.max(2, page - 1);
            i <= Math.min(totalPages - 1, page + 1);
            i++
        ) {
            pages.push(i);
        }

        // Add dots if needed
        if (page < totalPages - 2) {
            pages.push("...");
        }

        // Always include last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow">

            {/* Top controls */}
            <div className="flex flex-col md:flex-row gap-3 mb-4 justify-between">

                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search user"
                    className="border px-3 py-2 rounded-lg w-full md:w-1/3"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                {/* Sort button */}
                <button
                    onClick={() => setSortAsc(!sortAsc)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Sort {sortAsc ? "A-Z" : "Z-A"}
                </button>
            </div>

            {/* Table */}
            <table className="w-full text-left">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-b hover:bg-gray-100">
                            <td className="p-2">{u.id}</td>

                            <td className="p-2 flex items-center gap-2">
                                <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                                    {u.name[0]}
                                </div>
                                {u.name}
                            </td>

                            <td className="p-2 text-gray-600">{u.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4 flex-wrap">

                {/* Previous button */}
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {/* Page numbers */}
                {getPages().map((p, i) =>
                    p === "..." ? (
                        <span key={i} className="px-2">
                            ...
                        </span>
                    ) : (
                        <button
                            key={i}
                            onClick={() => setPage(p)}
                            className={`px-3 py-1 rounded ${page === p ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                {/* Next button */}
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}