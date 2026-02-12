import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 dark:bg-[#080808] border-t border-gray-100 dark:border-gray-800/50 py-12 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-black tracking-tighter mb-4 inline-block">
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                FILMFLUX
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 font-medium leading-relaxed">
                            Discover the latest cinematic masterpieces, explore trending hits, and curate your personal collection with FilmFlux.
                        </p>
                        <div className="flex gap-4">
                            {/* Simple Social Icons (Placeholders) */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors shadow-sm">
                                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-sm"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">Home</Link></li>
                            <li><Link href="/watchlist" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">Watchlist</Link></li>
                            <li><Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">Categories</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">Terms of Service</Link></li>
                            <li><Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 font-medium">
                        &copy; {new Date().getFullYear()} FilmFlux. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-400 font-medium flex items-center gap-1">
                        Made with <span className="text-red-500">♥</span> for ALX Project
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
