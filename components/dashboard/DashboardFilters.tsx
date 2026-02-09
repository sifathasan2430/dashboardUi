import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Download } from "lucide-react";

export function DashboardFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px] bg-white">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[150px] bg-white">
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="free">Free Tier</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm" className="hidden sm:flex">
        <Download className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
    </div>
  );
}