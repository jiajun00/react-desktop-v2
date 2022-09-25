import React from "react";
import Desk from "./Desk";
import StartToolsBar from "./StartToolsBar";
import styles from "./index.module.scss";

interface Props {}

const Desktop: React.FC<Props> = () => {
  return (
    <div className={styles.desktopFramework}>
      <Desk />
      <StartToolsBar />
    </div>
  );
};

export default Desktop;
