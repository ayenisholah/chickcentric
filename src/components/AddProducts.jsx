import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { BlobServiceClient } = require("@azure/storage-blob");
const blobSasUrl =
  "https://thechickcentric.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=co&sp=rwdlacupx&se=2021-08-09T18:36:34Z&st=2020-08-09T10:36:34Z&spr=https&sig=dasFpkYpCG87Zci0ZRiKaz35zL05KL2qIxU%2Bdsxg4BQ%3D";

const blobServiceClient = new BlobServiceClient(blobSasUrl);

const containerName = "products";

const containerClient = blobServiceClient.getContainerClient(containerName);

export default class AddProducts extends Component {
  state = {
    selectedFile: null,
    title: "",
    price: "",
    imageUrl: "",
    description: "",
    inCart: false,
    count: 0,
    total: 0,
  };

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = async (event) => {
    event.preventDefault();
    const { selectedFile } = this.state;

    try {
      toast.info("🦄 Uploading image...", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const promises = [];
      const blockBlobClient = containerClient.getBlockBlobClient(
        selectedFile.name
      );
      promises.push(blockBlobClient.uploadBrowserData(selectedFile));
      await Promise.all(promises);
      toast.success("✅ Upload Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      alert("Upload Successful");
    } catch (error) {
      toast.error(`🚫 Something Went Wrong: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });

    const {
      selectedFile,
      title,
      description,
      price,
      inCart,
      count,
      total,
    } = this.state;

    const product = {
      imageUrl: `https://thechickcentric.blob.core.windows.net/products/${selectedFile.name}`,
      title,
      description,
      price,
      count,
      total,
      inCart,
    };

    console.log(product);
  };

  render() {
    const { title, description, price } = this.state;
    return (
      <div>
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
        <form>
          <div className="upload">
            <input type="file" onChange={this.fileChangedHandler} />
            <button onClick={this.uploadHandler}>Upload!</button>
          </div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={title}
          />

          <label>Price</label>
          <input
            type="text"
            name="price"
            onChange={this.handleChange}
            value={price}
          />

          <label>Description</label>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            value={description}
          />

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
