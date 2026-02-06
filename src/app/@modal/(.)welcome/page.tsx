import React from "react";
import Modal from "@/components/commons/welcome-pop-up";
import Image from "next/image";

type Props = {};

const page = (props: Props) => {
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
