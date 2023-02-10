import React from 'react';
import Category from './category/Category';

function Categories({ title, categories }) {
  return (
    <div>
      <div className="container mg-b8">
        <h1>{title}</h1>
      </div>
      {categories.map((category) => (
        <Category key={category.id} title={title} category={category} />
      ))}
    </div>
  );
}

export default Categories;
