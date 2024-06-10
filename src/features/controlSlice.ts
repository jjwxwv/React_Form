import { createSlice } from "@reduxjs/toolkit";
import { DataType } from "../types/DataType";

const initialState: DataType = {
  id: null,
  title: null,
  firstname: null,
  lastname: null,
  birthday: null,
  nationality: null,
  citizen1: null,
  citizen2: null,
  citizen3: null,
  citizen4: null,
  citizen5: null,
  gender: null,
  country: null,
  phoneNo: null,
  passportNo: null,
  salary: null,
};

const controlSlice = createSlice({
  name: "controlState",
  initialState,
  reducers: {
    change(state, action) {
      return { ...state, ...action.payload };
    },
    reset(state) {
      console.log("reset");
      return { ...state, ...initialState };
    },
  },
});
export const { change, reset } = controlSlice.actions;
export default controlSlice.reducer;
