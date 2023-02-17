import React from 'react';
import Icon, {
  ratingStarEmptyIcon,
  ratingStarFullIcon,
  ratingStarHalfIcon,
} from '../../assets/icons';

function RatingStars({ rating, max = 5 }) {
  return (
    <ul>
      {Array(max)
        .fill()
        .map((v, i) => {
          let icon = ratingStarEmptyIcon;

          if (rating >= i + 1) {
            icon = ratingStarFullIcon;
          } else if (rating >= i + 0.5) {
            icon = ratingStarHalfIcon;
          }

          return <Icon key={i} className="icon" icon={icon} />;
        })}
    </ul>
  );
}

export default RatingStars;
