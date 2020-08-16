import React, { Component } from "react";
import axios from "axios";
import Product from "./Product";
import Title from "./Title";
import styled from "styled-components";
import { ProductConsumer } from "../context";
export default class ProductList extends Component {
  state = {
    products: [],
  };
  componentDidMount() {
    this.setProducts();
  }

  setProducts = async () => {
    let products = [];

    let { data } = await axios.get(
      "https://lit-sands-58479.herokuapp.com/api/product",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzMxNmRkOWFjMWZjMDAxN2IzYTgzNCIsImlhdCI6MTU5NzIzNTg3NCwiZXhwIjoxNjA1ODc1ODc0fQ.EcgTyioeNG7fOh2Q8DsNz3DhVw5RDFCSQeIVqQwO1ok",
        },
      }
    );

    data.data.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });

    this.setState(() => {
      return { products };
    }, this.checkCartItems);
  };

  render() {
    return (
      <React.Fragment>
        <ProductWrapper className="py-5">
          <div className="container" style={{ fontWeight: "1.2rem" }}>
            <Title name="our" title="collections" />
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map((product) => {
                    return <Product key={product._id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </ProductWrapper>
      </React.Fragment>
    );
  }
}

const ProductWrapper = styled.section``;
