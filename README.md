# Redux Toolkit


#### Docs & Hero Icons

- [Redux Toolkit Docs](https://redux-toolkit.js.org/introduction/getting-started)
- [Hero Icons](https://heroicons.com/)


#### Install Redux Toolkit

```sh
npm install @reduxjs/toolkit react-redux
```


#### Setup Store & Provider

- [store/index.js](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/store/index.js)
- [index.js](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/index.js)


#### Setup Cart Slice

- [features/cartSlice.js](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/features/cartSlice.js)
- [store/index.js](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/store/index.js)


#### Access Store Value

- [components/Navbar.jsx](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/components/Navbar.jsx)
- [components/CartContainer.jsx](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/components/CartContainer.jsx)
- [App.jsx](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/App.jsx)


#### Clear Cart

- [features/cartSlice.js](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/features/cartSlice.js)
- [components/CartContainer.jsx](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/components/CartContainer.jsx)


#### Remove, Increase, Decrease, and Calculate Totals

- [features/cartSlice.js](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/features/cartSlice.js)
- [components/CartItem.jsx](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/components/CartItem.jsx)
- [App.jsx](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/App.jsx)


#### Async Functionality with createAsyncThunk

- [features/cartSlice.js](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/features/cartSlice.js)

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(error));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
```

- [App.jsx](https://github.com/whoinlee/React_ReduxToolkit/blob/main/src/App.jsx)

```js
import { calculateTotals, getCartItems } from './features/cart/cartSlice';

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
```

#### Options

```sh
npm install axios
```

- cartSlice.js

```js
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
```

#### The extraReducers "builder callback" notation

cart/cartSlice

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});
```
