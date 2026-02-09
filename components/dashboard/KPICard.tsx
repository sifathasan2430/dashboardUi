import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

import { KPICardProps } from "../../app/types/types";

export function KPICard({ title, value, description, trend }: KPICardProps) {
  const isPositive = trend > 0;

  return (
    <Card className="relative overflow-hidden border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md hover:border-slate-300/80">
      {/* Subtle Background Accent */}
      <div className={cn(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-[0.03] blur-2xl",
        isPositive ? "bg-emerald-500" : "bg-rose-500"
      )} />
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500/80">
            {title}
          </p>
          <div className={cn(
            "rounded-lg p-2",
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            <Activity size={16} />
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </h3>
            <p className="mt-1 text-xs font-medium text-slate-400">
              {description}
            </p>
          </div>

          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold",
            isPositive ? "bg-emerald-100/50 text-emerald-700" : "bg-rose-100/50 text-rose-700"
          )}>
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(trend)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}