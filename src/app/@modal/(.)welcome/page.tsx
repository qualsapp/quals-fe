import React from "react";
import Modal from "@/components/commons/welcome-pop-up";
import Image from "next/image";

const page = () => {
  return (
    <Modal>
      <Image
        width={1920}
        height={1080}
        src="/images/welcome.jpeg"
        alt="welcome"
      />
    </Modal>
  );
};

export default page;
