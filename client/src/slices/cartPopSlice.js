import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show:false,
    hide:true
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        show: (state) => {
            if(state.show){
                return
            }
            if(state.show===''){
                return
            }
            state.show = true
        },
        hide: (state) => {
            state.show = ''
        },
    }
})

export const { show,hide } = popupSlice.actions

export default popupSlice.reducer