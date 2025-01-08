import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./ReduxSlice";
import SubCategoryReducer from "./SubCategorySlice";
import ProductReducer from "./ProductSlice";
import SizeReducer from "./SizeSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    subcategory: SubCategoryReducer,
    product: ProductReducer,
    size: SizeReducer,
  },
});
