import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { parseCurrency } from "../../helpers/utilities";

export default class CartTotals extends Component {
  render() {
    const {
      cartSubTotal,
      cartTax,
      cartTotal,
      cart,
      clearCart,
    } = this.props.value;
    const { paystackProps, delivery } = this.props;
    const emptyCart = cart.length === 0 ? true : false;
    return (
      <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 mx-auto text-capitalize text-center">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    clear cart
                  </button>
                </Link>
                <h5>
                  <span className="text-title"> subtotal :</span>
                  <strong>{parseCurrency(cartSubTotal)}</strong>
                </h5>
                <h5>
                  <span className="text-title"> vat :</span>
                  <strong>{parseCurrency(cartTax)}</strong>
                </h5>
                <h5>
                  <span className="text-title"> delivery :</span>
                  <strong>{parseCurrency(delivery)}</strong>
                </h5>
                <h5>
                  <span className="text-title"> total :</span>
                  <strong> {parseCurrency(cartTotal + delivery)} </strong>
                </h5>
                <PaystackButton
                  className="paystack-button text-center"
                  {...paystackProps}
                />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
