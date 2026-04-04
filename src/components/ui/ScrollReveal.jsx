import { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({ children, animation = 'fadeUp', delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const animations = {
    fadeUp: {
      initial: { opacity: 0, transform: 'translateY(30px)' },
      visible: { opacity: 1, transform: 'translateY(0)' }
    },
    fadeLeft: {
      initial: { opacity: 0, transform: 'translateX(-30px)' },
      visible: { opacity: 1, transform: 'translateX(0)' }
    },
    fadeRight: {
      initial: { opacity: 0, transform: 'translateX(30px)' },
      visible: { opacity: 1, transform: 'translateX(0)' }
    },
    zoomIn: {
      initial: { opacity: 0, transform: 'scale(0.9)' },
      visible: { opacity: 1, transform: 'scale(1)' }
    },
    rotate: {
      initial: { opacity: 0, transform: 'rotate(-5deg) scale(0.95)' },
      visible: { opacity: 1, transform: 'rotate(0) scale(1)' }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, triggerOnce: true }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? animations[animation].visible.transform 
          : animations[animation].initial.transform,
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        ...(isVisible ? {} : { visibility: 'hidden' })
      }}
    >
      {children}
    </div>
  );
};