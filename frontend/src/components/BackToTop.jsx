import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={styles.button}
    >
      ↑ Back to top
    </button>
  );
}

const styles = {
  button: {
    position: "fixed",

    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",

    padding: "10px 16px",
    borderRadius: "20px",
    border: "none",

    backgroundColor: "#000",
    color: "#fff",

    cursor: "pointer",
    fontSize: "14px",

    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",

    zIndex: 1000,
  },
};

