import React, { Component } from "react";
import { PaystackButton } from "react-paystack";

import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { ProductConsumer } from "../../context";
import EmptyCart from "./EmptyCart";

export default class Store extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { name, phone, email, address, city, state } = this.state;

    return (
      <section className="cart">
        <ProductConsumer>
          {(value) => {
            console.log("value", value);
            const { cart, cartTotal } = value;
            const paystackProps = {
              email,
              amount: cartTotal * 100,
              metadata: { name, phone },
              publicKey: "pk_live_48b102f71299b0e91c6cc26a0145d28004e1041a",
              text: "Pay Now",
              onSuccess: () =>
                alert("Thanks for doing business with us! Come back soon!!"),
              onClose: () => alert("Wait! You need this oil, don't go!!!!"),
            };

            console.log("paystack props", paystackProps);

            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                  <div>
                    <h1 style={{ textAlign: "center" }}>Checkout</h1>
                    <div className="container">
                      <div className="row px-3">
                        <form className="mx-auto">
                          <div className="form-group ">
                            <label>Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex John Doe"
                              name="name"
                              onChange={this.handleChange}
                              value={name}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              onChange={this.handleChange}
                              value={email}
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="Phone Number"
                              name="phone"
                              onChange={this.handleChange}
                              value={phone}
                            />
                          </div>
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="1234 Main St"
                              name="address"
                              onChange={this.handleChange}
                              value={address}
                            />
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>City</label>
                              <input
                                type="text"
                                className="form-control"
                                name="city"
                                onChange={this.handleChange}
                                value={city}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label>State</label>
                              <select
                                className="form-control"
                                name="state"
                                onChange={this.handleChange}
                                value={state}
                              >
                                <option defaultValue>Choose...</option>
                                <option>...</option>
                              </select>
                            </div>
                          </div>
                          <PaystackButton
                            className="paystack-button"
                            {...paystackProps}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
