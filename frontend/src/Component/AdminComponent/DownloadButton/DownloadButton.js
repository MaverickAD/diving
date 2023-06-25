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
        "bg-primary font-bold text-white hover:text-black hover:shadow-[inset_13rem_0_0_0] hover:shadow-accent duration-[1000ms,700ms] transition-[color,box-shadow] rounded-full uppercase px-5 py-2.5"
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
