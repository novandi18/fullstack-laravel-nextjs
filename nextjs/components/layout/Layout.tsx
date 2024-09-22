import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full justify-between bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="w-full mb-auto bg-gray-100 dark:bg-gray-900 px-5 md:px-24 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;