import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total:0,
  count:0,
  items:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state,action) => {
      const exisit = state.items.find(item=>item._id===action.payload._id)
      if(exisit){
        state.count += 1
        state.total += +action.payload.price
        const arrayCopy = state.items.map(item=>item._id===action.payload._id?{...item,count:item.count+1}:item)
        state.items = arrayCopy
      }else{
        state.count += 1
        state.total += +action.payload.price
        const payload = {...action.payload,count:1}
        state.items.push(payload)
      }
    },
    deleteItem: (state,action) => {  
      state.count -= action.payload.count
      state.total -= action.payload.price * action.payload.count
      const newItems = state.items.filter(item=>item._id!==action.payload._id)
      state.items = newItems
    },
    increment: (state, action) => {
      const exisit = state.items.find(item=>item._id===action.payload._id)
      if(exisit){
        state.count += 1
        state.total += +action.payload.price
        exisit.count += 1
      }
    },
    decrement: (state, action) => {
      const exisit = state.items.find(item=>item._id===action.payload._id)
      if(exisit && exisit.count>1){
        exisit.count -= 1
        state.total -= action.payload.price
        state.count -= 1
      }
    },
  },
})

export const { addItem, deleteItem, increment, decrement } = cartSlice.actions

export default cartSlice.reducer