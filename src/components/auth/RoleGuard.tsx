"use client";

import React from "react";
import { UserRole } from "@/types/user";
import { useUser } from "@/context/UserContext";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  forbiddenRoles?: UserRole[];
  fallback?: React.ReactNode;
}

/**
 * A component that conditionally renders its children based on the user's role.
 *
 * @example
 * <RoleGuard allowedRoles={["admin", "host"]}>
 *   <button>Edit Event</button>
 * </RoleGuard>
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  forbiddenRoles,
  fallback = null,
}) => {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated || !user?.user_type) {
    return <>{fallback}</>;
  }

  const userRole = user.user_type as UserRole;

  // If allowedRoles is provided, user must have one of them
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  // If forbiddenRoles is provided, user must NOT have any of them
  if (forbiddenRoles && forbiddenRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
