import React from 'react'
import PropTypes from 'prop-types'
import { UseQueryManagerContext, useQueryManagerProvider } from '@hooks/useQueryManager'

export const QueryManagerProvider = ({ children, getData, fetchStep }) => {
  const queryManager = useQueryManagerProvider({ getData, fetchStep })
  return (
    <UseQueryManagerContext.Provider value={queryManager}>
      {children}
    </UseQueryManagerContext.Provider>
  )
}

QueryManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  getData: PropTypes.func.isRequired,
  fetchStep: PropTypes.number,
}
