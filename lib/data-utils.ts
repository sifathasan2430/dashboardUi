export const getScaleFactor = (range: string, role: string) => {
  // 1. Time-based scaling
  let rangeFactor = 1.0;
  if (range === "15day") rangeFactor = 0.5;
  if (range === "7day") rangeFactor = 0.25;

  // 2. Role-based scaling
  // Admin sees 100%, Manager sees 60% of total volume
  let roleFactor = role === "admin" ? 1.0 : 0.6;

  return rangeFactor * roleFactor;
};

export const applyScale = (value: number, factor: number, index: number) => {
  // Use index to keep the "randomness" stable per month
  const stableVariation = 0.9 + ((index % 3) * 0.1); 
  const result = Math.floor(value * factor * stableVariation);
  
  // Fallback to ensure we don't show 0 if there's actual data
  return result <= 0 && value > 0 ? Math.ceil(value * factor) : result;
};