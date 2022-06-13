import { GatsbyBrowser } from 'gatsby'
import React from 'react'

import { Layout } from './src/components/layout'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  props,
  element,
}) => {
  const newElement = React.cloneElement(
    element, // I18nextProvider
    element.props,
    React.cloneElement(
      element.props.children, // I18nextContext.Provider
      element.props.children.props,
      React.createElement(Layout, props, element.props.children.props.children)
    )
  )
  return newElement
}
