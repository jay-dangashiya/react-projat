import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <header className="bg-blue-500 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-2xl font-bold tracking-wide">Firebase Storage</h1>
                </div>
                <p className="text-center text-indigo-200 mt-2 text-sm">Manage your students data with ease</p>
                {user && (
                    <div className="flex justify-center items-center mt-3 gap-4">
                        <span className="text-sm">Welcome, {user.displayName || user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;