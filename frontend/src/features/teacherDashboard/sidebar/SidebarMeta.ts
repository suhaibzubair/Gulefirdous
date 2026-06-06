import { ReactComponent as HomeIcon } from "../../../assets/images/HomeStudent.svg";
import { ReactComponent as UsersIcon } from "../../../assets/images/UsersStudent.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/images/SettingsStudent.svg";
import { ReactComponent as ManageProduct } from "../../../assets/images/ManageProductStudent.svg";
import { ReactComponent as MarketAndSell } from "../../../assets/images/MarketAndSell.svg";
import { ReactComponent as Globe } from "../../../assets/images/Globe.svg";
import { ReactComponent as BarLineChart } from "../../../assets/images/BarLineChart.svg";
import { ReactComponent as AppIcon } from "../../../assets/images/apps.svg";

interface SidebarOption {
  icon: React.ComponentType;
  label: string;
  href?: string;
  options?: SubOption[];
}

interface SubOption {
  label: string;
  href: string;
  icon?: React.ComponentType;
}

export const sidebarOptions: SidebarOption[] = [
  {
    icon: HomeIcon,
    label: "Dashboard",
    href: "",
  },
  {
    icon: UsersIcon,
    label: "User Management",
    options: [
      { label: "Users", href: "users", icon: Globe },
      { label: "Group", href: "group", icon: Globe },
      { label: "Progress", href: "progress", icon: Globe },
      { label: "Certificates", href: "certificates", icon: Globe },
      { label: "Reviews", href: "reviews", icon: Globe },
      { label: "Users", href: "users", icon: Globe },
      { label: "Notifications", href: "notifications", icon: Globe },
    ],
  },
  {
    icon: ManageProduct,
    label: "Manage Products",
    options: [
      { label: "Learning Products", href: "learningProducts", icon: Globe },
      { label: "Communities", href: "Dashboard", icon: Globe },
      { label: "Members", href: "members", icon: Globe },
      { label: "Bundles", href: "bundles", icon: Globe },
      { label: "Video Library", href: "video-library", icon: Globe },
    ],
  },
  {
    icon: MarketAndSell,
    label: "Market And Sell",
    options: [
      { label: "Coupons", href: "coupons", icon: Globe },
      { label: "Sales Widgets", href: "sales-widgets", icon: Globe },
      { label: "Orders", href: "orders", icon: Globe },
      { label: "Affiliates", href: "affiliates", icon: Globe },
      { label: "Shares Revenue", href: "share-revenue", icon: Globe },
    ],
  },
  {
    icon: Globe,
    label: "Design Your Site",
    options: [
      { label: "Site pages", href: "site-pages" },
      { label: "Theme Library", href: "theme-library" },
      { label: "Categories", href: "categories" },
      { label: "Preview Website", href: "preview-websites" },
    ],
  },
  {
    icon: BarLineChart,
    label: "Analytics",
    options: [
      { label: "Revenue", href: "revenue" },
      { label: "Orders", href: "orders" },
      { label: "Enrollments", href: "enrollments" },
      { label: "Student Management", href: "student-management" },
    ],
  },
  {
    icon: SettingsIcon,
    label: "Settings",
    href: "settings",
  },
  {
    icon: AppIcon,
    label: "App",
    href: "app",
  },
];
