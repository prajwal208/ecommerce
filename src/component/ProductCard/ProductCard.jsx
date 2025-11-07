"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProductCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(item, "zzzznnxxyyy");
  const handleClick = () => {
    router.push(`/product/${item?.id}`);
  };

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const res = await axios.get(`${apiUrl}/v2/wishlist/${item.id}/status`, {
          headers: {
            "x-api-key":
              "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        });
        console.log(res,"sjsjsuyy")
        setLiked(res.data?.data?.isInWishlist || false);
      } catch (err) {
        console.error("Error checking wishlist status:", err);
      }
    };

    fetchWishlistStatus();
  }, [item.id]);

  const addtowishList = async (prodId) => {
    try {
      const res = axios.post(
        `${apiUrl}/v2/wishlist`,
        {
          productId: prodId,
        },
        {
          headers: {
            "x-api-key":
              "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
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
            e.stopPropagation();
            addtowishList(item?.id);
            setLiked((prev) => !prev);
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
