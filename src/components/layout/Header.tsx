"use client"
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        // Only run on client side
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Set initial width
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => closeMenu(), [pathname]);

    const navLinks = [
        { path: "/", name: "Home" },
        { path: "#about-us", name: "About" },
        { path: "#services", name: "Services" },
        { path: "contact-us", name: "Contact Us" },
    ];

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.1 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <header className="bg-[#024E68] shadow-md sticky top-0 z-50">
            <div className="container mx-auto">
                <div className="flex justify-between p-4">
                    <div className="text-2xl font-bold text-white">
                        <Link href="/" onClick={closeMenu}>
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                Logo
                            </motion.span>
                        </Link>
                    </div>


                    <button className="lg:hidden text-white focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? (
                            <X className="h-6 w-6 cursor-pointer" />
                        ) : (
                            <Menu className="h-6 w-6 cursor-pointer" />
                        )}
                    </button>

                    <AnimatePresence>
                        {(isMenuOpen || (windowWidth > 0 && windowWidth >= 1024)) && (
                            <motion.nav
                                className={`z-10 justify-center flex-col max-lg:pl-[36px] gap-8 pb-8 lg:flex lg:flex-row lg:items-center lg:space-x-4 absolute lg:static bg-[#024E68] w-full lg:w-auto left-0 lg:left-auto top-16 lg:top-auto p-4 lg:p-0 ${isMenuOpen ? "flex" : "hidden lg:flex"}`}
                                variants={mobileMenuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.div key={index} variants={linkVariants}>
                                        <Link href={link.path} onClick={closeMenu} className="relative block text-white font-medium lg:inline mt-2 lg:mt-0 group">
                                            {link.name}
                                            <motion.span
                                                className="lg:absolute lg:bottom-[-5px] lg:left-0 lg:h-[2px] lg:bg-white block"
                                                initial={{ width: pathname === link.path ? "100%" : "0%" }}
                                                animate={{ width: pathname === link.path ? "100%" : "0%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}

                                <div className="flex items-center gap-4 lg:hidden">
                                    <motion.div variants={linkVariants}>
                                        <Link href="/login" className="bg-[#ffffff] text-[#024E68] px-4 py-2 rounded-xl font-semibold" onClick={closeMenu}>
                                            Login
                                        </Link>
                                    </motion.div>
                                    <motion.div variants={linkVariants}>
                                        <Link href="/register" className="bg-[#ffffff] text-[#024E68] px-4 py-2 rounded-xl font-semibold" onClick={closeMenu}>
                                            Sign Up
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.nav>
                        )}
                    </AnimatePresence>
                    <div className="hidden lg:flex justify-center items-center space-x-4">
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <Link href="/login" className="text-white font-semibold hover:text-gray-200 transition-colors">
                                Login
                            </Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/register" className="bg-[#ffffff] text-[#024E68] px-4 py-2 rounded-xl font-semibold">
                                Sign Up
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;