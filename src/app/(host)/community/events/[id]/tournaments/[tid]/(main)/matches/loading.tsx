import React from "react";

const Loading = () => {
  return (
    <div className="py-8 md:py-10 space-y-10">
      <div className="container flex flex-col items-center">
        <div className="w-full space-y-10">
          {/* Tabs skeleton */}
          <div className="mx-auto flex border-y py-3">
            <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          {/* Match cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-8 md:gap-y-16">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-full max-w-md h-32 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
