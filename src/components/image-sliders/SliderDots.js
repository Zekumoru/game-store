import React from 'react';
import '../../styles/components/SliderDots.scss';

function SliderDots({ activeIndex, length, onClick }) {
  const dots = [];

  for (let i = 0; i < length; i++) {
    dots.push(
      <div
        key={i}
        className={`dot ${activeIndex === i ? 'active' : ''}`}
        onClick={() => onClick(i)}
        data-testid={`dot-${i}`}
      />
    );
  }

  return <div className="SliderDots">{dots}</div>;
}

export default SliderDots;
