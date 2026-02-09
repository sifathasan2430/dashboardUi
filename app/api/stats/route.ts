import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // 1. Get Params with defaults
  // If role is missing in URL, it becomes an empty string ""
  const role = searchParams.get('role') || ""; 
  const range = searchParams.get('range') || "7day";

  // 2. Define our 3 Tiers of Data
  const dataHigh = {
    revenue: { label: "Total Revenue", value: 54230, change: 12.5, prefix: "$" },
    users: { label: "Total Users", value: 1245, change: 5.2 },
    orders: { label: "Orders", value: 342, change: -2.4 },
    conversion: { label: "Conversion Rate", value: 4.3, change: 0.8, suffix: "%" }
  };

  const dataMid = {
    revenue: { label: "Total Revenue", value: 28450, change: 8.2, prefix: "$" },
    users: { label: "Total Users", value: 612, change: 3.1 },
    orders: { label: "Orders", value: 180, change: 1.2 },
    conversion: { label: "Conversion Rate", value: 3.8, change: 0.2, suffix: "%" }
  };

  const dataLow = {
    revenue: { label: "Total Revenue", value: 542, change: 14.5, prefix: "$" },
    users: { label: "Total Users", value: 124, change: 4.2 },
    orders: { label: "Orders", value: 34, change: -1.4 },
    conversion: { label: "Conversion Rate", value: 3.3, change: 0.4, suffix: "%" }
  };

  // 3. The Logic Engine
  let selectedData;

  if (role === "admin") {
    // Admins see everything at full scale
    if (range === "30day") selectedData = dataHigh;
    else if (range === "15day") selectedData = dataMid;
    else selectedData = dataLow; // default for 7day or anything else
  } else {
    // If role is "" or "user", they see lower-tier data
    if (range === "30day") selectedData = dataMid;
    else if (range === "15day") selectedData = dataLow;
    else {
      // Smallest data set for a Guest/User at 7 days
      selectedData = {
        ...dataLow,
        revenue: { ...dataLow.revenue, value: 120 },
        users: { ...dataLow.users, value: 12 }
      };
    }
  }

  // 4. Format into the Array for your re-usable KPICard
  const formattedResponse = [
    {
      title: selectedData.revenue.label,
      value: `${selectedData.revenue.prefix}${selectedData.revenue.value.toLocaleString()}`,
      trend: selectedData.revenue.change,
      description: `vs last ${range}`
    },
    {
      title: selectedData.users.label,
      value: selectedData.users.value.toLocaleString(),
      trend: selectedData.users.change,
      description: "new signups"
    },
    {
      title: selectedData.orders.label,
      value: selectedData.orders.value.toLocaleString(),
      trend: selectedData.orders.change,
      description: "completed orders"
    },
    {
      title: selectedData.conversion.label,
      value: `${selectedData.conversion.value}%`,
      trend: selectedData.conversion.change,
      description: "conversion rate"
    }
  ];

  return NextResponse.json(formattedResponse);
}