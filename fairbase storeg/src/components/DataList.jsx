const DataList = ({ data, deleteData, setEditItem }) => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        Students List
                    </h2>
                </div>

                {data.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <p className="text-gray-500 text-lg">No students found</p>
                        <p className="text-gray-400 text-sm mt-1">Add a student using the form above</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.map((item, index) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                <div className="bg-gray-100 px-5 py-4 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="space-y-3">
                                        <div className="flex items-center text-center gap-3">
                                            
                                                <p className="text-xs text-gray-400 uppercase tracking-wide">Course</p>
                                                <p className="text-gray-700 font-medium ">{item.course}</p>
                                           
                                        </div>

                                        <div className="flex items-center text-center gap-3">
                                            
                                                <p className="text-xs text-gray-400 uppercase tracking-wide">Age</p>
                                                <p className="text-gray-700 font-medium">{item.age} years old</p>
                                            
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => setEditItem(item)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteData(item.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataList;