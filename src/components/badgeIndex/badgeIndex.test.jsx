import React from 'react'
import { render } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import BadgeIndex from './badgeIndex'

describe('<BadgeIndex />', () => {
  const props = {
    currentIndex: 1,
    total: 3,
  }

  test('It should render', () => {
    const { container, getByText } = render(<BadgeIndex {...props} />)
    const text = getByText(`${props.currentIndex}/${props.total}`)
    expect(text).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test('It should render only current index where there is no total', () => {
    const { container, getByText, queryByText } = render(<BadgeIndex currentIndex={222} />)
    const text = getByText('222')
    expect(text).toBeTruthy()
    expect(queryByText('222/')).toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  test('It should call the custom render function when passed', () => {
    const renderFn = vi.fn(() => <p>test</p>)
    render(<BadgeIndex {...props} renderBadge={renderFn} />)
    expect(renderFn).toHaveBeenCalledWith(props)
  })
})
