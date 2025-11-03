"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${item?.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <Image
          src={item?.productImages?.[0]}
          alt={item?.subtitle}
          width={300}
          height={300}
          className={styles.productImg}
        />
        <span
          className={`${styles.favorite} ${liked ? styles.liked : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // prevent navigation when liking
            setLiked(!liked);
          }}
        >
          <Heart
            size={22}
            fill={liked ? "red" : "none"}
            stroke={liked ? "red" : "currentColor"}
          />
        </span>
      </div>

      <h3>{item?.subtitle}</h3>
      <p>₹ {item?.basePrice}</p>
    </div>
  );
};

export default ProductCard;
