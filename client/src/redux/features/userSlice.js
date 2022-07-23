import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";

export const getUser = createAsyncThunk("user/login", async (data)=>{
    const {email, password} = data;
    // console.log(email,password)
    return fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }).then((res) => res.json()).then((res)=>res);
});

export const createUser = createAsyncThunk("user/create",async (data) =>{
    const {name, email, password} = data;
    return fetch(
        `http://localhost:5000/api/auth/createuser`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        }
    ).then((res) => res.json()).then((res)=>res);
});

export const changePass = createAsyncThunk("user/changepass", async (data)=>{
    const {password,new_password,authToken} = data;
    // console.log(email,password)
    return fetch("http://localhost:5000/api/auth/changepass/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        body: JSON.stringify({
            password: password,
            new_password:new_password,
        }),
    }).then((res) => res.json()).then((res)=>console.log(res));
});

const userSlice = createSlice({
    name:"user",
    initialState:{
        isLoggedIn: false,
        authToken:'',
        loading: false,
    },
    reducers:{
        logout: (state) =>{
            state.isLoggedIn = false;
            state.authToken = '';
        },
    },
    extraReducers:{
        [getUser.pending]:(state,action) =>{
            state.loading = true;
        },
        [getUser.fulfilled]:(state,action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.authToken = action.payload.authtoken;
        },
        [getUser.rejected]: (state,action) =>{
            state.loading = false;
        },
        [createUser.pending]:(state,action) =>{
            state.loading = true;
        },
        [createUser.fulfilled]:(state,action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.authToken = action.payload.authtoken;
        },
        [createUser.rejected]: (state,action) =>{
            state.loading = false;
        },
        [changePass.pending]:(state,action) =>{
            state.loading = true;
        },
        [changePass.fulfilled]:(state,action) => {
            state.loading = false;
            state.isLoggedIn = true;
        },
        [changePass.rejected]: (state,action) =>{
            state.loading = false;
        },
    }
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;
