"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./address.module.scss";
import axios from "axios";

const Address = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // your Google API key
  const searchInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Disable button if required fields are empty
  const isFormValid = form.name && form.mobile && form.line1 && form.city && form.state && form.pinCode;

  // Save address
  const postNewAddress = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    try {
      const res = await axios.put(
        `${apiUrl}/v1/address`,
        { ...form },
        {
          headers: {
            "x-api-key":
              "454ccaf106998a71760f6729e7f9edaf1df17055b297b3008ff8b65a5efd7c10",
            Authorization: "Bearer YOUR_BEARER_TOKEN_HERE",
          },
        }
      );

      if (res.status === 200) {
        alert("Address saved successfully!");
        setForm({
          name: "",
          mobile: "",
          email: "",
          line1: "",
          line2: "",
          city: "",
          state: "",
          country: "India",
          pinCode: "",
        });
      }
    } catch (error) {
      console.error("Error saving address:", error.response?.data || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Places Autocomplete integration
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.body.appendChild(script);
    } else {
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    if (!searchInputRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInputRef.current,
      { types: ["address"] }
    );

    autocomplete.setFields([
      "address_component",
      "formatted_address",
      "geometry",
    ]);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      const address = {
        line1: "",
        line2: "",
        city: "",
        state: "",
        pinCode: "",
        country: "India",
      };

      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("street_number")) address.line1 = component.long_name + " " + address.line1;
        if (types.includes("route")) address.line1 += component.long_name;
        if (types.includes("sublocality") || types.includes("neighborhood")) address.line2 = component.long_name;
        if (types.includes("locality")) address.city = component.long_name;
        if (types.includes("administrative_area_level_1")) address.state = component.long_name;
        if (types.includes("postal_code")) address.pinCode = component.long_name;
        if (types.includes("country")) address.country = component.long_name;
      });

      setForm((prev) => ({ ...prev, ...address }));
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.saveAsSection}>
          <label>Save address as</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={styles.nameInput}
            />
            <input
              type="text"
              placeholder="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className={styles.nameInput}
            />
          </div>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search your nearest building or location"
            ref={searchInputRef}
            className={styles.searchInput}
          />
          <span className={styles.poweredBy}>Powered by Google</span>
        </div>

        <div className={styles.addressFields}>
          <input
            type="text"
            placeholder="Flat / House no / Floor / Building *"
            name="line1"
            value={form.line1}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Road name / Area / Colony"
            name="line2"
            value={form.line2}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Pincode"
              name="pinCode"
              value={form.pinCode}
              onChange={handleChange}
              className={styles.halfInput}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              className={styles.halfInput}
            />
          </div>
          <input
            type="text"
            placeholder="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button
          className={styles.saveButton}
          onClick={postNewAddress}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Address;
