import { useRef } from "react";
import styles from "./Sidebar.module.css";
import { Menu } from "./SvgIcon";

const Sidebar = () => {
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);

  /**
   * サイドバーのアニメーションを行う関数
   * @param start 開始位置(px)
   * @param end 終了位置(px)
   */
  const animateSidebar = (start: number, end: number) => {
    const duration = 150;
    let startTime: number | null = null;

    const update = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const newPosition = Math.floor(start + (end - start) * progress);
      if (sideBarRef.current) {
        sideBarRef.current.style.left = `${newPosition}px`;
      }
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  const openSidebar = () => {
    animateSidebar(-200, 0);
    if (maskRef.current) {
      maskRef.current.style.display = "block";
    }
  };

  const closeSidebar = () => {
    animateSidebar(0, -200);
    if (maskRef.current) {
      maskRef.current.style.display = "none";
    }
  };

  return (
    <div>
      {/* サイドバー */}
      <div className={styles.sideBarContainer} ref={sideBarRef}>
        <span className={styles.headerSideClose} onMouseDown={closeSidebar}>
          <Menu />
        </span>
        <div className={styles.sideMenu}>
          <a href="/compass"><p className={styles.sideMenuContent}>羅針盤シミュ</p></a>
          <a href="/reference"><p className={styles.sideMenuContent}>資料室</p></a>
          <a href="/terminal"><p className={styles.sideMenuContent}>ターミナル</p></a>
          <a href="/quest"><p className={styles.sideMenuContent}>任務手帳</p></a>
          <a href="/akashi"><p className={styles.sideMenuContent}>改修効率計算機</p></a>
          <a href="/dock"><p className={styles.sideMenuContent}>入渠計算機</p></a>
          <a href="/suzu"><p className={styles.sideMenuContent}>涼月タイマー</p></a>
        </div>
      </div>
      <div className={styles.headerMask} ref={maskRef} onMouseDown={closeSidebar}></div>
      <div className={styles.headerContainer}>
        <div className={styles.headerInnerContainer}>
          <span className={styles.headerSideOpen} onMouseDown={openSidebar}>
            <Menu />
          </span>
          <a href="/compass"><span className={styles.headerTitle}>poyopoyo工具箱</span></a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;