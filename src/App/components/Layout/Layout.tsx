import { useEffect, useRef, useState } from "react";
import { GameCanvas } from "../GameCanvas";

import styles from "./Layout.module.css";
import { Sidebar } from "../Sidebar";

export const Layout = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const contentRect = contentRef.current?.getBoundingClientRect();

    setWidth(contentRect.width);
    setHeight(contentRect.height);
  }, []);

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      <main className={styles.content} ref={contentRef}>
        <GameCanvas width={width} height={height} />
      </main>
    </div>
  );
};
