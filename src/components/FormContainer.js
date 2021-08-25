import React from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Container,
} from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
