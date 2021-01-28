import React from 'react';
import { render } from 'react-dom';

import MobileCarousel from '../src';

const getUrl = (offset, limit) => {
  const BASE_URL = 'https://gateway.marvel.com/v1/public/characters?';
  const apikey = `apikey=${process.env.MARVEL_API_KEY}`;
  const params = `&offset=${offset}&limit=${limit}`;
  return `${BASE_URL}${apikey}${params}`;
};

const formatData = (response) => {
  const { offset, total, results } = response;
  return {
    offset,
    total,
    items: results,
  };
};

const getData = async ({ offset, limit }) => {
  const url = getUrl(offset, limit);
  const { data } = await (await fetch(url)).json();
  return formatData(data);
};

const renderItem = (item) => {
  const imgSrc = `${item.thumbnail.path}.${item.thumbnail.extension}`;
  return (
    <div style={{ height: '100%' }}>
      <img
        alt={`${item.name} picture`}
        style={{
          display: 'block',
          objectFit: 'cover',
          height: '80%',
          width: '100%',
          backgroundImage: 'url(./iconLoading.svg)',
        }}
        src={imgSrc}
      />
      <div style={{ height: '20%', color: 'black', backgroundColor: 'white' }}>
        <p style={{ padding: '0 5px', fontSize: '16px', fontWeight: 'bold' }}>
          {item.name}
        </p>
        <p style={{ padding: '0 5px', fontSize: '14px' }}>
          {item.description || 'Description not available'}
        </p>
      </div>
    </div>
  );
};

render(
  <MobileCarousel renderItem={renderItem} getData={getData} />,
  document.getElementById('root'),
);
