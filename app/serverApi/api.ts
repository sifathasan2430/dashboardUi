import axios from "axios";
import { Filters } from "../createstore/createStore";












export async function getData<T>(url: string, filter: Filters): Promise<T> {
    const response = await axios.get<T>(url, {
        params: filter
    });
    return response.data;
}