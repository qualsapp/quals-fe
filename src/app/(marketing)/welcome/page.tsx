import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <Image
      width={1920}
      height={1080}
      src="/images/welcome.jpeg"
      alt="welcome"
    />
  );
};

export default page;
