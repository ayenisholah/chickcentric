import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./authentication/Login";

const { BlobServiceClient } = require("@azure/storage-blob");
const blobSasUrl =
  "https://thechickcentric.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=co&sp=rwdlacupx&se=2021-08-09T18:36:34Z&st=2020-08-09T10:36:34Z&spr=https&sig=dasFpkYpCG87Zci0ZRiKaz35zL05KL2qIxU%2Bdsxg4BQ%3D";

const blobServiceClient = new BlobServiceClient(blobSasUrl);

const containerName = "products";

const containerClient = blobServiceClient.getContainerClient(containerName);

const KEY = "user-token";
const token = localStorage.getItem(KEY);

export default class AddProducts extends Component {
  state = {
    selectedFile: null,
    title: "",
    price: 0,
    imageUrl: "",
    description: "",
    inCart: false,
    count: 0,
    total: 0,
    loggenIn: false,
  };

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = async (event) => {
    event.preventDefault();
    const { selectedFile } = this.state;

    if (selectedFile === null) {
      toast.error("Can not add a product without an image");
      return;
    }

    try {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(selectedFile.name)) {
        toast.error("🚫 Invalid file type");
        this.setState({ selectedFile: null });
      } else {
        toast.info("🦄 Uploading image...");
        const promises = [];
        const blockBlobClient = containerClient.getBlockBlobClient(
          selectedFile.name
        );
        promises.push(blockBlobClient.uploadBrowserData(selectedFile));
        await Promise.all(promises);
        toast.success("✅ Upload Successful");
      }
    } catch (error) {
      toast.error(`🚫 Something Went Wrong: ${error.message}`);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        selectedFile,
        title,
        description,
        price,
        inCart,
        count,
        total,
      } = this.state;

      if (selectedFile === null) {
        toast.error("Cannot add a product without an image");
        return;
      }

      if (title.length === 0) {
        toast.error("Product Title Cannot be empty");
        return;
      }

      if (!Number.isInteger(+price) || price === 0 || price < 0) {
        toast.error("Product price must be a valid number");
        return;
      }

      if (description.length === 0) {
        toast.error("Product description cannot be empty");
        return;
      }

      const product = {
        imageUrl: `https://thechickcentric.blob.core.windows.net/products/${selectedFile.name}`,
        title,
        description,
        price: Number(price),
        count,
        total,
        inCart,
      };

      if (
        selectedFile !== null &&
        title.length !== 0 &&
        description.length !== 0 &&
        Number.isInteger(+price)
      ) {
        const response = await axios.post(
          "https://lit-sands-58479.herokuapp.com/api/product",
          product,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("Product successfully added to catalog!!!");
        } else {
          toast.error("could not add product to the catalog");
        }
      } else {
        toast.error("Please fill the appropirate field");
      }

      this.setState({
        selectedFile: null,
        title: "",
        price: 0,
        imageUrl: "",
        description: "",
        inCart: false,
        count: 0,
        total: 0,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    const { title, description, price } = this.state;

    if (token === null) {
      return <Redirect to="/" />;
    }

    return (
      <div className="addProduct">
        <form>
          <label>Upload Product Image</label>
          <div className="file">
            <input type="file" onChange={this.fileChangedHandler} />
            <button onClick={this.uploadHandler}>Upload!</button>
          </div>

          <div className="form-field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={title}
            />
          </div>

          <div className="form-field">
            <label>Price</label>
            <input
              type="number"
              name="price"
              onChange={this.handleChange}
              value={price}
            />
          </div>

          <div className="form-field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={description}
            />
          </div>

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
