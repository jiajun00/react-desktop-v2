import React from 'react'
import styles from './index.module.scss'
import { PlusOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Space, Table as TableComponent, Input } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'
import { FilterValue } from 'antd/es/table/interface'

export interface Search {
  placeholder?: string
  onSearch: { (value: string): void }
  width?: number
}

interface Props {
  dataSource: any[]
  columns: any[]
  rowKey: string
  pagination: TablePaginationConfig | false | undefined
  search?: Search
  loading?: boolean
  reload?: { (values: any): void }
}

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

const Table: React.FC<Props> = ({
  dataSource,
  columns,
  rowKey,
  pagination = false,
  search,
  loading = false,
  reload
}) => {
  const searchRef = React.useRef<any>(null)
  return (
    <div className={styles.tableBox}>
      <div className={styles.tableHeader}>
        <div className={styles.search}>
          {search && (
            <Input.Search
              ref={searchRef}
              style={{ width: search.width || 400 }}
              placeholder={search.placeholder || '请输入搜索内容'}
              onSearch={(value: string) => search.onSearch(value)}
              enterButton
            />
          )}
        </div>
        <div className={styles.control}>
          <Space size="middle">
            {reload && (
              <Button
                type="primary"
                onClick={() => {
                  searchRef.current && reload(searchRef.current.input.value)
                }}>
                <RedoOutlined />
              </Button>
            )}
            <Button type="primary" icon={<PlusOutlined />}>
              新增
            </Button>
            <Button type="primary" icon={<DeleteOutlined />} danger>
              批量删除
            </Button>
          </Space>
        </div>
      </div>
      <TableComponent
        rowKey={rowKey}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={
          pagination
            ? {
                ...pagination,
                showSizeChanger: true
              }
            : pagination
        }
      />
    </div>
  )
}

export default Table
