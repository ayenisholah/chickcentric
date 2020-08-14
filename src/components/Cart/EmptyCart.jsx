import React from "react";

export default function EmptyCart() {
  return (
    <div className="container mt-20" style={{ minHeight: "500px" }}>
      <div className="row">
        <div className="col-10 mx-auto text-center text-title text-capitalize">
          <h1>your cart is currently empty</h1>
        </div>
      </div>
    </div>
  );
}
