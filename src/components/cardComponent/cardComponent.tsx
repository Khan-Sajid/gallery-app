import Image from "next/image";
import React from "react";
import styles from "./cardsComponent.module.scss";
import { CardComponentTypes } from "./cardComponent.types";

export const CardComponent = (props: CardComponentTypes) => {
  const { imageData, index } = props;
  return (
    <div className={styles.cardsContainer}>
      <div className={`${styles.cardHeader} ${styles.details}`}>
        <Image
          src={imageData?.user?.profile_image?.medium}
          width={50}
          height={50}
          alt="profile"
          className={styles.profileImage}
        />
        <h3 className={styles.name}>{imageData.user.name}</h3>
      </div>
      <p className={`${styles.bio} ${styles.details}`}>
        {imageData?.user?.bio}
      </p>
      <div className={`${styles.details} ${styles.likes}`}>
        {Number(imageData?.user?.total_likes)} Likes
      </div>
      <Image
        priority={index === 1 ? true : false}
        src={imageData.urls.regular}
        fill
        alt={imageData?.alt_description || "img"}
        className={styles.mainImage}
      />
    </div>
  );
};
