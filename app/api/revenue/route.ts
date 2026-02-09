import { NextResponse } from 'next/server';

// Helper for the requested delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Extract params: e.g., /api/stats?role=admin&range=30day
  const role = searchParams.get('role') || 'user';
  const range = searchParams.get('range') || '7day';

  // --- DATA SETS ---

  // 1. High Performance (Large numbers - typically Admin 30-day)
  const dataHigh = {
    revenue: { label: "Total Revenue", value: 54230, change: 12.5, isPositive: true, prefix: "$" },
    users: { label: "Total Users", value: 1245, change: 5.2, isPositive: true, prefix: "" },
    orders: { label: "Orders", value: 342, change: -2.4, isPositive: false, prefix: "" },
    conversion: { label: "Conversion Rate", value: 4.3, change: 0.8, isPositive: true, prefix: "", suffix: "%" }
  };

  // 2. Mid Performance (Admin 15-day or User 30-day)
  const dataMid = {
    revenue: { label: "Total Revenue", value: 28450, change: 8.2, isPositive: true, prefix: "$" },
    users: { label: "Total Users", value: 612, change: 3.1, isPositive: true, prefix: "" },
    orders: { label: "Orders", value: 180, change: 1.2, isPositive: true, prefix: "" },
    conversion: { label: "Conversion Rate", value: 3.8, change: 0.2, isPositive: true, prefix: "", suffix: "%" }
  };

  // 3. Low/Current Performance (7-day stats or standard user views)
  const dataLow = {
    revenue: { label: "Total Revenue", value: 542, change: 14.5, isPositive: true, prefix: "$" },
    users: { label: "Total Users", value: 124, change: 4.2, isPositive: true, prefix: "" },
    orders: { label: "Orders", value: 34, change: -1.4, isPositive: false, prefix: "" },
    conversion: { label: "Conversion Rate", value: 3.3, change: 0.4, isPositive: true, prefix: "", suffix: "%" }
  };

  // Simulate Network Latency
  await delay(2000);

  // --- LOGIC GATE ---

  // Logic for ADMIN
  if (role === "admin") {
    if (range === "30day") return NextResponse.json(dataHigh);
    if (range === "15day") return NextResponse.json(dataMid);
    if (range === "7day")  return NextResponse.json(dataLow);
  }

  // Logic for USER
  if (role === "user") {
    if (range === "30day") return NextResponse.json(dataMid); // Users see "Mid" for their 30-day view
    if (range === "15day") return NextResponse.json(dataLow);
    if (range === "7day")  return NextResponse.json({ ...dataLow, revenue: { ...dataLow.revenue, value: 150 } }); // Specific low-tier
  }

  // Fallback
  return NextResponse.json(dataLow);
}