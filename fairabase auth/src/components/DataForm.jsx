import { useEffect, useState } from "react";

const DataForm = ({ addData, editItem, updateData }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
  });

  useEffect(() => {
    if (editItem) {
      setForm(editItem);
    }
  }, [editItem]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editItem) {
      updateData(editItem.id, form);
    } else {
      addData(form);
    }

    setForm({ name: "", email: "", course: "", age: "" });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-500 px-6 py-4">
            <h2 className="text-white text-xl font-semibold flex items-center gap-2">
              {editItem ? "Edit Student" : "Add New Student"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <input
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="Enter course name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              {editItem && (
                <button
                  type="button"
                  onClick={() => setForm({ name: "", email: "", course: "", age: "" })}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className={`px-6 py-2 text-white rounded-lg transition-all shadow-md hover:shadow-lg ${editItem
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {editItem ? "Update Student" : "Add Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataForm;