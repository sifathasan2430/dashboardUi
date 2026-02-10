"use client"

import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
  LabelList,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { trafficData } from "@/lib/mock-data"
import { CardFooter,Card,CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { TrendingUp } from "lucide-react"
import { getData } from "@/app/serverApi/api"
import { useQuery } from "@tanstack/react-query"
import { useFilterStore } from "@/app/createstore/createStore"
import { TrafficProps } from "@/app/types/types"

const chartConfig = {
  organic: {
    label: "Organic",
    color: "hsl(var(--chart-1))",
  },
  paid: {
    label: "Paid",
    color: "hsl(var(--chart-2))",
  },
  social: {
    label: "Social",
    color: "hsl(var(--chart-3))",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function TrafficSourceChart() {
  const filters=useFilterStore((state)=>state.filters)
  const {data:traffic,isLoading,isError,error}=useQuery({
    queryKey:["traffic",filters],
    queryFn:()=>getData<TrafficProps[]>(`http://localhost:3000/api/traffic`,filters),
    staleTime:5*60*1000,
  })
 
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const totalVisitors = traffic && traffic?.reduce(
    (sum, item) => sum + item.visitors,
    0
  )

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      {/* Header */}
      <div className="pb-4">
        <h3 className="text-base font-semibold">Traffic Sources</h3>
        <p className="text-sm text-muted-foreground">
          Channel acquisition breakdown
        </p>
      </div>

      {/* Chart */}

       <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
       
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
     <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={isLoading ? trafficData : traffic}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
     
    </Card>
      

    
      <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
        { traffic?.map((item) => {
          const configKey = item.source as keyof typeof chartConfig

          return (
            <div key={item.source} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: chartConfig[configKey].color,
                }}
              /> 
              <span className="text-xs font-medium capitalize">
                {item.source}
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                {item.visitors}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
