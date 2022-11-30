import { Carousel } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import { getProductApi } from "../../redux/reducers/productReducer";
import CarouselShoes from "../../components/Carousel/CarouselShoes"
export default function Home() {
  //Lấy dữ liệu từ redux
  const { arrProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getProductApi();
    dispatch(action);
  }, []);
  return (
    <div className="container">
      
      <div className="container">
      <CarouselShoes/>
        </div>
      <div className="ProductFeature">
        <div className="ProductText">
          <h3>Product Feature</h3>
        </div>
      </div>
      
      <div className="row">
        {arrProduct?.map((prod, index) => {
          return (
            <div className="col-4 mt-2" key={prod.id}>
              <Product product={prod} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
