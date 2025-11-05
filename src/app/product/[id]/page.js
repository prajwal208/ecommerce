"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { nanoid } from "nanoid";
import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
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
  }, [id, apiUrl]);

  if (!product) return <div className={styles.loading}>Loading...</div>;

  const addToCart = async (product, selectedOptions, quantity = 1) => {
    const price = product.basePrice; // base price only
    const totalPrice = price * quantity;

    const payload = {
      id: nanoid(),
      productId: product.id,
      quantity,
      totalPrice,
      categoryId: product.categoryId,
      isCustomizable: product.isCustomizable,
      options: selectedOptions,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/v1/cart`, payload, {
        headers: {
          "x-api-key":
            "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      });

      console.log("✅ Added to cart:", res.data);
      alert("Item added to cart successfully!");
      setLoading(false);
      return res.data;
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product?.configuration?.length > 0 && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const selectedOptions = {
      ...(selectedSize && { size: selectedSize }),
    };

    addToCart(product, selectedOptions, quantity);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image
          src={product?.productImages?.[0]}
          alt={product?.name}
          width={500}
          height={500}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.infoSection}>
        <h1>{product?.name}</h1>
        <p className={styles.subtitle}>{product?.subtitle}</p>
        <p className={styles.price}>₹ {product?.basePrice}</p>

        {product?.configuration?.[0]?.options?.length > 0 && (
          <div className={styles.sizes}>
            <h4>Sizes</h4>
            <div className={styles.sizeOptions}>
              {product.configuration[0].options.map((size) => (
                <button
                  key={size.value}
                  className={`${styles.sizeBtn} ${
                    selectedSize === size.value ? styles.activeSize : ""
                  }`}
                  onClick={() => setSelectedSize(size.value)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}

       
        <button
          className={styles.addToCart}
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? "ADDING..." : "ADD TO BAG"}
        </button>

        <div className={styles.details}>
          <h3>DETAILS</h3>
          <p>{product?.description}</p>
        </div>
        
        <div className={styles.care}>
          <h3>CARE</h3>
          <p>{product?.care}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
