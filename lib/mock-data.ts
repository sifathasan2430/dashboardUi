export interface MonthlyData {
  month: string;
  revenue: number;
  orders: number;
}

export const monthlyData: MonthlyData[] = [
  { month: "January", revenue: 4500, orders: 120 },
  { month: "February", revenue: 5200, orders: 150 },
  { month: "March", revenue: 4800, orders: 140 },
  { month: "April", revenue: 6100, orders: 210 },
  { month: "May", revenue: 5900, orders: 190 },
  { month: "June", revenue: 7200, orders: 250 },
  { month: "July", revenue: 7800, orders: 280 },
  { month: "August", revenue: 8100, orders: 300 },
  { month: "September", revenue: 7500, orders: 270 },
  { month: "October", revenue: 8900, orders: 320 },
  { month: "November", revenue: 9400, orders: 350 },
  { month: "December", revenue: 10500, orders: 410 },
];

export const userData = [
  { type: "free", count: 850, fill: "var(--color-free)" },
  { type: "premium", count: 320, fill: "var(--color-premium)" },
  { type: "enterprise", count: 75, fill: "var(--color-enterprise)" },
];


export const trafficData = [
  { source: "organic", visitors: 4500, fill: "#6366f1" },
  { source: "paid", visitors: 3200, fill: "#8b5cf6" },
  { source: "social", visitors: 2100, fill: "#0ea5e9" },
  { source: "referral", visitors: 1100, fill: "#10b981" },
];