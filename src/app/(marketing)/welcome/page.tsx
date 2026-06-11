import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Image
        width={1024}
        height={1536}
        src="/images/welcome.jpeg"
        alt="Welcome to Quals"
        priority
        className="block h-auto w-[min(92vw,26rem)] select-none overflow-hidden rounded-2xl shadow-2xl"
      />
    </div>
  );
};

export default page;
