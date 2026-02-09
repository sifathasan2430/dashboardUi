import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function KpiCardSkeleton() {
  return (
    <Card className="relative overflow-hidden border-slate-200/60 bg-white shadow-sm">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          {/* Title Placeholder */}
          <Skeleton className="h-4 w-24 bg-slate-100" />
          {/* Icon Placeholder */}
          <Skeleton className="h-8 w-8 rounded-lg bg-slate-100" />
        </div>

        {/* Main Content Section */}
        <div className="mt-4 flex items-baseline justify-between">
          <div className="space-y-2">
            {/* Value (Big Number) Placeholder */}
            <Skeleton className="h-9 w-32 bg-slate-200" />
            {/* Description Placeholder */}
            <Skeleton className="h-3 w-20 bg-slate-100" />
          </div>

          {/* Trend Pill Placeholder */}
          <Skeleton className="h-6 w-12 rounded-full bg-slate-100" />
        </div>
      </CardContent>
    </Card>
  );
}