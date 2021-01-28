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
  const BASE_URL = 'https://gateway.marvel.com/v1/public/characters?';
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
          display: 'block',
          objectFit: 'cover',
          height: '80%',
          width: '100%',
        }}
        src={imgSrc}
      />
      <div
        style={{
          height: '20%',
          color: 'black',
          backgroundColor: 'white',
        }}
      >
        <p style={{ padding: '5px', fontSize: '16px', fontWeight: 'bold' }}>
          {item.name}
        </p>
        <p
          style={{
            padding: '5px',
            fontSize: '14px',
          }}
        >
          {item.description || 'Description not available'}
        </p>
      </div>
    </div>
  );
};

render(
  <QueryManagerProvider getUrl={getUrl} getData={getData}>
    <MobileCarousel renderItem={renderItem} />
  </QueryManagerProvider>,
  document.getElementById('root'),
);
