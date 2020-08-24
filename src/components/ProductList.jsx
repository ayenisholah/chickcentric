import React, { Component } from "react";
// import axios from "axios";
import Product from "./Product";
import Title from "./Title";
import styled from "styled-components";
import { ProductConsumer } from "../context";
export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductWrapper className="py-5">
          <div className="container" style={{ fontWeight: "1.2rem" }}>
            <Title name="our" title="collections" />
            <div className="column">
              <ProductConsumer>
                {(value) => {
                  let products = value.products;
                  let categories = new Set();

                  products.forEach((item) => categories.add(item.category));

                  categories = Array.from(categories);

                  return categories.map((item) => {
                    return (
                      <section key={item}>
                        <h4
                          className="text-left px-3"
                          style={{ color: "#000" }}
                        >
                          {item.toUpperCase()}
                        </h4>
                        <div className="row">
                          {products
                            .filter((product) => {
                              return product.category === item;
                            })
                            .map((product) => {
                              return (
                                <Product key={product._id} product={product} />
                              );
                            })}
                        </div>
                      </section>
                    );
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
