export type UserRole = "admin" | "client";

export type AdminPage =
  | "dashboard"
  | "product-catalog"
  | "manage-products"
  | "social-ads"
  | "orders-delivery"
  | "payments"
  | "account-settings";

export type ClientPage = "shop" | "my-orders" | "track-delivery" | "account-settings";

export type AppPage = AdminPage | ClientPage;

export interface UserSession {
  loginId: string;
  role: UserRole;
  displayName: string;
}

export interface NavItem {
  id: AppPage;
  label: string;
  hint: string;
}

export const ADMIN_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", hint: "Overview and mobile sync" },
  { id: "product-catalog", label: "Product catalog", hint: "All products by category" },
  { id: "manage-products", label: "Manage products", hint: "Add, edit, and upload images" },
  { id: "social-ads", label: "Social ads", hint: "Facebook and Instagram posts" },
  { id: "orders-delivery", label: "Orders & delivery", hint: "COD orders and TCS tracking" },
  { id: "payments", label: "Payments", hint: "COD, coupons, and revenue" },
  { id: "account-settings", label: "Account settings", hint: "Admin profile and app access" },
];

export const CLIENT_NAV: NavItem[] = [
  { id: "shop", label: "Shop perfumes", hint: "Browse and order with COD" },
  { id: "my-orders", label: "My orders", hint: "Order history" },
  { id: "track-delivery", label: "Track delivery", hint: "Live shipment status" },
  { id: "account-settings", label: "Account settings", hint: "Client profile" },
];

export const PAGE_TITLES: Record<AppPage, string> = {
  dashboard: "Admin dashboard",
  "product-catalog": "Products by category",
  "manage-products": "Manage products",
  "social-ads": "Social ad publishing",
  "orders-delivery": "Orders and delivery",
  payments: "Payments and coupons",
  "account-settings": "Account settings",
  shop: "Shop perfumes",
  "my-orders": "My orders",
  "track-delivery": "Track your delivery",
};

export function defaultPageForRole(role: UserRole): AppPage {
  return role === "admin" ? "dashboard" : "shop";
}
