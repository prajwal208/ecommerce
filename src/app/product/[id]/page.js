"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { nanoid } from "nanoid";
import { Plus, Minus } from "lucide-react";
import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
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
    const basePrice = product.basePrice || 0;
    const discountPrice = product.discountedPrice || basePrice;
    const totalPrice = discountPrice * quantity;

    const payload = {
      id: nanoid(),
      productId: product.id,
      quantity,
      totalPrice,
      basePrice,
      discountPrice,
      categoryId: product.categoryId,
      name: product.name,
      imageUrl: product.productImages?.[0] || "",
      productImageUrl: product.canvasImage || "",
      isCustomizable: product.isCustomizable,
      sku: product.sku,
      dimensions: {
        height: product.dimension?.height || 0,
        width: product.dimension?.width || 0,
        length: product.dimension?.length || 0,
        weight: product.dimension?.weight || 0,
      },
      options: [
        {
          value: selectedOptions?.size || "default",
        },
      ],
    };

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/v1/cart`, payload, {
        headers: {
          "x-api-key":
            "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      });
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
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

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
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

        <div className={styles.priceSection}>
          {product.discountedPrice ? (
            <>
              <p className={styles.discountedPrice}>₹ {product.discountedPrice}</p>
              <p className={styles.basePrice}>₹ {product.basePrice}</p>
            </>
          ) : (
            <p className={styles.price}>₹ {product.basePrice}</p>
          )}
        </div>

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

        {/* Accordion Sections */}
        <div className={styles.accordion}>
          {[
            { title: "DETAILS", content: product?.description },
            { title: "CARE", content: product?.care },
          ].map((section) => (
            <div key={section.title} className={styles.accordionItem}>
              <div
                className={styles.accordionHeader}
                onClick={() => toggleSection(section.title)}
              >
                <h3>{section.title}</h3>
                {activeSection === section.title ? <Minus /> : <Plus />}
              </div>

              <div
                className={`${styles.accordionContent} ${
                  activeSection === section.title ? styles.active : ""
                }`}
              >
                <p>{section.content || "No information available."}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
