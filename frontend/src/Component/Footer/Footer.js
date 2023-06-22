import React from "react";

function Footer(props) {
  return (
    <footer
      className={
        "bottom-0 left-0 right-0 bg-gradient-to-r from-secondary via-primary to-accent text-header-footer-text p-4 shadow-[35px_0px_60px_-15px_rgba(0,0,0,1)]"
      }
    >
      <div className={"container mx-auto text-center"}>
        <p>&copy; 2023 - Sub Aquatic Group Wattignies</p>
      </div>
    </footer>
  );
}

export default Footer;
