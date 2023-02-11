import React from 'react';

function ScreenshotSlide({ data: screenshot }) {
  return <img className="fit-center" src={screenshot.image} alt="screenshot" />;
}

export default ScreenshotSlide;
