import React from 'react'
import { PermissionHoc } from '../index'

const Index = () => {
  return <div>tag list</div>
}
export default PermissionHoc('tagList')(Index)
