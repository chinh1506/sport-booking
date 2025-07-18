"use client";
import { useState } from "react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-primary)] text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center shadow-md">
            <div className="flex flex-col gap-2 mt-2 md:mt-0">
                <div className="text-sm md:text-base animate-fade-in">Thứ tư, 11/06/2025</div>
                <div className="flex gap-2 animate-fade-in">
                    <button className="bg-white text-[var(--color-primary)] font-semibold px-3 py-1 rounded hover:bg-[var(--color-primary-light)] transition-colors duration-300">
                        Đăng nhập
                    </button>
                    <button className="bg-white text-[var(--color-primary)] font-semibold px-3 py-1 rounded hover:bg-[var(--color-primary-light)] transition-colors duration-300">
                        Đăng ký
                    </button>
                </div>
            </div>
            <nav className="bg-transparent text-[var(--color-primary)] text-white w-auto">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls="collapsed-menu"
                >
                    {/* Toggle icon */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>

                {/* Dropdown hướng qua bên trái */}
                {isOpen && (
                    <div
                        id="collapsed-menu"
                        className=" mr-2 w-40 px-4 py-2 space-y-2 bg-gray-700 rounded shadow-lg z-50"
                    >
                        <a href="#" className="block hover:text-gray-300">
                            Home
                        </a>
                        <a href="#" className="block hover:text-gray-300">
                            About
                        </a>
                        <a href="#" className="block hover:text-gray-300">
                            Contact
                        </a>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
