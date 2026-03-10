import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;

      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerPosition = footer.offsetTop;

      if (scrollPosition + viewportHeight >= footerPosition - 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    const timeout = setTimeout(() => checkScroll(), 300);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleClick}
          title="Lên đầu trang"
          className="
          fixed bottom-8 right-5 z-[9999]
          bg-gradient-to-r from-orange-500 to-red-500 text-white
          px-4 py-3
          rounded-full
          text-xl
          shadow-md
          transition-all duration-300
          hover:from-orange-600 hover:to-red-600
            cursor-pointer
          "
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
