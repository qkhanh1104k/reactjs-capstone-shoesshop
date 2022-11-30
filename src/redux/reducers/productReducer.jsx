import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../util/config";

const initialState = {
  arrProduct: [],
  productDetail: {},
  dataCarousel: [
    {
      "id": 1,
      "name": "Adidas Prophere",
      "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      "image": "https://shop.cyberlearn.vn/images/adidas-prophere.png"
    },
    {
      "id": 2,
      "name": "Adidas Swift Run",
      "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      "image": "https://shop.cyberlearn.vn/images/adidas-swift-run.png"
    },
    {
      "id": 3,
      "name": "Adidas Ultraboost 4",
      "shortDescription": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
      "image": "https://shop.cyberlearn.vn/images/adidas-ultraboost-4.png"
    },
  ],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setArrProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    setProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    changeProductQntAction: (state, action) => {
      const { prodId, increOrDecre } = action.payload;
      if (prodId === state.productDetail.id) {
        if (increOrDecre) {
          state.productDetail.quantity += 1;
        } else {
          state.productDetail.quantity -= 1;
        }
      }
    },
    getProductByKwdAction: (state, action) => {
      state.arrProduct = action.payload;
    },
  },
});

export const {
  setArrProductAction,
  setProductDetailAction,
  getProductByKwdAction,
  changeProductQntAction,
} = productReducer.actions;

export default productReducer.reducer;

// ------------ action thunk (api) ----------------

export const getProductApi = () => {
  return async (dispatch) => {
    try {
      //call api
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      //Lấy dữ liệu về đưa lên redux
      const action = setArrProductAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductDetailApiAction = (productId) => {
  return async (dispatch) => {
    // call api
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`,
        method: "GET",
      });

      const action = setProductDetailAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductByKwdApiAction = (keyword) => {
  return async (dispatch) => {
    // call api
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
        method: "GET",
      });

      const action = getProductByKwdAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
