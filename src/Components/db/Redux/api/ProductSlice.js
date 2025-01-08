import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
    data: [],  // List of products
    status: "idle",  // Loading status
    meta: {  
      limit: 10,
      itemCount: 0,
      pageCount: 1,
      page: 1,
      hasPrevPage: false,
      hasNextPage: false,
    },
    error: null,
    loading: false,
    filters: {  // Store current filters
      categoryId: null,
      subCategoryId: null,
      minPrice: null,
      maxPrice: null,
      nameTm: null,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      page: 1,
      limit: 10,
    },
  };
  
// Create an async thunk for the GET request
// Action to fetch products with query parameters
export const getProducts = createAsyncThunk(
    "getProducts",
    async ({ categoryId, subCategoryId, minPrice, maxPrice, nameTm, sortBy, sortOrder, page, limit }) => {
      // Make sure to pass query params in the URL
      const response = await AxiosInstance.get('/product/all', {
        params: {
          categoryId,
          subCategoryId,
          minPrice,
          maxPrice,
          nameTm,
          sortBy,
          sortOrder,
          page,
          limit
        }
      });
      return response.data; // Return the data from the API
    }
  );
  
  
export const deleteCategory = createAsyncThunk("deleteCategory", async (body) => {
 try {
  console.log(body);
  
  const resp = await AxiosInstance.delete(`/category/remove?id=${body.id}`);
  console.log(resp.data);
  
  if(resp.data.message ==='Üstünlikli!'){

    const response = await AxiosInstance.get("/category/all");
    toast.success("Üstünlikli!")
    
    return response.data;
  }else{
    toast.error("Ýalňyşlyk!");

  }
 } catch (error) {
  toast.error(error.data);
  
 }
});
export const createCategory = createAsyncThunk(
  "createCategory",
  async (body) => {
    try {
      const resp = await AxiosInstance.post("/category/add", body);
      if(resp.data.message === 'Kategoriýa döredildi!'){
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/category/all");
        return response.data;
      }else{
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message)
    }
   
  }
);
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (body) => {
    try {
      console.log(body);

      const resp = await AxiosInstance.patch("/category/update", body);
      console.log(resp);
      
      if(resp.data.message === 'Üstünlikli!'){
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/category/all");
        return response.data;
      }else{
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message)
    }
   
  }
);
// Create the slice

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // Action to set the filters from the UI (e.g., form inputs)
        setFilters(state, action) {
          state.filters = { ...state.filters, ...action.payload };
        },
      },
    extraReducers: (builder) => {
      builder
        // Handle the getProducts async thunk
        .addCase(getProducts.pending, (state) => {
          state.status = "loading";
          state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.loading = false;
          state.data = action.payload.products; // Assuming the response has a 'products' field
          state.meta = action.payload; // Assuming the response has 'meta' for pagination info
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.status = "failed";
          state.loading = false;
          state.error = action.error.message;
        });
  
      // You can add additional cases for delete, create, and update if needed
    },
  });
  
export default ProductSlice.reducer;
