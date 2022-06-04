import { createSlice,current } from '@reduxjs/toolkit'

const initialState = []

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state,action) => {
      const exisit = state.find(item=>item._id===action.payload._id)
      if(exisit){
        return [{...exisit,count:exisit.count+1}]
      }else{
        const load = {...action.payload,count:1}
        state.push(load)
      }
    },
    deleteItem: (state,action) => {   
      return state.filter(item=>item._id!==action.payload._id)
    },
    increment: (state, action) => {
      const exisit = state.find(item=>item._id===action.payload._id)
      if(exisit){
        exisit.count += 1
      }
    },
    decrement: (state, action) => {
      const exisit = state.find(item=>item._id===action.payload._id)
      if(exisit && exisit.count>1){
        exisit.count -= 1
      }
    },
  },
})

export const { addItem, deleteItem, increment, decrement } = cartSlice.actions

export default cartSlice.reducer