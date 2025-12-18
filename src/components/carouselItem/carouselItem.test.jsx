import React from 'react'
import { render } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import CarouselItem from './carouselItem'

describe('<CarouselItem />', () => {
  const item = { id: '1', description: 'testItem' }

  test('It should render', () => {
    const renderFn = vi.fn(() => <p>test</p>)
    render(<CarouselItem item={item} renderItem={renderFn} />)
    expect(renderFn).toHaveBeenCalledWith({ item })
  })
})
