import { createSlice } from "@reduxjs/toolkit";
import { DataType } from "../types/DataType";
import dayjs from "dayjs";

const initialState: () => DataType[] = function () {
  const storedValue: DataType[] = JSON.parse(localStorage.getItem("data")!);
  const initialValue = storedValue
    ? storedValue.map((value) => {
        return { ...value, birthday: dayjs(value.birthday) };
      })
    : [];
  return initialValue;
};
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    submit(state, action) {
      const getId = state.map((value) => value.id!);
      if (getId.includes(action.payload.id)) {
        console.log("update");
        const updatedData = state.map((value) =>
          value.id === action.payload.id
            ? { ...value, ...action.payload }
            : value
        );
        return updatedData;
      }
      const id = state.length === 0 ? 1 : Math.max(...getId) + 1;
      const updatedObj = { ...action.payload, id };
      return [...state, updatedObj];
    },
    deleted(
      state,
      action: {
        payload: number[] | React.Key[];
      }
    ) {
      const updatedState = state.filter(
        (value) => !action.payload.includes(value.id!)
      );
      return updatedState;
    },
  },
});
export const { submit, deleted } = dataSlice.actions;
export default dataSlice.reducer;
