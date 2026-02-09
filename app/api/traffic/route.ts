import { NextResponse } from 'next/server';
import { trafficData } from '@/lib/mock-data';
import { getScaleFactor, applyScale } from '@/lib/data-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // 1. Extract both search parameters
  const range = searchParams.get('range') || "30day";
  const role = searchParams.get('role') || "admin";

  // 2. Calculate the combined factor (Time * Role)
  const factor = getScaleFactor(range, role);

  // 3. Map the data using index for stable randomization
  const data = trafficData.map((item, index) => ({
    ...item,
    // Note: use 'visitors' as the key to match your original mock data
    visitors: applyScale(item.visitors, factor, index),
  }));

  return NextResponse.json(data);
}