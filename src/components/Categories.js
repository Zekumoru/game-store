import React from 'react';
import Category from './category/Category';

function Categories({ title, categories, slug }) {
  return (
    <div>
      <div className="container mg-b8">
        <h1>{title}</h1>
      </div>
      {categories.map((category) => (
        <Category key={category.id} category={category} slug={slug} />
      ))}
    </div>
  );
}

export default Categories;
