"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FolderOpen,
  User,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: FolderOpen,
    },
    {
      name: "Profile",
      href: "/admin/profile",
      icon: User,
    },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
            <h1 className="text-xl font-bold text-yellow-400">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-gray-400 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation - Scrollable */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-yellow-400 text-black"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout - Always visible at bottom */}
          <div className="p-4 border-t border-gray-700 flex-shrink-0 bg-gray-800">
            <div className="mb-4">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p
                className="text-sm font-medium text-white truncate"
                title={session?.user?.email || ""}
              >
                {session?.user?.email}
              </p>
            </div>
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="w-5 h-5 mr-3" />
                View Site
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1 text-gray-400 hover:text-white lg:hidden"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-lg font-semibold text-white">
                Portfolio Administration
              </h2>
            </div>
            {/* Mobile logout button */}
            <button
              onClick={handleSignOut}
              className="lg:hidden flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
