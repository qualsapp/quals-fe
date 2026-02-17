import React from "react";

type HeadingProps = {
  title: string;
  description?: string;
};

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h2 className="capitalize text-2xl font-bold text-center">{title}</h2>
      {description && <p className="text-center">{description}</p>}
    </div>
  );
};

export default Heading;
