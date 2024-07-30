import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";
import { ThemeConsumer } from "./context/ThemeContexts";
import ProductLoader from "../ProducLoader";

class ProductList extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    const { loading } = this.state;

    return (
      <ThemeConsumer>
        {({ theme, themes }) => (
          <ProductConsumer>
            {(value) =>
              value.products.length > 0 ? (
                <div
                  className={`py-5 ${themes[theme].background}`}
                >
                  <div className="container">
                    <Title className="text-light" name="our" title="products" />
                    <div className="row">
                      {loading ? (
                        <div className="col-12 d-flex justify-content-center align-items-center">
                          <ProductLoader />
                        </div>
                      ) : (
                        value.products.map((product) => (
                          <Product key={product.id} product={product} />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`py-5 ${themes[theme].background}`}
                >
                  <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-primary">
                      <p style={{ color: "red" }}>Sorry, no results found!</p>
                    </div>
                    <div className="col-10 mx-auto text-center text-title text-primary">
                      <p style={{ color: "black" }}>
                        Please check the spelling or try searching for something
                        else
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          </ProductConsumer>
        )}
      </ThemeConsumer>
    );
  }
}

export default ProductList;
