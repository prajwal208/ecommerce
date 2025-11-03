"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${apiUrl}/v2/product/${id}`, {
          headers: {
            "x-api-key":
              "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
          },
        });
        setProduct(res?.data?.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      {/* Left: Product Image */}
      <div className={styles.imageSection}>
        <Image
          src={product?.productImages?.[0]}
          alt={product?.name}
          width={500}
          height={500}
          className={styles.mainImage}
        />
      </div>

      {/* Right: Product Info */}
      <div className={styles.infoSection}>
        <h1>{product?.name}</h1>
        <p className={styles.subtitle}>{product?.subtitle}</p>
        <p className={styles.price}>₹ {product?.basePrice}</p>

        {/* Sizes */}
        {product?.configuration?.[0]?.options?.length > 0 && (
          <div className={styles.sizes}>
            <h4>Sizes</h4>
            <div className={styles.sizeOptions}>
              {product.configuration[0].options.map((size) => (
                <button key={size.value} className={styles.sizeBtn}>
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button className={styles.addToCart}>ADD TO BAG</button>

        {/* Details */}
        <div className={styles.details}>
          <h3>DETAILS</h3>
          <p>{product?.description}</p>
        </div>

        {/* Care */}
        <div className={styles.care}>
          <h3>CARE</h3>
          <p>{product?.care}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
