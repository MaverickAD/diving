import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

function DownloadButton(props) {
  const downloadFile = () => {
    axios({
      url: "/api/pdf/download/" + props.dive,
      method: "GET",
      responseType: "blob", // Important: responseType must be set to 'blob' for file downloads
    })
      .then((response) => {
        console.log(response);
        const filename = response.headers["content-disposition"]
          .split("filename=")[1]
          .replace('"', "")
          .replace('"', "");
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };
  return (
    <button
      className={
        "bg-primary hover:bg-accent text-white text-center text-sm font-bold uppercase rounded-full px-5 py-2.5"
      }
      onClick={downloadFile}
    >
      Download
    </button>
  );
}

DownloadButton.propTypes = {
  dive: PropTypes.number.isRequired,
};

export default DownloadButton;
