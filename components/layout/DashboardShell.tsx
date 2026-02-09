
"use client"

import * as React from "react"
import { Menu, Bell, Search, LayoutDashboard, Users, ShoppingCart, Settings, TimerResetIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { useFilterStore } from "@/app/createstore/createStore"

export function DashboardShell({ children }: { children: React.ReactNode }) {
   const filters=useFilterStore((state)=>state.filters)
  const setFilters=useFilterStore((state)=>state.setFilters)
  const setClear=useFilterStore((state)=>state.setClear)
  

  return (
    <div className="flex min-h-screen w-full  bg-slate-50/50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r bg-white lg:block">
        <SidebarContent />
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <div className="relative   max-w-sm hidden md:block ">
              
                <Select onValueChange={(value)=> setFilters({range:value,role:filters["role"]})}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Filter By Date" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter By Date</SelectLabel>
          <SelectItem value="7day">Last 7 Days</SelectItem>
          <SelectItem value="15day">Last 15 Days</SelectItem>
        <SelectItem value="30day">Last 30 Days</SelectItem>
        
        </SelectGroup>
      </SelectContent>
    </Select>
   
            </div>
          </div>

          <div className="flex  items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </Button>
           
                 <Select onValueChange={(value)=> setFilters({range:filters["range"],role:value})}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a User" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter by Role</SelectLabel>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
        
        </SelectGroup>
      </SelectContent>
    </Select>
      <Button onClick={()=>setClear()} className="hidden w-full sm:block sm:w-auto bg-indigo-600 hover:bg-indigo-700">
          Reset
          </Button>
            </div>
           
         
        </header>

        {/* Responsive Content Container */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent() {
  return (
    <div className="flex h-full flex-col gap-4 py-6 px-4">
      <div className="flex items-center gap-2 px-2 pb-4">
        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">N</div>
        <span className="text-xl font-bold tracking-tight">Nexus UI</span>
      </div>
      <nav className="flex-1 space-y-1">
        <SidebarLink icon={<LayoutDashboard size={18} />} label="Overview" active />
        <SidebarLink icon={<Users size={18} />} label="Customers" />
        <SidebarLink icon={<ShoppingCart size={18} />} label="Orders" />
        <SidebarLink icon={<Settings size={18} />} label="Settings" />
      </nav>
    </div>
  )
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
      {icon} {label}
    </a>
  )
}