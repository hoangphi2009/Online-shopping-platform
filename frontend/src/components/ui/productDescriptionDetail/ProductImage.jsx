import styles from "./productImage.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

const ProductImage = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={cx("productDescriptionDetail-image-wrapper")}>
      <div className={cx("preview-wrapper")}>
        <img
          src={images?.[selectedImage]}
          alt="Product"
          className={cx("preview-image")}
        />
      </div>
      <div className={cx("thumbnail-list")}>
        {images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product ${index}`}
            className={cx("thumbnail-image", {
              active: selectedImage === index,
            })}
            onMouseEnter={() => setSelectedImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
