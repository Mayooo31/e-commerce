import styles from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <div className={styles.newsletter}>
      <h1>Newsletter</h1>
      <p>Subscribe to get emails about news and sales.</p>
      <input placeholder="Your E-mail" />
      <button>Subscribe</button>
    </div>
  );
};

export default Newsletter;
