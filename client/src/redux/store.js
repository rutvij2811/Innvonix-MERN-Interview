import {configureStore} from "@reduxjs/toolkit";
import FaqReducer from "./features/faqSlice";
import UserReducer from "./features/userSlice";
export default configureStore({
    reducer:{
        faq: FaqReducer,
        user: UserReducer,
    },
});