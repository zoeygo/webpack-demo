import React, { useContext } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { RouterContext } from './component/Router'

// hoc
export default function withRouter(Component) {
  const WrapComponent = (props: any) => {
    const { wrapComponentRef, ...remainingProps } = props
    const context = useContext(RouterContext)
    return <Component {...remainingProps} ref={wrapComponentRef} {...context} />
  }
  return hoistStatics(WrapComponent, Component)
}
