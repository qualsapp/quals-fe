import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4 text-center px-8">
      <p>©{new Date().getFullYear()} Quals. All rights reserved.</p>
      <p>
        Contact us:&nbsp;
        <a
          href="mailto:usefairplay@gmail.com"
          className="underline text-secondary"
        >
          usefairplay@gmail.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
