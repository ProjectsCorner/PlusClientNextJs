import React from "react";

export default ({ product }) => {
  let images =
    typeof product.product_images === "string" &&
    JSON.parse(product.product_images)
      ? JSON.parse(product.product_images)
      : [];
  return (
    <>
      <div className="-ct-item">
        <div>
          <img
            src={images.length === 0 ? "/banner.png" : images[0]}
            alt="PLUSPROMOTION"
          />
        </div>
        <div className="">
          <div className="-ct-item-name">
            <b>{product.product_name}</b> - {product.product_description}
          </div>
          <div className="-ct-item-price">{`UGX ${
            parseInt(product.product_price) - parseInt(product.product_discount)
          }`}</div>
          <div className="-ct-item-price-before">
            {product.product_discount ? `UGX ${product.product_price}` : ""}
          </div>
        </div>
      </div>
    </>
  );
};
