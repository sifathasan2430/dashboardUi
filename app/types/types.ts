export interface KPICardProps {
  title: string;
  value: string;
  description: string;
  trend: number;
}
export interface TrafficProps {
    source: string;
    visitors: number;
    fill: string;
}

export interface StatsProps {
    title: string;
    value: string;
    trend: number;
    description: string;
}
export interface RevenueProps {
   month: string;
   revenue: number;
   orders: number;
}
export interface UserProps {
    
count: number;
    fill: string;
    type: string;
}

