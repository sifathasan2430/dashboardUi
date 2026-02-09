import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  description: string;
  trend: number;
}

export function KPICard({ title, value, description, trend }: KPICardProps) {
  const isPositive = trend > 0;

  return (
    <Card className="overflow-hidden border-slate-200/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="mt-1 flex items-center gap-1">
          <span className={cn(
            "flex items-center text-xs font-medium",
            isPositive ? "text-emerald-600" : "text-rose-600"
          )}>
            {isPositive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}