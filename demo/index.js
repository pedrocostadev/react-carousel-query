import React from 'react';
import { render } from 'react-dom';

import ReactCarouselQuery from '../src';

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
        draggable={false}
        alt={`${item.name} picture`}
        style={{
          display: 'block',
          objectFit: 'cover',
          height: '80%',
          width: '100%',
          background: '#ffffff url("/assets/iconLoading.svg") no-repeat center',
        }}
        src={imgSrc}
      />
      <div style={{ height: '20%', backgroundColor: 'white' }}>
        <h3>{item.name}</h3>
        <p className="lineClamp">
          {item.description || 'Description not available'}
        </p>
      </div>
    </div>
  );
};

render(
  <ReactCarouselQuery
    showArrowsOnMobile
    fetchStep={3}
    renderItem={renderItem}
    getData={getData}
  />,
  document.getElementById('root'),
);
