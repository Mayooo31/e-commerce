import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>
        <h1>Navigation</h1>
        <div>
          <p>Shipping</p>
          <p>Help</p>
          <p>About us</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
      <div className={styles.contact}>
        <h1>Contact us</h1>
        <p>
          Need help? Our support is always there to answer your questions or to resolve
          any issues. We can help you decide your perfect keyboard or pick the right
          components. E-mail: support@keyboards.com
        </p>
      </div>
      <div>
        <h1>Socials</h1>
        <div>
          <p>Follow us on Instagram</p>
          <p>Like us @facebook</p>
          <p>Join our Discord</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
