import React from 'react'
import PropTypes from 'prop-types'

import { QueryManagerProvider } from '@hooks/QueryManagerProvider'

import ReactCarouselQuery from './reactCarouselQuery'

const ReactCarouselQueryWrapper = ({ getData, fetchStep, ...props }) => (
  <QueryManagerProvider getData={getData} fetchStep={fetchStep}>
    <ReactCarouselQuery {...props} />
  </QueryManagerProvider>
)

ReactCarouselQueryWrapper.propTypes = {
  renderItem: PropTypes.func.isRequired,
  renderBadge: PropTypes.func,
  renderArrow: PropTypes.func,
  hideIndex: PropTypes.bool,
  showArrows: PropTypes.bool,
  getData: PropTypes.func.isRequired,
  fetchStep: PropTypes.number,
}

export default ReactCarouselQueryWrapper
