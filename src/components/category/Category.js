import ImageSlider from '../image-sliders/ImageSlider';
import GameCardSlide from '../image-sliders/GameCardSlide';
import { useUrl } from '../contexts/UrlContext';
import { Link } from 'react-router-dom';
import useGames from '../hooks/useGames';
import './styles/Category.scss';

function Category({ category, slug }) {
  const url = useUrl();
  const { games } = useGames({
    key: `${slug}-${category.id}`,
    url: `${url}${category.id}`,
    limit: 5,
  });

  return (
    <div className="Category">
      <div className="container mg-b4">
        <h2>{category.name}</h2>
      </div>
      <ImageSlider
        className="image-slider-unwrapped"
        // passing 5 nulls will make GameCardSlide to render 5 loading cards
        items={games.length !== 0 ? games : [null, null, null, null, null]}
        slideElement={GameCardSlide}
        containerProps={{
          'free-mode': true,
          'slides-per-view': 'auto',
        }}
      />
      <div className="container mg-b16">
        <Link to={`/${slug}/${category.id}`}>
          <div className="underlined">View more</div>
        </Link>
      </div>
    </div>
  );
}

export default Category;
