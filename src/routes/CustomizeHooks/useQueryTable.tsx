/**
 * @param defaultQuery 表单查询默认参数
 * @param api 表格
 */
import { useRef, useCallback, useEffect, useState } from 'react'
import { notification } from 'antd'

interface DefaultQueryProps {
  page?: number | string
  pageSize?: number | string
  [x: string]: any
}

interface FormDataProps {
  [x: string]: any
}

function useQueryTable(defaultQuery: DefaultQueryProps = {}, api) {
  // 保存查询表格表单信息
  const formData: FormDataProps = useRef({})
  // 保存查询表格分页信息
  const pagination = useRef({
    page: defaultQuery.page || 1,
    pageSize: defaultQuery.pageSize || 10,
  })

  // 强制更新
  const [, forceUpdate] = useState(null)

  // 请求表格数据
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
    current: 1,
  })

  // 请求列表数据
  // 以api作为依赖项，当api改变，重新声明getList
  const getList = useCallback(
    async function (payload = {}) {
      if (!api) return
      const data = (await api({ ...defaultQuery, ...payload, ...pagination.current, ...formData.current })) || {}
      if (data.code === 200) {
        setTableData({
          list: data.list,
          current: data.current,
          total: data.total,
        })
      } else {
        notification.warning({
          message: data.message,
        })
      }
    },
    [api]
  )

  // 改变表单单元项
  const setformitem = useCallback(function (key, value) {
    const form = formData.current
    form[key] = value
    // forceUpdate每一次都能更新，不会造成state相等的情况
    forceUpdate({})
  }, [])

  // 重置表单
  const reset = useCallback(
    function () {
      const current = formData.current
      for (let name in current) {
        current[name] = ''
      }
      pagination.current.page = defaultQuery.page || 1
      pagination.current.pageSize = defaultQuery.pageSize || 10
      // 请求数据
      getList()
    },
    [getList]
  )

  // 处理分页逻辑
  const handleChange = useCallback(
    async function (page, pageSize) {
      pagination.current = {
        page,
        pageSize,
      }
      getList()
    },
    [getList]
  )

  // 初始化请求数据
  useEffect(() => {
    getList()
  }, [])

  // 组合暴露参数
  return [
    {
      // 组合表格状态
      tableData,
      handleChange,
      getList,
      pagination: pagination.current,
    },
    {
      // 组合搜索表单状态
      formData: formData.current,
      setformitem,
      reset,
    },
  ]
}
export default useQueryTable
