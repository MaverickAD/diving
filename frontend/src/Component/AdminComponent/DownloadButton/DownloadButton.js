import React from "react";
import axios from "axios";

function DownloadButton(props) {
  const downloadFile = (filename) => {
    axios({
      url: "/api/pdf/download",
      method: "GET",
      responseType: "blob", // Important: responseType must be set to 'blob' for file downloads
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element and click it to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = props.filename;
        link.click();

        // Clean up the temporary URL
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };
  return <button onClick={downloadFile}>Download</button>;
}

export default DownloadButton;
