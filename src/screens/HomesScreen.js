import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { listProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Paginate from "../components/paginate";
import ProductCarousel from "../components/ProductCarousel";
import FetchRandomUser from "../components/FetchRandomUser";

const HomesScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  console.log("my products : ", products);
  let keyword = location.search;

  useEffect(() => {
    dispatch(listProduct(keyword));
  }, [dispatch, keyword]);
  return (
    <div>
      {/* <FetchRandomUser /> */}
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
};

export default HomesScreen;
