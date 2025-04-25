import { useEffect, useRef, useState } from "react";

function useInViewAnimation(animationClass = "animate__fadeInUp") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const className = visible ? `animate__animated ${animationClass}` : "";

  return [ref, className];
}

export default useInViewAnimation;