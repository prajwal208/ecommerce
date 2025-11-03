import React from "react";
import styles from "./address.module.scss";

const Address = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.saveAsSection}>
          <label>Save address as</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Name"
              className={styles.nameInput}
            />
            <input
              type="text"
              placeholder="Mobile"
              className={styles.nameInput}
            />
          </div>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search your nearest building or location"
            className={styles.searchInput}
          />
          <span className={styles.poweredBy}>Powered by Google</span>
        </div>

        {/* Address Fields */}
        <div className={styles.addressFields}>
          <input
            type="text"
            placeholder="Flat / House no / Floor / Building *"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Road name / Area / Colony"
            className={styles.input}
          />
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Pincode"
              className={styles.halfInput}
            />
            <input
              type="text"
              placeholder="City"
              className={styles.halfInput}
            />
          </div>
          <input type="text" placeholder="State" className={styles.input} />
        </div>

        {/* Save Button */}
        <button className={styles.saveButton}>Save</button>
      </div>
    </div>
  );
};

export default Address;
