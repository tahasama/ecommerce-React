import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { useState } from "react";

function Header() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const showHideDropdown1 = (e) => {
    setShow1(!show1);
  };
  const showHideDropdown2 = (e) => {
    setShow2(!show2);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <LinkContainer to="/cart" style={{ marginRight: "30px" }}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart "></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  show={show1}
                  onMouseEnter={showHideDropdown1}
                  onMouseLeave={showHideDropdown1}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item id="navbarScrollingDropdown">
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item
                    id="navbarScrollingDropdown"
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="navbarScrolling"
                  show={show2}
                  onMouseEnter={showHideDropdown2}
                  onMouseLeave={showHideDropdown2}
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item id="navbarScrollingDropdown">
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item id="navbarScrollingDropdown">
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item id="navbarScrollingDropdown">
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
