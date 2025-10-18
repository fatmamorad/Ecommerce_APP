import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { init } from "next/dist/compiled/webpack/webpack";
import { toast } from "sonner";
interface codeType{
    code:number,
    message:string,
    statusMsg:string
}
const initialState: codeType = {
 code:1,
 message:"",
statusMsg:""
};
