// ProductLoader.js
import React from "react";
import { TailSpin } from "react-loader-spinner";

const ProductLoader = () => (
  <div
  style={{
    display: "flex",
    justifyContent: "center",
    // marginTop: "20px",
    alignItems: "center",
    height:"68.8vh"
  }}
  >
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#2d3748"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default ProductLoader;
