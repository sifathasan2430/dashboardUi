// src/components/dashboard/RevenueChart.tsx
"use client"

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { monthlyData } from "@/lib/mock-data"
import { TrendingUp } from "lucide-react"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function RevenueChart() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {/* Revenue Line Chart */}
       <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
          <CardDescription>Monthly revenue growth ($)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart 
              data={monthlyData} 
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tickLine={true} 
                axisLine={true} 
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
             <YAxis  domain={['auto', 'auto']} /> 
              
              <ChartTooltip content={<ChartTooltipContent />} />
              
              <Line
  type="monotone"
  dataKey="revenue"
  stroke="#6366f1"
  strokeWidth={2}
  dot={{ fill: "var(--color-revenue)", r: 4 }}
  activeDot={{ r: 6 }}
/>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card> 
   

      {/* Orders Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Per Month</CardTitle>
          <CardDescription>Total orders processed</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tickLine={true} axisLine={true} tickMargin={8} />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="orders" 
                fill="var(--color-orders)" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}