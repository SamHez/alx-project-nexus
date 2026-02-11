import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
