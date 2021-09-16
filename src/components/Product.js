import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const Product = ({ product }) => {
  const imagUrl = "https://e-commerce-django-react.herokuapp.com";
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
        {/* <Card.Img src="https://e-commerce-django-react.herokuapp.com/media/"${product.image} /> */}
        <Card.Img src={`${imagUrl}${product.image}`} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="read-only"
                value={Number(product.rating)}
                readOnly
              />
            </Box>
          </div>
        </Card.Text>
        <Card.Text as="h3">$ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
