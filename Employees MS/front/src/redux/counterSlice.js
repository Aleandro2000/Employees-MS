import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 1000,
        liked: false
    },
    reducers: {
        increment: (state) => {
            if(!state.liked)
            {
                state.liked=true;
                state.value+=1;
            }
        }
    }
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;