import { GatsbyBrowser } from 'gatsby'
import React from 'react'

import { Layout } from './src/components/layout'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  props,
  element,
}) => {
  return React.cloneElement(
    element, // I18nextProvider
    props,
    element.props.children &&
      React.cloneElement(
        element.props.children, // I18nextContext.Provider
        element.props.children?.props,
        React.createElement(
          Layout,
          props,
          element.props.children?.props.children
        )
      )
  )
}
