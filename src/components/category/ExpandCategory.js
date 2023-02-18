import React from 'react';
import { useParams } from 'react-router-dom';
import useGames from '../hooks/useGames';
import ListPage from '../list-page/ListPage';

function ExpandCategory({ title, query, categories }) {
  const { id } = useParams();
  const categoryName = categories.find((c) => c.id === Number(id))?.name;
  const { games, handleLoadMore } = useGames({
    key: `${title.toLowerCase()}-${categoryName}-games`,
    url: `/games?${query}=${id}`,
    refetch: true,
    shouldFetch: categoryName !== undefined,
    once: false,
  });

  return (
    <ListPage
      title={`${title} / ${categoryName}`}
      games={games}
      onLoadMore={handleLoadMore}
    />
  );
}

export default ExpandCategory;
