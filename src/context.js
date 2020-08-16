import React, { Component } from "react";
import { getProductList } from "./helpers/utilities";
const ProductContext = React.createContext();

const detailProduct = {
  _id: "5f33dd50265e460017d618ba",
  title: "Black & red mix and match",
  imageUrl:
    "https://thechickcentric.blob.core.windows.net/products/The Chick Central 1.jpeg",
  price: 10,
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  inCart: false,
  count: 0,
  total: 0,
};

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = async () => {
    let products = [];

    let { data } = await getProductList();

    data.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });

    this.setState(() => {
      return { products };
    }, this.checkCartItems);
  };

  getItem = (_id) => {
    const product = this.state.products.find((item) => item._id === _id);
    return product;
  };
  handleDetail = (_id) => {
    const product = this.getItem(_id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = (_id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(_id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(() => {
      return {
        products: [...tempProducts],
        cart: [...this.state.cart, product],
        detailProduct: { ...product },
      };
    }, this.addTotals);
  };
  openModal = (_id) => {
    const product = this.getItem(_id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = (_id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => {
      return item._id === _id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return {
        cart: [...tempCart],
      };
    }, this.addTotals);
  };
  decrement = (_id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => {
      return item._id === _id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(_id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };
  getTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.075;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total,
    };
  };
  addTotals = () => {
    const totals = this.getTotals();
    this.setState(
      () => {
        return {
          cartSubTotal: totals.subTotal,
          cartTax: totals.tax,
          cartTotal: totals.total,
        };
      },
      () => {}
    );
  };
  removeItem = (_id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(_id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter((item) => {
      return item._id !== _id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts],
      };
    }, this.addTotals);
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
