import { NextResponse } from 'next/server';
import { userData } from '@/lib/mock-data';
import { getScaleFactor, applyScale } from '@/lib/data-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // 1. Get both params
  const range = searchParams.get('range') || "30day";
  const role = searchParams.get('role') || "admin";

  // 2. Get the combined multiplier (Range * Role)
  const factor = getScaleFactor(range, role);

  // 3. Map with index to ensure stable "randomness"
  const data = userData.map((item, index) => ({
    ...item,
    count: applyScale(item.count, factor, index),
  }));

  return NextResponse.json(data);
}