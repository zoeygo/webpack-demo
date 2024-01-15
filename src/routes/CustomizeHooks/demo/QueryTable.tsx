import React, { useMemo } from 'react'
import { Input, Select, Table } from 'antd'

import { getRandom } from '@/routes/utils'
import useQueryTable from '../useQueryTable'

const { Option } = Select

// 模拟数据请求
function getTableData(payload) {
  return new Promise(resolve => {
    Promise.resolve().then(() => {
      const { list } = listData
      // 生成三个随机数，模拟数据交互
      const arr = getRandom(3)
      resolve({
        ...listData,
        list: [list[(arr[0], list[arr[1]], list[arr[2]])]],
        total: list.length,
        current: payload.page || 1,
      })
    })
  })
}
function Index() {
  const [table, form] = useQueryTable({ pageSize: 3 }, getTableData)
  const { formData, setFormItem, reset } = form
  const { pagination, tableData, getList, handleChange } = table

  const TableRender = useMemo(() => {
    return (
      <Table
        columns={columns}
        dataSource={tableData.list}
        onChange={res => {
          handleChange(res.current, res.pageSize)
        }}
        // pagination={{ ...pagination, total: tableData.total, current: tableData.current } as TablePaginationConfig}
        rowKey='id'
      />
    )
  }, [tableData])

  return (
    <div style={{ margin: '30px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Input
          onChange={e => setFormItem('name', e.target.value)}
          placeholder='请输入名称'
          value={formData.name || ''}
        />
        <Input
          onChange={e => setFormItem('price', e.target.value)}
          placeholder='请输入价格'
          value={formData.price || ''}
        />
        <Select>
          <Option value='1'>家电</Option>
          <Option value='2'>生活用品</Option>
        </Select>
        <button onClick={getList}>提交</button>
        <button onClick={reset}>重置</button>
      </div>
      <TableRender />
    </div>
  )
}
