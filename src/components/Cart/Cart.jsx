import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { ProductConsumer } from "../../context";
import EmptyCart from "./EmptyCart";
import { states } from "../../state";
import { parseCurrency } from "../../helpers/utilities";

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
    const delivery = state === "FCT - Abuja" ? 500 : 2500;
    const publicKey = process.env.REACT_APP_PAYSTACK_PUBLICKEY;

    return (
      <section className="cart">
        <ProductConsumer>
          {(value) => {
            const { cart, cartTotal, cartSubTotal } = value;
            const paystackProps = {
              email,
              amount: (cartTotal + delivery) * 100,
              metadata: { name, phone },
              publicKey: publicKey,
              text: "Pay Now",
              onSuccess: () =>
                alert("Thanks for doing business with us! Come back soon!!"),
              onClose: () => alert("Something went wrong"),
            };

            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <h5 className="text-center my-2">
                    <span>Subtotal: </span> {parseCurrency(cartSubTotal)}
                  </h5>
                  <div>
                    <h3
                      style={{ textAlign: "center", color: "#000" }}
                      className="my-4"
                    >
                      Proceed To Checkout
                    </h3>
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
                                {states.map((state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <CartTotals
                    value={value}
                    history={this.props.history}
                    state={state}
                    paystackProps={paystackProps}
                    delivery={delivery}
                  />
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
