import React from 'react';
import { render } from 'react-dom';

import MobileCarousel from '../src';

import { QueryManagerProvider } from '@hooks/useQueryManager';

const getData = (response) => {
  const { offset, total, results } = response;
  return {
    offset,
    total,
    items: results,
  };
};

const getUrl = (offset, limit) => {
  const BASE_URL = 'http://gateway.marvel.com/v1/public/characters?';
  const apikey = `apikey=${process.env.MARVEL_API_KEY}`;
  const params = `&offset=${offset}&limit=${limit}`;
  return `${BASE_URL}${apikey}${params}`;
};

const renderItem = (item) => {
  const imgSrc = `${item.thumbnail.path}.${item.thumbnail.extension}`;
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <img
        style={{
          /* object-fit: contain; */
          backgroundColor: 'grey',
          objectFit: 'cover',
          height: '95%',
          width: '100%',
        }}
        src={imgSrc}
      />
      <p style={{ height: '5%', margin: 0, color: 'black', fontSize: '16px' }}>
        {item.name}
      </p>
    </div>
  );
};

render(
  <QueryManagerProvider getUrl={getUrl} getData={getData}>
    <MobileCarousel renderItem={renderItem} />
  </QueryManagerProvider>,
  document.getElementById('root'),
);
