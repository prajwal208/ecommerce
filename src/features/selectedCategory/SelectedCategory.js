"use client";
import React, { useEffect, useState } from "react";
import styles from "./selectedcategory.module.scss";
import axios from "axios";
import { useParams } from "next/navigation";
import ProductCard from "@/component/ProductCard/ProductCard";

const SelectedCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { slug } = useParams();
  console.log(slug, "sjsjsjsjuuu");
  const getCategoryListData = async () => {
    const res = await axios.get(
      `${apiUrl}/v2/product/collections?categoryId=H8SZ4VfsFXa4C9cUeonB&identifier=${slug}`,
      {
        headers: {
          "x-api-key":
            "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
          Authorization:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdlYTA5ZDA1NzI2MmU2M2U2MmZmNzNmMDNlMDRhZDI5ZDg5Zjg5MmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJpbnRlYXN5LTY4YzYxIiwiYXVkIjoicHJpbnRlYXN5LTY4YzYxIiwiYXV0aF90aW1lIjoxNzYyMDcyNTIwLCJ1c2VyX2lkIjoidGVzdC11c2VyLTEyMyIsInN1YiI6InRlc3QtdXNlci0xMjMiLCJpYXQiOjE3NjIwNzI1MjAsImV4cCI6MTc2MjA3NjEyMCwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.dDMnK1px1Cr628GNKefUmHvJb42cCGSlQo9Vy-25RVGL_smeN6TjT542o0iqk0NBkB90O5OuNHbFWXNgZN7SLHaaS3tq3l3RcGZDGd1_gI1x8_pS--SKaHLTKfiOxerVlEtvHHpW3wsjA5hXEWTlSqMGbol7-Gg8wZWdQZtPE2zdJSoqSCfUmB1BWMbvW6C71cFIUVX--18nS8j0JQkQnisCkTZ2TsVhWT6tuLc1S_X4AIQhhPFhdpZNbVFCESrJ6B-OnZaOW1J9jBOAghc1NIg3z7bcKBfi5IJfYdhC56jUs_Dty9tR_nOUJSAnrAwvgWAVjj3RM7eum1WZUx_-nQ",
        },
      }
    );
    setCategoryList(res?.data?.data);
    console.log(res, "sjsjshyyy");
  };

  useEffect(() => {
    getCategoryListData();
  }, []);

  return (
    <>
      <div className={styles.cardGrid}>
        {categoryList?.map((item) => {
          return <ProductCard item={item} />;
        })}
      </div>
    </>
  );
};

export default SelectedCategory;
