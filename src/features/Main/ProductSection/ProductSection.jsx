"use client";

import React, { useEffect, useState } from "react";
import styles from "./ProductSection.module.scss";
import ProductCard from "@/component/ProductCard/ProductCard";
import axios from "axios";

const ProductSection = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 🟩 Fetch Subcategories
  const getSubCategoriesList = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/v1/categories/H8SZ4VfsFXa4C9cUeonB/subcategories`,
        {
          headers: {
            "x-api-key":
              "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NTEzMjA5OWFkNmJmNjEzODJiNmI0Y2RlOWEyZGZlZDhjYjMwZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJpbnRlYXN5LTY4YzYxIiwiYXVkIjoicHJpbnRlYXN5LTY4YzYxIiwiYXV0aF90aW1lIjoxNzYyMTg4NTgxLCJ1c2VyX2lkIjoidGVzdC11c2VyLTEyMyIsInN1YiI6InRlc3QtdXNlci0xMjMiLCJpYXQiOjE3NjIxODg1ODEsImV4cCI6MTc2MjE5MjE4MSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.Y7ko8DnNBqNaV4OFIzILn06ZiKO44ZuPEmf0yxKsyoTalXQeZ671kbt6soCZkWSC977EtYNl6QR0YnabaXYonqml27I_oNiaHmlBZvT-EbRSTTjFpBJHcsvSjY1odqz1LgdXmGhrSryvSiUMU9klcBnO2hAG0Ps4981JfmUpqxfYmqGqQVVagWcw_tf5dK8GQGopRxo781hbboirJpRiMxt-NeXtHApaniT8b91toFgt1m-bYXmnDP0fK4u9Kzmhuq5NbwNspPTwXrjk_DFUr5tb8jeKyEIbTlUUfAS91eT7QVzTuEGgRqxmpxi4YZ-yZCYyqYuCU_9CRwmF8kjEiA",
          },
        }
      );

      const fetchedCategories = res?.data?.data || [];
      // Add “All” at the beginning
      setCategoryList([{ id: "All", name: "All" }, ...fetchedCategories]);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // 🟩 Fetch Products
  const getProductList = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/v2/product/category/H8SZ4VfsFXa4C9cUeonB`,
        {
          headers: {
            "x-api-key":
              "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NTEzMjA5OWFkNmJmNjEzODJiNmI0Y2RlOWEyZGZlZDhjYjMwZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJpbnRlYXN5LTY4YzYxIiwiYXVkIjoicHJpbnRlYXN5LTY4YzYxIiwiYXV0aF90aW1lIjoxNzYyMTg4NTgxLCJ1c2VyX2lkIjoidGVzdC11c2VyLTEyMyIsInN1YiI6InRlc3QtdXNlci0xMjMiLCJpYXQiOjE3NjIxODg1ODEsImV4cCI6MTc2MjE5MjE4MSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.Y7ko8DnNBqNaV4OFIzILn06ZiKO44ZuPEmf0yxKsyoTalXQeZ671kbt6soCZkWSC977EtYNl6QR0YnabaXYonqml27I_oNiaHmlBZvT-EbRSTTjFpBJHcsvSjY1odqz1LgdXmGhrSryvSiUMU9klcBnO2hAG0Ps4981JfmUpqxfYmqGqQVVagWcw_tf5dK8GQGopRxo781hbboirJpRiMxt-NeXtHApaniT8b91toFgt1m-bYXmnDP0fK4u9Kzmhuq5NbwNspPTwXrjk_DFUr5tb8jeKyEIbTlUUfAS91eT7QVzTuEGgRqxmpxi4YZ-yZCYyqYuCU_9CRwmF8kjEiA",
          },
        }
      );
      setProduct(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getSubCategoriesList();
    getProductList();
  }, []);

  // 🟦 Filtered Products based on selected subcategory
  const filteredProducts =
    selectedCategory === "All"
      ? product
      : product.filter((p) => p.subcategoryId === selectedCategory);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>NEW AND POPULAR</h2>

      {/* 🔹 Filter Buttons */}
      <div className={styles.filters}>
        {categoryList.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${
              selectedCategory === cat.id ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat?.name}
          </button>
        ))}
      </div>

      {/* 🔹 Product Cards */}
      <div className={styles.cardGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        ) : (
          <p className={styles.noProducts}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
