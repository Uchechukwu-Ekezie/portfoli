"use client";

import React from "react";
import DashboardContent from "@/components/admin/DashboardContent";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute>
      <DashboardContent userName={user?.name || "Admin"} />
    </ProtectedRoute>
  );
}
