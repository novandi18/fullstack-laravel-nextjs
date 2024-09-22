import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

export const Navbar: FC = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="w-full bg-gray-100 dark:bg-gray-900 px-5 md:px-24 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="flex justify-between h-16">
        <Link href="/" className="flex-shrink-0 flex items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Emkay Products</span>
        </Link>

        <div className="flex items-center">
          {router.pathname !== "/archive" && (
            <Link href="/archive">
              <button className="py-2 px-4 bg-yellow-600 dark:bg-yellow-800 text-white rounded-full hover:bg-yellow-700 dark:hover:bg-yellow-900 transition-colors duration-300 text-sm">Arsip Produk</button>
            </Link>
          )}
          {router.pathname !== "/add" && (
            <Link href="/add">
              <button className="ml-2 py-2 px-4 bg-blue-600 dark:bg-blue-800 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors duration-300 text-sm">Tambah Produk</button>
          </Link>
          )}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 border border-gray-300 dark:border-gray-700"
          >
            {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}