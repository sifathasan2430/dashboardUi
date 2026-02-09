"use client"
import { DashboardShell } from "@/components/layout/DashboardShell"
import { KPICard } from "@/components/dashboard/KPICard"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { UserDistributionChart } from "@/components/dashboard/UserDistributionChart"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { TrafficSourceChart } from "@/components/dashboard/TrafficSourceChart"

import { useFilterStore } from "./createstore/createStore"

import { getData } from "./serverApi/api"
import { useQuery } from "@tanstack/react-query"
import { KPICardProps, StatsProps } from "./types/types"
import KpiCardSkeletons from "@/components/skeletons/KpiCardSkeletons"


export default function Dashboard() {
   const filters=useFilterStore((state)=>state.filters)
   
   
   const {data:stats,isLoading,isError,error,isFetching}=useQuery({
    queryKey:["stats",filters],
    queryFn:()=>getData<StatsProps[]>(`${process.env.NEXT_PUBLIC_API_URL}//api/stats`,filters),
   
    staleTime:5*60*1000, // 5 minutes
   })

 
 

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Section 1: Title & Main Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics Dashboard</h1>
            <p className="text-slate-500 font-medium">Monitoring period: Jan 1 - Feb 8, 2026</p>
          </div>
          <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>

        {/* Section 2: KPI Grid (1 col Mobile, 2 col Tablet, 4 col Laptop) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
     {
      isLoading && [1,2,3,4].map((i)=><KpiCardSkeletons key={i}/>)
     }
      {stats &&  stats.map((stat: KPICardProps) => (
        <KPICard 
          key={stat.value}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
          description={stat.description}
        />
      ))}
    </div>

        {/* Section 3: Charts (Stack on Mobile/Tablet, 2:1 ratio on Laptop) */}
       <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <RevenueChart />
          </div>
         
        </div>

        {/* Section 4: Advanced Insights */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
           <div className="lg:col-span-1">
            <UserDistributionChart />
          </div>
            <div className="lg:col-span-1">
                <TrafficSourceChart />
            </div>
           
        </div>
      </div>
    </DashboardShell>
  )
}