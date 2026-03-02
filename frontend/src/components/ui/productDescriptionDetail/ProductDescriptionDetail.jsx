import React from 'react'
import RelatedProducts from "./RelatedProducts";
import ReviewList from "../review/ReviewList";
import BackButton from "../button/BackButton";
import ProductDetail from "./ProductDetail";
const ProductDescriptionDetail = () => {
  return (
    <div>
        <BackButton/>
        <ProductDetail />
        <ReviewList />
        <RelatedProducts />
    </div>
  )
}

export default ProductDescriptionDetail
