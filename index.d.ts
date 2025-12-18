declare module 'react-carousel-query' {
  import React from 'react'

  interface Item {
    id: string | number
  }

  interface GeneralProps {
    renderBadge?: () => React.ReactElement
    renderArrow?: () => React.ReactElement
    hideIndex?: boolean
    showArrows?: boolean
    ariaLabel?: string
  }

  interface GetDataParams {
    offset: number
    cursor: string | null
    limit: number
  }

  interface GetDataResponse {
    total?: number
    items: Item[]
    nextCursor?: string | null
  }

  interface ReactCarouselQueryProps extends GeneralProps {
    renderItem: ({ item }: { item: Item }) => React.ReactElement
    getData: (params: GetDataParams) => Promise<GetDataResponse>
    fetchStep?: number
  }

  interface ReactCarouselProps extends GeneralProps {
    children: React.ReactElement[]
  }

  const ReactCarouselQuery: React.FC<ReactCarouselQueryProps>

  const ReactCarousel: React.FC<ReactCarouselProps>

  export default ReactCarouselQuery

  export { ReactCarousel }
}
