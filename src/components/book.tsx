import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
// import "../styles/book.css";
// import "../styles/globals.css";
interface BookProps {
  mobile: boolean;
}

const Book: React.FC = () => {
  const [width, setWidth] = useState(399);
  const [height, setHeight] = useState(526);
  const [usePortrait, setUsePortrait] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 768) {
        setUsePortrait(true);
        // Mobile
        setWidth(250);
        setHeight(330);
        // setWidth(250); // 280
        // setHeight(330); // 380
      } else if (screenWidth <= 1024) {
        // Tablet
        setWidth(370); // 350
        setHeight(500); // 460
      } else if (screenWidth <= 1366) {
        // Laptop 13"
        setWidth(430); // 380
        setHeight(560); // 500
      } else if (screenWidth <= 1536) {
        // Laptop 15"-16"
        setWidth(510); // 420
        setHeight(660); // 550
      } else if (screenWidth <= 1920) {
        // Desktop 24"
        setWidth(670); //55o
        setHeight(867.5); //720
      } else {
        // Monitor besar (4K, ultrawide, dll.)
        setWidth(750);
        setHeight(975);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const pages = Array.from({ length: 50 }, (_, i) => (
    <div key={i} className={`page page${i + 1}`}></div>
  ));

  return (
    <div className="book-container">
      <HTMLFlipBook
        className=""
        style={{}}
        width={width}
        height={height}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        startPage={0}
        size="fixed"
        minWidth={250}
        maxWidth={width}
        minHeight={330}
        maxHeight={height}
        drawShadow={true}
        flippingTime={750}
        usePortrait={usePortrait}
        startZIndex={31}
        autoSize={false}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={20}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {/* Cover */}
        {/* <div className="page cover"></div> */}
        {/* Page 1 - Introduction */}
        {pages}
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
