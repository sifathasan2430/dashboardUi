// src/components/dashboard/UserDistributionChart.tsx
"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { userData } from "@/lib/mock-data"
import { useFilterStore } from "@/app/createstore/createStore"
import { getData } from "@/app/serverApi/api"
import { useQuery } from "@tanstack/react-query"
import { UserProps } from "@/app/types/types"

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
       const filters=useFilterStore((state)=>state.filters)
  const {data:user,isLoading,isError,error}=useQuery({
      queryKey:["user",filters],
      queryFn:()=>getData<UserProps[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/user`,filters),
     
      staleTime:5*60*1000, 
     })
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
console.log(user,'this is user data')
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
            data={isLoading?userData:user}
            dataKey="count"
            nameKey="type"
            innerRadius={60}
            strokeWidth={5}
          >
            {user?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ChartContainer>
    </div>
  )
}