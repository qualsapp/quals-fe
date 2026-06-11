import React from "react";
import Modal from "@/components/commons/welcome-pop-up";
import Image from "next/image";

const page = () => {
  return (
    <Modal>
      <Image
        width={1024}
        height={1536}
        src="/images/welcome.jpeg"
        alt="Welcome to Quals"
        priority
        className="block h-auto w-full select-none"
      />
    </Modal>
  );
};

export default page;
