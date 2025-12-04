import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type ResetUserState = {
  id: string| null;
  
};


const initialState: ResetUserState = {
  id: null,

};


const resetSlice = createSlice({
  name: "resetuser",
  initialState,
  reducers: {
    // تعيين بيانات المستخدم
    setresetuser: (state, action: PayloadAction<ResetUserState>) => {
      state.id = action.payload.id;
    
    },
    // مسح بيانات المستخدم
    clearresetuser: (state) => {
      state.id = null;
    },
  },
});

// تصدير الـ actions و الـ reducer
export const { setresetuser, clearresetuser } = resetSlice.actions;
export default resetSlice.reducer;
