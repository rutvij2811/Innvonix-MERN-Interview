import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";


export const getFaqs = createAsyncThunk("faqs/getFaqs", async ({authToken})=>{
    return fetch(
        "http://localhost:5000/api/faq/getfaq",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      ).then((res) => res.json());
});

export const deleteFaqs = createAsyncThunk("faqs/deleteFaqs", async ({authToken,id})=>{
    return fetch(
        `http://localhost:5000/api/faq/deletefaq/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          
        }
      ).then((res) => res.json());
});

export const updateFaqs = createAsyncThunk("faqs/updateFaqs", async ({authToken,id,question,answer,cat_name,cat_id})=>{
    return fetch(
        `http://localhost:5000/api/faq/updatefaq/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({
            question: question,
            answer:answer,
            cat_name:cat_name,
            cat_id:cat_id,
        }),
        }
      ).then((res) => res.json());
});

export const addFaq = createAsyncThunk("faqs/addFaq", async ({authToken,question,answer,cat_name,cat_id})=>{
    return fetch(
        `http://localhost:5000/api/faq/createfaq`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({
            question: question,
            answer:answer,
            cat_name:cat_name,
            cat_id:cat_id,
        }),
        }
      ).then((res) => res.json());
});

const faqSlice = createSlice({
    name:"faq",
    initialState:{
        faqs:[],
        loading:false
    },
    extraReducers:{
        [getFaqs.pending]:(state,action) =>{
            state.loading = true;
        },
        [getFaqs.fulfilled]:(state,action) => {
            state.loading = false;
            state.faqs = action.payload;
        },
        [getFaqs.rejected]: (state,action) =>{
            state.loading = false;
        },
        [deleteFaqs.pending]:(state,action) =>{
            state.loading = true;
        },
        [deleteFaqs.fulfilled]:(state,action) => {
            state.loading = false;
            state.faqs = action.payload;
        },
        [deleteFaqs.rejected]: (state,action) =>{
            state.loading = false;
        },
        [updateFaqs.pending]:(state,action) =>{
            state.loading = true;
        },
        [updateFaqs.fulfilled]:(state,action) => {
            state.loading = false;
            state.faqs = action.payload;
        },
        [updateFaqs.rejected]: (state,action) =>{
            state.loading = false;
        },
        [addFaq.pending]:(state,action) =>{
            state.loading = true;
        },
        [addFaq.fulfilled]:(state,action) => {
            state.loading = false;
            state.faqs = action.payload;
        },
        [addFaq.rejected]: (state,action) =>{
            state.loading = false;
        },
    }
});

export default faqSlice.reducer;