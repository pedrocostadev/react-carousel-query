declare module 'react-carousel-query' {
    import React from 'react';
  
    interface Item {
      id: string | number;
    }
  
    interface ReactCarouselQueryProps {
      renderItem: ({ item }: { item: Item }) => React.ReactElement;
      getData: ({ offset, limit }: { offset: number; limit: number }) => React.ReactElement;
      renderBadge?: () => React.ReactElement;
      fetchStep?: number;
      hideIndex?: boolean;
      showArrowsOnMobile?: boolean;
    }
  
    const ReactCarouselQuery: React.FC<ReactCarouselQueryProps>;
  
    export default ReactCarouselQuery;
  }
  