const Header = () => {
    return (
        <header className="bg-blue-500 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center gap-3">
                   
                    <h1 className="text-2xl font-bold tracking-wide">Firebase Storage</h1>
                </div>
                <p className="text-center text-indigo-200 mt-2 text-sm">Manage your students data with ease</p>
            </div>
        </header>
    );
};

export default Header;