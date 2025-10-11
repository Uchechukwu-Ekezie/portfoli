"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    // { name: "ESPM 112L", href: "/espm-112l" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name - left side */}
          <div className="flex items-center">
            <Link href="/" className="text-yellow-400 font-semibold text-lg">
              OP
            </Link>
            {/* Hidden admin access - only visible when you know to look for it */}
            <Link
              href="/admin"
              className="ml-4 text-xs text-gray-600 hover:text-yellow-400 transition-colors opacity-30 hover:opacity-100"
              title="Admin Access"
            >
              •
            </Link>
          </div>

          {/* Navigation - right side */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                  pathname === item.href ? "text-yellow-400" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Show admin link if logged in */}
            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
