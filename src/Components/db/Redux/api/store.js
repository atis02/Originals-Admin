import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./ReduxSlice";
import SubCategoryReducer from "./SubCategorySlice";
export const store = configureStore({
  reducer: {
    data: dataReducer,
    subcategory:SubCategoryReducer
  },
});
