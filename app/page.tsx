"use client"
import { DashboardShell } from "@/components/layout/DashboardShell"
import { KPICard } from "@/components/dashboard/KPICard"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { UserDistributionChart } from "@/components/dashboard/UserDistributionChart"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { TrafficSourceChart } from "@/components/dashboard/TrafficSourceChart"

import { useFilterStore } from "./createstore/createStore"


export default function Dashboard() {
   const filters=useFilterStore((state)=>state.filters)
   console.log(filters)
   
   
  
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Revenue" value="$54,230" description="vs last month" trend={12.5} />
          <KPICard title="Total Users" value="1,245" description="active this week" trend={-2.1} />
          <KPICard title="Total Orders" value="342" description="processed" trend={8.2} />
          <KPICard title="Conversion" value="4.3%" description="visitor to lead" trend={1.1} />
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