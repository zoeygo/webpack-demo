import React from 'react'
import { PermissionHoc } from '../index'

const Index = () => {
  return <div>write tag</div>
}
export default PermissionHoc('writeTag')(Index)
