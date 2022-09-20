import { useEffect } from "react";
import Catalog from "../components/Catalog/Catalog";
import Panel from "../components/Panel/Panel";

import styles from "./Keyboards.module.css";

const Keyboards = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Mechanical keyboards</h1>
      <Panel />
      <Catalog />
    </div>
  );
};

export default Keyboards;
