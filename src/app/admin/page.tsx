"use client";

import React from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();

  const quickActions = [
    {
      name: "Add New Project",
      description: "Create a new portfolio project",
      href: "/admin/projects/new",
      color: "border-blue-400 hover:bg-blue-400/10",
    },
    {
      name: "Manage Projects",
      description: "View and edit existing projects",
      href: "/admin/projects",
      color: "border-yellow-400 hover:bg-yellow-400/10",
    },
    {
      name: "Edit Profile",
      description: "Update your bio and information",
      href: "/admin/profile",
      color: "border-green-400 hover:bg-green-400/10",
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, {session?.user?.name}! 👋
            </h1>
            <p className="text-gray-300">
              Manage your portfolio content from this dashboard. You can add new projects, 
              edit your profile, and update existing content.
            </p>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className={`block p-6 bg-gray-800 border-2 ${action.color} rounded-lg transition-all hover:scale-105`}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {action.name}
                  </h3>
                  <p className="text-gray-400">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white">Project &quot;CAAPA Variant Annotation&quot; was updated</p>
                    <p className="text-sm text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white">New project &quot;TB scRNA-seq&quot; was created</p>
                    <p className="text-sm text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white">Profile information was updated</p>
                    <p className="text-sm text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}