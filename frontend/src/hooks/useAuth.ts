// Role-based auth hook
// Roles: superadmin > import_manager / export_manager > import_staff / export_staff

export type UserRole =
  | "superadmin"
  | "import_manager"
  | "export_manager"
  | "import_staff"
  | "export_staff";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
  role: UserRole;
}

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("admin_user");
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("admin_token") && !!getAuthUser();
}

// Permission helpers
export function isSuperAdmin(user: AuthUser | null): boolean {
  return !!user && (user.is_superuser || user.role === "superadmin");
}

export function isManager(user: AuthUser | null): boolean {
  return !!user && (
    isSuperAdmin(user) ||
    user.role === "import_manager" ||
    user.role === "export_manager"
  );
}

export function isStaffOnly(user: AuthUser | null): boolean {
  return !!user && (
    user.role === "import_staff" || user.role === "export_staff"
  );
}

// What each role can access
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  superadmin:      ["dashboard", "contacts", "quotes", "employees", "pages", "settings", "products"],
  import_manager:  ["dashboard", "contacts", "quotes", "products"],
  export_manager:  ["dashboard", "contacts", "quotes", "products"],
  import_staff:    ["dashboard", "products"],
  export_staff:    ["dashboard", "products"],
};

export function canAccess(user: AuthUser | null, section: string): boolean {
  if (!user) return false;
  const role = user.is_superuser ? "superadmin" : user.role;
  const perms = ROLE_PERMISSIONS[role] ?? [];
  return perms.includes(section);
}

/** Returns which product category the user is restricted to, or null for all */
export function getAllowedProductCategory(user: AuthUser | null): "import" | "export" | null {
  if (!user) return null;
  if (user.role === "import_staff" || user.role === "import_manager") return "import";
  if (user.role === "export_staff" || user.role === "export_manager") return "export";
  return null; // superadmin sees all
}

/** Can this user publish/unpublish products? */
export function canPublishProducts(user: AuthUser | null): boolean {
  return isManager(user);
}
