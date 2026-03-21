import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [Students, setStudents] = useState([])
  const [Name, setName] = useState("")
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem("students")

    if (data) {
      setStudents(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(Students))
  }, [Students])

  const handleAdd = () => {
    if (Name.trim() === "") return

    setStudents([...Students, Name])
    setName("")
  }

  const handleEdit = (index) => {
    setName(Students[index]);
    setEditIndex(index);
  };


  const handleUpdate = () => {
    const updated = [...Students]
    updated[editIndex] = Name

    setStudents(updated)
    setName("")
    setEditIndex(null)
  }

  const handleDelete = (index) => {
    const filtered = Students.filter((_, i) => i !== index)
    setStudents(filtered)
  }


  return (
    <>
      <div className="min-h-screen  flex items-center justify-center ">
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-50 w-[400px] ">

          <h1 className="text-2xl font-bold text-center mb-6">
            Student App
          </h1>

          <div className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Enter student name"
              className="border p-2 w-full rounded-md"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />

            {editIndex === null ? (
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Add
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Update
              </button>
            )}
          </div>

          <ul className="space-y-3">
            {Students.map((student, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
              >
                <span>{student}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </>
  )
}

export default App
