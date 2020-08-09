import React, { Component } from "react";

const { BlobServiceClient } = require("@azure/storage-blob");
const blobSasUrl =
  "https://thechickcentric.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=co&sp=rwdlacupx&se=2021-08-09T18:36:34Z&st=2020-08-09T10:36:34Z&spr=https&sig=dasFpkYpCG87Zci0ZRiKaz35zL05KL2qIxU%2Bdsxg4BQ%3D";

const blobServiceClient = new BlobServiceClient(blobSasUrl);

const containerName = "products";

const containerClient = blobServiceClient.getContainerClient(containerName);

export default class AddProducts extends Component {
  state = { selectedFile: null };

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = async (event) => {
    event.preventDefault();
    const { selectedFile } = this.state;

    try {
      alert("Uploading files...");
      const promises = [];
      const blockBlobClient = containerClient.getBlockBlobClient(
        selectedFile.name
      );
      promises.push(blockBlobClient.uploadBrowserData(selectedFile));
      await Promise.all(promises);
      alert("Done.");
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <div>
        <form>
          <input type="file" onChange={this.fileChangedHandler} />
          <button onClick={this.uploadHandler}>Upload!</button>
        </form>
      </div>
    );
  }
}

// https://thechickcentric.blob.core.windows.net/products/Shola1.jpg
