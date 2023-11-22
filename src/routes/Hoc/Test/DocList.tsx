import React from 'react'
import { PermissionHoc } from '../index'

const Index = () => {
  return <div>doc list</div>
}
export default PermissionHoc('docList')(Index)
