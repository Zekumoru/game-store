import React from 'react';

function ScreenshotSlide({ data: screenshot, slideIndex, onClick }) {
  return (
    <img
      onClick={() => {
        if (typeof onClick !== 'function') return;
        onClick(slideIndex);
      }}
      className="fit-center"
      src={screenshot.image}
      alt="screenshot"
      style={{ cursor: 'pointer' }}
    />
  );
}

export default ScreenshotSlide;
