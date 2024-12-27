import Link from "next/link";

export default function Navbar() {
    return (
        
        <nav className="bg-primary-500 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold">LIMITLESS</div>
                    <div className="hidden md:flex space-x-8">
                    <Link href="/" className="hover:text-gray-200">Home</Link>
                    <Link href="/about-us" className="hover:text-gray-200">About Us</Link>
                    <Link href="/projects" className="hover:text-gray-200">Contact Us</Link>
                    <Link href="/services" className="hover:text-gray-200">Register</Link>
                    <Link href="/contact" className="hover:text-gray-200">Login</Link>
                    </div>
            </div>
        </nav>
    );
}