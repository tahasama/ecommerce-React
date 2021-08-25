import React from "react";
import { Row, Col, Image, ListGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { detailProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";

const ProductScreen = (props) => {
  const [qty, setqty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch(detailProduct);

  const productDetail = useSelector((state) => state.productDetail);
  const { error, loading, product } = productDetail;
  console.log("hhhhhhhhhhhhhhhhhhhhh", product.image);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success } = productReviewCreate;
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    console.log(props);
    if (success) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(props.match.params._id));
  }, [dispatch, props, success]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${props.match.params._id}?qty=${qty}`);
  };

  const submitCommentHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(props.match.params._id, { comment, rating }));
  };

  return (
    <div>
      <Link to="/">
        <Button
          className="my-3"
          variant="contained"
          color="default"
          disableElevation
        >
          Go back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image
                // src={window.location.origin + product.image}
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3 className="py-0">{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                      name="read-only"
                      value={Number(product.rating)}
                      readOnly
                    />
                  </Box>
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>$ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In stock" : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock && (
                  <ListGroup.Item>
                    <Row>
                      <Col className="py-3">Quantity:</Col>
                      <Col xs="auto" className="my-1">
                        <FormControl>
                          <Select
                            value={qty}
                            onChange={(e) => setqty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <div className="d-grid gap-2">
                    <Button
                      color="primary"
                      variant="contained"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Box component="fieldset" borderColor="transparent">
                      <Rating
                        name="read-only"
                        value={Number(review.rating)}
                        readOnly
                      />
                    </Box>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4>Write a review</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitCommentHandler}>
                      <Form.Group controlId="comment">
                        <Form.Label>Review</Form.Label>
                        <Form>
                          <Box
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                          >
                            <Rating
                              name="simple-controlled"
                              value={rating}
                              onChange={(event, newValue) => {
                                setRating(newValue);
                              }}
                            />
                          </Box>
                        </Form>
                        <Form.Control
                          as="textarea"
                          row="5"
                          style={{ border: "1px groove #888" }}
                          className="rounded"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit Comment
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
