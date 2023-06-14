let express = require("express");
const path = require("path");
let router = express.Router();

module.exports = (db) => {
  router.get("/download", (req, res) => {
    const filname = path.join(
      __dirname,
      "../../public/pdf/Pongee_fiche_secu_modified.pdf"
    );

    // Set the appropriate headers for the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filname}`);

    // Send the file data as the response
    res.download(filname);
  });

  router.get("/view", (req, res) => {
    res.send("PDF viewer");
  });
  return router;
};
