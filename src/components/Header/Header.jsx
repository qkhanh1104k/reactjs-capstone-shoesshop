import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/Logo.png";
import {
  ACCESS_TOKEN,
  clearCookie,
  clearLocalStorage,
  USER_LOGIN,
} from "../../util/config";

export default function Header() {
  const { cart } = useSelector((state) => state.cartReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const renderUserNavLink = () => {
    if (userLogin) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link " to="/profile" aria-current="page">
              Hello {userLogin.email}!
            </NavLink>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => {
                clearLocalStorage(USER_LOGIN);
                clearLocalStorage(ACCESS_TOKEN);
                clearCookie(ACCESS_TOKEN);

                window.location.href = "/";
              }}
            >
              Log out
            </span>
          </li>
        </>
      );
    }
    return (
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
    );
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark header">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} />
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div
        className="collapse navbar-collapse header_right"
        id="collapsibleNavId"
      >
        <form className="d-flex my-2 my-lg-0">
          <NavLink className="nav-link " to="/search" aria-current="page">
            <i
              class="fa fa-search-plus"
              style={{ color: "white", fontSize: "25px", marginTop: "4px" }}
            ></i>
            <button
              className="my-2 my-sm-0 search_header"
              type="submit"
              style={{
                background: "transparent",
                border: "none",
                marginLeft: "5px",
              }}
            >
              Search
            </button>
          </NavLink>
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link " to="/carts" aria-current="page">
                <i class="fa fa-cart-plus"></i> (
                {cart.reduce(
                  (totalQnt, prodInCart) => (totalQnt += prodInCart.quantity),
                  0
                )}
                )
              </NavLink>
            </li>
            {renderUserNavLink()}
            <li className="nav-item">
              <NavLink className="nav-link " to="/register" aria-current="page">
                Register
              </NavLink>
            </li>
          </ul>
        </form>
      </div>
    </nav>
  );
}
