import React from 'react'
import { PermissionHoc } from '../index'

const Index = () => {
  return <div>write doc</div>
}
export default PermissionHoc('writeDoc')(Index)
