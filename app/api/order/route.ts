// app/api/order/route.ts
import { NextResponse } from 'next/server';
import { monthlyData } from '@/lib/mock-data';
import { getScaleFactor, applyScale } from '@/lib/data-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const range = searchParams.get('range') || "30day";
  const role = searchParams.get('role') || "admin"; // Default to admin if role is missing
  
  const factor = getScaleFactor(range, role);

  const data = monthlyData.map((item, index) => ({
    month: item.month,
    // We apply the combined (Range * Role) factor here
    revenue: applyScale(item.revenue, factor, index),
    orders: applyScale(item.orders, factor, index),
  }));

  return NextResponse.json(data);
}