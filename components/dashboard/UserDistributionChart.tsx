// src/components/dashboard/UserDistributionChart.tsx
"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { userData } from "@/lib/mock-data"

const chartConfig = {
  count: {
    label: "Users",
  },
  free: {
    label: "Free",
    color: "#94a3b8",
  },
  premium: {
    label: "Premium",
    color: "#6366f1",
  },
  enterprise: {
    label: "Enterprise",
    color: "#0f172a",
  },
} satisfies ChartConfig

export function UserDistributionChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm h-full">
      <div className="pb-4">
        <h3 className="font-semibold leading-none tracking-tight">User Distribution</h3>
        <p className="text-sm text-muted-foreground">By subscription tier</p>
      </div>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={userData}
            dataKey="count"
            nameKey="type"
            innerRadius={60}
            strokeWidth={5}
          >
            {userData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ChartContainer>
    </div>
  )
}