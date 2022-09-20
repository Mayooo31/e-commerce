import { Fragment, useEffect } from "react";

import Catalog from "../components/Catalog/Catalog";
import Newsletter from "../components/Newsletter/Newsletter";
import Panel from "../components/Panel/Panel";
import Slider from "../components/Slider/Slider";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Slider />
      <Panel />
      <Catalog />
      <Newsletter />
    </Fragment>
  );
};

export default Home;
