const DataCard = ({ item, deleteData, setEditItem }) => {
    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp.seconds * 1000).toLocaleString();
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-gray-600">{item.desc}</p>

            <p className="text-xs text-gray-400">
                {formatDate(item.createdAt)}
            </p>

            <div className="flex gap-2 mt-3">
                <button
                    onClick={() => setEditItem(item)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={() => deleteData(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DataCard;