import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Menu } from "../types";
import axios from "axios";


type DashboardMenuState = {
    menuData: Menu[];
    loading: boolean;
    error: string | null;
};

const initialState: DashboardMenuState = {
    menuData: [],
    loading: false,
    error: null,
};

export const getAllMenuData = createAsyncThunk("dashboard/getMenu",
    async ()=> {
        const allMenuData= await axios.get<Menu[]>("https://68e3e5f38e116898997a5f72.mockapi.io/items");
        return allMenuData.data
    }
)



const DashboardMenuSlice= createSlice({
    name:"dashboardMenu",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder 
        .addCase(getAllMenuData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllMenuData.fulfilled, (state, action) => {
            state.loading = false;
            state.menuData = action.payload;
        })
        .addCase(getAllMenuData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "Error fetching dashboard menu";
        });
    }
})


export default DashboardMenuSlice.reducer;
