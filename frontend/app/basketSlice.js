import {createSlice, configureStore} from '@reduxjs/toolkit';

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: [],
        totalPrice: 0,
    },
    reducers: {
        addToBasket (state, action) {
            const index = state.items.findIndex(elem => elem.id === action.payload.id);
            if (index >= 0) {
                state.items[index].quantity += 1;
            } else {
                const newItem = action.payload;
                newItem.quantity = 1;
                state.items.push(newItem);
            }
            state.totalPrice = state.totalPrice + action.payload.priceInDollar;
        },

        removeFromBasket (state, action) {
            const index = state.items.findIndex(elem => elem.id === action.payload.id);
            if (index >= 0) {
                if (state.items[index].quantity > 1) {
                    state.items[index].quantity -= 1;
                } else {
                    state.items = state.items.filter((elem, i) => {
                        return i !== index;
                    });
                }
                state.totalPrice = state.totalPrice - action.payload.priceInDollar;
            }
        },
        removeItemFromBasket (state, action) {
            const index = state.items.findIndex(elem => elem.id === action.payload.id);
            if (index >= 0) {
                state.totalPrice = state.totalPrice - action.payload.priceInDollar*state.items[index].quantity;
                state.items = state.items.filter((elem, i) => {
                    return i !== index;
                })
            }
        },

        resetBasket (state, action) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const {addToBasket, removeFromBasket, removeItemFromBasket, resetBasket} = basketSlice.actions;

export const store = configureStore({
    reducer: basketSlice.reducer
})
//export default basketSlice.reducer;
