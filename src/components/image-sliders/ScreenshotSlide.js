import React from 'react';

function ScreenshotSlide({ data: screenshot }) {
  return <img src={screenshot.image} alt="screenshot" />;
}

export default ScreenshotSlide;
