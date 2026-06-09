import React, { useMemo } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

interface DashboardProduct {
  id: number;
  category: string;
  price: number;
}

interface DashboardOrder {
  productId: number;
  total: number;
  source: string;
}

interface GulefirdousDashboardProps {
  orders: DashboardOrder[];
  products: DashboardProduct[];
  totalRevenue: number;
  displayName: string;
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const BASE_MONTHLY_SALES = [
  420000, 385000, 510000, 478000, 552000, 498000, 615000, 588000, 640000, 605000, 690000,
  725000,
];

const SOCIAL_AUDIENCE_BASE = {
  Facebook: 12400,
  Instagram: 18750,
  Website: 3100,
  App: 980,
} as const;

const CATEGORY_COLORS = ["#d4a574", "#5c3d6e", "#1a3d34", "#c73e54", "#3d6b9c", "#8b6f4e"];

function formatCompactPrice(value: number) {
  if (value >= 1000000) {
    return `Rs ${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `Rs ${Math.round(value / 1000)}K`;
  }

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function GulefirdousDashboard({
  orders,
  products,
  totalRevenue,
  displayName,
}: GulefirdousDashboardProps) {
  const totalOrders = orders.length;
  const categoryCount = useMemo(
    () => new Set(products.map((product) => product.category)).size,
    [products]
  );

  const salesByCategory = useMemo(() => {
    const totals = new Map<string, number>();

    products.forEach((product) => {
      if (!totals.has(product.category)) {
        totals.set(product.category, 0);
      }
    });

    orders.forEach((order) => {
      const product = products.find((item) => item.id === order.productId);
      const category = product?.category || "Other";
      totals.set(category, (totals.get(category) || 0) + order.total);
    });

    return Array.from(totals.entries()).sort((left, right) => right[1] - left[1]);
  }, [orders, products]);

  const yearlySales = useMemo(() => {
    const currentMonthIndex = 5;
    const monthly = [...BASE_MONTHLY_SALES];
    monthly[currentMonthIndex] += totalRevenue;

    return monthly;
  }, [totalRevenue]);

  const socialAudience = useMemo(() => {
    const orderBoost = {
      Facebook: orders.filter((order) => order.source === "Facebook").length * 42,
      Instagram: orders.filter((order) => order.source === "Instagram").length * 58,
      Website: orders.filter((order) => order.source === "Website").length * 24,
      App: orders.filter((order) => order.source === "App").length * 36,
    };

    return (Object.keys(SOCIAL_AUDIENCE_BASE) as Array<keyof typeof SOCIAL_AUDIENCE_BASE>).map(
      (platform) => ({
        platform,
        users: SOCIAL_AUDIENCE_BASE[platform] + orderBoost[platform],
      })
    );
  }, [orders]);

  const totalSocialReach = socialAudience.reduce((sum, item) => sum + item.users, 0);
  const yearlyTotal = yearlySales.reduce((sum, value) => sum + value, 0);

  const yearlySalesChart = {
    labels: [...MONTH_LABELS],
    datasets: [
      {
        label: "Sales (PKR)",
        data: yearlySales,
        borderColor: "#d4a574",
        backgroundColor: "rgba(212, 165, 116, 0.18)",
        fill: true,
        tension: 0.38,
        pointRadius: 4,
        pointBackgroundColor: "#2a1f2d",
        pointBorderColor: "#e8b98a",
        pointBorderWidth: 2,
      },
    ],
  };

  const categorySalesChart = {
    labels: salesByCategory.map(([category]) => category),
    datasets: [
      {
        label: "Sales by category",
        data: salesByCategory.map(([, amount]) => amount),
        backgroundColor: salesByCategory.map(
          (_, index) => CATEGORY_COLORS[index % CATEGORY_COLORS.length]
        ),
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const socialUsersChart = {
    labels: socialAudience.map((item) => item.platform),
    datasets: [
      {
        label: "Audience",
        data: socialAudience.map((item) => item.users),
        backgroundColor: ["#1877f2", "#e4405f", "#1a3d34", "#d4a574"],
        borderWidth: 0,
      },
    ],
  };

  const chartFont = {
    family: "Montserrat, Segoe UI, Arial, sans-serif",
    size: 12,
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number } }) => formatPrice(context.parsed.y),
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(42, 31, 45, 0.06)" },
        ticks: { color: "#7a6d78", font: chartFont },
      },
      y: {
        grid: { color: "rgba(42, 31, 45, 0.06)" },
        ticks: {
          color: "#7a6d78",
          font: chartFont,
          callback: (value: string | number) => formatCompactPrice(Number(value)),
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number } }) => formatPrice(context.parsed.y),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#7a6d78", font: chartFont },
      },
      y: {
        grid: { color: "rgba(42, 31, 45, 0.06)" },
        ticks: {
          color: "#7a6d78",
          font: chartFont,
          callback: (value: string | number) => formatCompactPrice(Number(value)),
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "#2a2228", font: chartFont, padding: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: number; label: string }) =>
            `${context.label}: ${context.parsed.toLocaleString()} users`,
        },
      },
    },
  };

  return (
    <section className="gf-dashboard" aria-label="Admin analytics dashboard">
      <div className="gf-dashboard-welcome">
        <div>
          <p className="gf-eyebrow">Overview</p>
          <h2>Welcome back, {displayName.replace(" (Admin)", "")}</h2>
          <p>Live snapshot of orders, revenue, category performance, and social audience.</p>
        </div>
        <div className="gf-dashboard-year-pill">2026 performance</div>
      </div>

      <div className="gf-dashboard-kpis">
        <article className="gf-kpi-card gf-kpi-orders">
          <span>Total orders</span>
          <strong>{totalOrders.toLocaleString()}</strong>
          <small>All orders until now</small>
        </article>
        <article className="gf-kpi-card gf-kpi-revenue">
          <span>Total sales</span>
          <strong>{formatPrice(totalRevenue)}</strong>
          <small>Confirmed COD revenue</small>
        </article>
        <article className="gf-kpi-card gf-kpi-categories">
          <span>Categories</span>
          <strong>{categoryCount}</strong>
          <small>{products.length} products listed</small>
        </article>
        <article className="gf-kpi-card gf-kpi-social">
          <span>Social reach</span>
          <strong>{totalSocialReach.toLocaleString()}</strong>
          <small>Users across platforms</small>
        </article>
      </div>

      <article className="gf-dashboard-panel gf-dashboard-panel-wide">
        <div className="gf-dashboard-panel-head">
          <div>
            <h3>Yearly sales</h3>
            <p>Monthly revenue trend for 2026</p>
          </div>
          <strong>{formatPrice(yearlyTotal)}</strong>
        </div>
        <div className="gf-dashboard-chart gf-dashboard-chart-line">
          <Line data={yearlySalesChart} options={lineChartOptions} />
        </div>
      </article>

      <div className="gf-dashboard-grid">
        <article className="gf-dashboard-panel">
          <div className="gf-dashboard-panel-head">
            <div>
              <h3>Sales by category</h3>
              <p>Category-wise revenue from orders</p>
            </div>
          </div>
          <div className="gf-dashboard-chart gf-dashboard-chart-bar">
            <Bar data={categorySalesChart} options={barChartOptions} />
          </div>
          <div className="gf-dashboard-category-list">
            {salesByCategory.map(([category, amount], index) => (
              <div key={category} className="gf-dashboard-category-item">
                <span
                  className="gf-dashboard-swatch"
                  style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                />
                <strong>{category}</strong>
                <em>{formatPrice(amount)}</em>
              </div>
            ))}
          </div>
        </article>

        <article className="gf-dashboard-panel">
          <div className="gf-dashboard-panel-head">
            <div>
              <h3>Social media users</h3>
              <p>Audience count by platform</p>
            </div>
          </div>
          <div className="gf-dashboard-chart gf-dashboard-chart-doughnut">
            <Doughnut data={socialUsersChart} options={doughnutOptions} />
          </div>
          <div className="gf-dashboard-social-list">
            {socialAudience.map((item) => (
              <div key={item.platform} className="gf-dashboard-social-item">
                <span>{item.platform}</span>
                <strong>{item.users.toLocaleString()}</strong>
                <small>users</small>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default GulefirdousDashboard;
