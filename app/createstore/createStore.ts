import { create } from 'zustand'

// Define types for state & actions
type Filters = {
    range:string,
    role:string,
}
interface FilterProps {
  filters:Filters;
  setFilters:(filter:Filters)=>void;
  setClear:()=>void;
  
}

// Create store using the curried form of `create`
export const useFilterStore = create<FilterProps>()((set) => ({
 filters:{
    range:"",
    role:"",

 },
 setFilters:(filter)=>set((state)=>({
    filters:{
        ...state.filters,
        ...filter
    }
 })),
 setClear:()=>set(()=>({
    filters:{
        range:"",
        role:"",
        }
    }))
  
}))