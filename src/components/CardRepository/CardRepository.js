import styles from "./CardRepository.module.css";

import React from "react";

const CardRepository = ({ repository }) => {
  return (
      <div className={styles.card}>
        {/* Name, visibility, description, languages, created date, updated date, archived */}
        <div className={styles.title}>
          <a href={`https://github.com/${repository.owner.login}/${repository.name}`}>{repository.name}</a>
          <span className={styles.visibility}>{repository.visibility}</span>
        </div>
        <p className={styles.description}>{repository.description}</p>
        <div className={styles.language}>
          <span></span>
          <p>{repository.language}</p>
        </div>
      </div>
  );
};

export default CardRepository;
