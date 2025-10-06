import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { brandItem, Brands } from "image/types/Brands";
import { Category, Datum } from "image/types/Categories.type";
import { Product, ProductData } from "image/types/product.type";
interface StateType{
  id:string,
  name:string
}
interface ProductState {

  products: Product[];
  page: number;
  filterdProduct: Product[];
  cateory: {
    id:string ,
    name:string
  };
  brand: {
    id:string ,
    name:string
  };
  numberOfPages:number;
  allCategories: Datum[];
  allBrand: brandItem[];
  search: string;
  loading: boolean;
}
const initialState: ProductState = {
  page: 1,
  numberOfPages:1,
  products: [],
  allCategories: [],
  allBrand: [],
  filterdProduct: [],
  cateory:{
    id:"",name:"all"
  },
  brand: {
    id:"",name:"all"
  },
  search: "",
  loading: false,
};
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({page,brand,category}:{page:number,brand:string,category:string}) => {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=10&page=${page}`;

    // لو المستخدم مختار براند
    if (brand !== "all") {
      url += `&brand=${brand}`;
    }

    // لو المستخدم مختار كاتيجوري
    if (category !== "all") {
      url += `&category[in]=${category}`;
    }

    const res = await fetch(url);
    const data: ProductData = await res.json();

    return data;
  })

export const fetchAllBrands = createAsyncThunk("brands/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`);

  const data: Brands = await res.json();
  return data;
});
export const fetchAllCate= createAsyncThunk("Categories/fetch", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`);

  const data: Category = await res.json();
  return data;
});
const productSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<StateType>) => {
      state.cateory.name = action.payload.name;
      state.cateory.id=action.payload.id
    },
    setBrand: (state, action: PayloadAction<StateType>) => {
      state.brand.name = action.payload.name;
      state.brand.id=action.payload.id
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.filterdProduct = state.products.filter((p) => {
        p.title
          .toLocaleLowerCase()
          .includes(action.payload.toLocaleLowerCase());
      });
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductData>) => {
          state.loading = false;
          state.products = action.payload.data;
          state.numberOfPages=action.payload.metadata.numberOfPages
          state.filterdProduct = action.payload.data;
        }
      ).addCase(fetchAllBrands.fulfilled,(state,action:PayloadAction<Brands>)=>{state.allBrand=action.payload.data}
      ).addCase(fetchAllCate.fulfilled,(state,action:PayloadAction<Category>)=>{state.allCategories=action.payload.data}
      );
  },
});

export const { setCategory, setBrand, setSearch, setPage } =
  productSlice.actions;
export let FilterationReducer = productSlice.reducer;
