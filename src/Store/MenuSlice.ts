import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Menu } from "../types";
import axios from "axios";

type MenuState = {
  menuData: Menu[];
  loading: boolean;
  error: string | null;
};

const initialState: MenuState = {
  menuData: [],
  loading: false,
  error: null,
};

// ✅ Get data from API
export const getAllMenuData = createAsyncThunk("getAllMenuData", async () => {
  const menuData = await axios.get<Menu[]>(
    "https://68e3e5f38e116898997a5f72.mockapi.io/items"
  );

  const allMenuData = menuData.data.map((item) => ({
    id: item.id, // خليه زي ما هو string عشان MockAPI
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    category: item.category,
  }));

  return allMenuData;
});

// ✅ Add new menu item
export const addMenuItem = createAsyncThunk(
  "menu/addMenuItem",
  async (newItem: Omit<Menu, "id">) => {
    const response = await axios.post<Menu>(
      "https://68e3e5f38e116898997a5f72.mockapi.io/items",
      newItem
    );
    return response.data;
  }
);

// ✅ Update menu item
export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async (updatedItem: Menu) => {
    const response = await axios.put<Menu>(
      `https://68e3e5f38e116898997a5f72.mockapi.io/items/${updatedItem.id.toString()}`,
      updatedItem
    );
    return response.data;
  }
);

// ✅ Delete menu item
export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (id: number | string) => {
    await axios.delete(
      `https://68e3e5f38e116898997a5f72.mockapi.io/items/${id.toString()}`
    );
    return id;
  }
);

// ✅ Slice
const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Get all
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
        state.error = action.error.message ?? "Unknown error";
      })

      // ✅ Add item
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.menuData.push(action.payload);
      })

      // ✅ Update item
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.menuData.findIndex(
          (item) => String(item.id) === String(action.payload.id)
        );
        if (index !== -1) {
          state.menuData[index] = action.payload;
        }
      })

      // ✅ Delete item
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.menuData = state.menuData.filter(
          (item) => String(item.id) !== String(action.payload)
        );
      });
  },
});

export default MenuSlice.reducer;
