import React, { useEffect, useRef } from 'react';
import './styles/MaterialButton.scss';

const createRipple = (x, y, eventsRef) => {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  const animateRippleEnd = () => {
    eventsRef.current.mouseReleased = false;
    ripple.style.animation = `ripple-end 0.3s ease-out forwards`;
    ripple.removeEventListener('animationend', handleRippleEnded);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  };

  function handleRippleEnded() {
    eventsRef.current.rippleEnded = true;
    eventsRef.current.animateRippleEnd = animateRippleEnd;

    if (eventsRef.current.mouseReleased) {
      animateRippleEnd();
    }
  }

  ripple.addEventListener('animationend', handleRippleEnded);

  return ripple;
};

function MaterialButton() {
  const ref = useRef(null);
  const rippleRef = useRef(null);
  const eventsRef = useRef({
    rippleEnded: false,
    mouseReleased: false,
    animateRippleEnd: () => {},
  });

  useEffect(() => {
    const mouseUpHandler = () => {
      eventsRef.current.mouseReleased = true;
      if (eventsRef.current.rippleEnded) {
        eventsRef.current.animateRippleEnd();
      }
    };

    document.addEventListener('mouseup', mouseUpHandler);
    return () => {
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  }, []);

  const handleMouseDown = (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    rippleRef.current?.remove();

    const ripple = createRipple(x, y, eventsRef);
    rippleRef.current = ripple;
    eventsRef.current.rippleEnded = false;
    e.target.lastElementChild.appendChild(ripple);
  };

  return (
    <div className="container">
      <button
        onMouseDown={handleMouseDown}
        ref={ref}
        className="MaterialButton | button secondary-button fw-bold"
      >
        <span>Material Button</span>
        <span className="ripple-container"></span>
      </button>
    </div>
  );
}

export default MaterialButton;
