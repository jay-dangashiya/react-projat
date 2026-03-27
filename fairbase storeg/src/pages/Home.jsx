import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import Header from "../components/Header";
import DataForm from "../components/DataForm";
import DataList from "../components/DataList";

const Home = () => {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const collectionRef = collection(db, "tasks");

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(items);
    });

    return () => unsubscribe();
  }, []);

  const addData = async (student) => {
    try {
      await addDoc(collectionRef, {
        name: student.name,
        email: student.email,
        course: student.course,
        age: student.age,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log("Add Error:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const updateData = async (id, updatedStudent) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        name: updatedStudent.name,
        email: updatedStudent.email,
        course: updatedStudent.course,
        age: updatedStudent.age,
        updatedAt: serverTimestamp(),
      });
      setEditItem(null);
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DataForm
        addData={addData}
        editItem={editItem}
        updateData={updateData}
      />
      <DataList
        data={data}
        deleteData={deleteData}
        setEditItem={setEditItem}
      />
    </div>
  );
};

export default Home;