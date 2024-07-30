import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ThemeContext } from "./context/ThemeContexts";
import { FaRegMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { ProductConsumer } from "../context";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  static contextType = ThemeContext;

  // state = {
  //   selectedTheme: this.props.theme ? "Dark" : "Light",
  // };

  // handleSelect = (theme) => {
  //   this.setState({ selectedTheme: theme });
  // };


  handleSelect = (id) => {
    this.context.setThemeById(id);
  };

  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 768, // Adjust the breakpoint as needed
      menuOpen: false,
      selectedTheme: this.props.theme || "dark",
    };

    this.handleResize = this.handleResize.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({
      isMobile: window.innerWidth <= 768, // Adjust the breakpoint as needed
    });
  }

  handleMenu() {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    const { theme, toggleTheme, themes } = this.context;
    const { isMobile, menuOpen } = this.state;

    const { selectedTheme } = this.state;
    // const { theme } = this.props;

    return (
      <div>
        {isMobile ? (
          // Mobile View
          <MobileNavWrapper className="navbar nav-bar-expand-sm bg-slate-800 px-sm-5 w-100">
            <Link to="/" className="w-50">
              <img src={logo} alt="store" className="navbar-brand" />
            </Link>
            <div className="text-white w-50 menu" onClick={this.handleMenu}>
              <AiOutlineMenu className="menubar" />
            </div>
            {menuOpen && (
              <div className=" resmenu w-100 ">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "text-white hover"
                  }
                >
                  Products
                </NavLink>
                <ProductConsumer>
                  {(value) => (
                    <li
                      style={{
                        listStyleType: "none",
                      }}
                    >
                      <input
                        placeholder="Search for products"
                        onChange={(e) => {
                          value.filterProducts(e.target.value);
                        }}
                      ></input>
                    </li>
                  )}
                </ProductConsumer>
                <Link
                  className="text-white bg-transparent themes"
                  onClick={toggleTheme}
                >
                  {theme ? (
                    <h6>
                      Dark Mode <FaRegMoon />
                    </h6>
                  ) : (
                    <h6>
                      Light Mode <GoSun />
                    </h6>
                  )}
                </Link>
                <Link to="/cart" className="ml-auto">
                  <ButtonContainer>
                    <i className="fas fa-cart-plus">my cart</i>
                  </ButtonContainer>
                </Link>
              </div>
            )}
          </MobileNavWrapper>
        ) : (
          // Desktop View
          <DesktopNavWrapper className="navbar nav-bar-expand-sm bg-slate-800 px-sm-5">
            <Link to="/">
              <img src={logo} alt="store" className="navbar-brand" />
            </Link>
            <ul className="navbar-nav align-items-center">
              <li className="nav-item ml-5">
                <Link to="/" className="nav-link">
                  Products
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav align-items-center">
              <ProductConsumer>
                {(value) => (
                  <li className="nav-item ml-5">
                    <div className="input-field">
                      <input
                        placeholder="Search for products"
                        onChange={(e) => {
                          value.filterProducts(e.target.value);
                        }}
                      ></input>
                      <FaSearch color="grey" />
                    </div>
                  </li>
                )}
              </ProductConsumer>
            </ul>
            <Link to="/cart" className="ml-auto">
              <ButtonContainer>
                <i className="fas fa-cart-plus"> my cart</i>
              </ButtonContainer>
            </Link>
            <div
              className="text-white bg-transparent themes mainmenu"
              onClick={toggleTheme}
            >
              <div className="text-white bg-transparent themes mainmenu">
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary">
                    {theme}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    {Object.entries(themes).map(([key, value]) => (
                      <a
                        key={value.id}
                        className="dropdown-item"
                        href="#"
                        onClick={() => this.handleSelect(value.id)}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* {theme ? <FaRegMoon /> : <GoSun />} */}
            </div>
          </DesktopNavWrapper>
        )}
      </div>
    );
  }
}

const NavWrapper = styled.nav`
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

const MobileNavWrapper = styled(NavWrapper)`
  /* Add mobile-specific styles here */
`;

const DesktopNavWrapper = styled(NavWrapper)`
  /* Add desktop-specific styles here */
`;

export default Navbar;
