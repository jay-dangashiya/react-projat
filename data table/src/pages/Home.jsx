import DataTable from "../components/DataTable";
import { users } from "../data/data";

export default function Home() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-bold mb-4">User Table</h1>
            <DataTable data={users} />
        </div>
    );
}