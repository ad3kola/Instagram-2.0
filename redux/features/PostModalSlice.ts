import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:{
        postModalState: false
    }
} as InitialState

type InitialState = {
    value: {
        postModalState: boolean;
    }
}

const postmodalslice = createSlice({
    name: 'postmodal',
    initialState,
    reducers: {
        OpenPostModal: (state) => {
            state.value.postModalState = true;
        },
        ClosePostModal: () => {
            return initialState;
        }
    }
})


export const {OpenPostModal, ClosePostModal} = postmodalslice.actions;
export default postmodalslice.reducer;