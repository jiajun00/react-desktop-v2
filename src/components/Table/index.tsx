import React from 'react'
import styles from './index.module.scss'
import { PlusOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons'
import type { PaginationProps, TableProps } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import { Button, Space, Table as TableComponent, Input } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'
import { FilterValue } from 'antd/es/table/interface'

export interface Search {
  placeholder?: string
  name: string
  width?: number
}

export interface DataSource {
  list: any[]
  current?: number
  totalPage?: number
  total?: number
}

interface Props {
  dataSource: DataSource
  columns: any[]
  rowKey?: string | { (record: any): string }
  pagination?: TablePaginationConfig | null | false
  search?: Search
  loading?: boolean
  reload?: boolean
  getData: { (values: any): void }
  deleteFun?: { (values: React.Key[]): void }
  addFun?: { (): void }
  rowSelection?: TableRowSelection<any>
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
  pagination,
  search,
  loading = false,
  reload,
  getData,
  deleteFun,
  addFun,
  rowSelection
}) => {
  const searchRef = React.useRef<any>(null)
  let initPaginationConfig = null
  if (pagination === undefined) {
    initPaginationConfig = {
      current: 1,
      pageSize: 10
    }
  } else {
    if (pagination === null || pagination === false) {
      pagination = null
    } else {
      initPaginationConfig = pagination
    }
  }
  const [paginationConfig, setPaginationConfig] =
    React.useState<TablePaginationConfig | null>(initPaginationConfig)
  const [selectRowKeys, setSelectRowKeys] = React.useState<React.Key[]>([])
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setPaginationConfig(prevState => ({
      ...prevState,
      current,
      pageSize
    }))
  }
  React.useEffect(() => {
    getData({ ...paginationConfig })
  }, [paginationConfig]) // eslint-disable-line
  const tableProps: TableProps<any> = {
    rowKey: rowKey,
    dataSource: dataSource.list,
    columns: columns,
    loading: loading
  }
  if (paginationConfig) {
    tableProps.pagination = {
      showSizeChanger: true,
      onShowSizeChange: onShowSizeChange,
      ...paginationConfig
    }
  }
  if (deleteFun) {
    tableProps.rowSelection = {
      type: 'checkbox',
      onChange: (selectedRowKeys: React.Key[]) => {
        setSelectRowKeys(selectedRowKeys)
      }
    }
  }
  if (rowSelection) {
    tableProps.rowSelection = rowSelection
  }
  return (
    <div className={styles.tableBox}>
      <div className={styles.tableHeader}>
        <div className={styles.search}>
          {search && (
            <Input.Search
              ref={searchRef}
              style={{ width: search.width || 330 }}
              placeholder={search.placeholder || '请输入搜索内容'}
              onSearch={(value: string) =>
                getData({
                  ...paginationConfig,
                  [search.name]: value
                })
              }
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
                  const params = {
                    ...paginationConfig
                  } as any
                  if (searchRef.current && search) {
                    params[search.name] = searchRef.current.input.value
                  }
                  getData(params)
                }}>
                <RedoOutlined />
              </Button>
            )}
            {addFun && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => addFun()}>
                新增
              </Button>
            )}
            {deleteFun && (
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
                disabled={selectRowKeys.length === 0}
                onClick={() => deleteFun(selectRowKeys)}>
                批量删除
              </Button>
            )}
          </Space>
        </div>
      </div>
      <div className={styles.table}>
        <TableComponent {...tableProps} />
        <div className={styles.dataBox}>
          {dataSource.total && <div className={styles.total}>共50条</div>}
          {paginationConfig && (
            <>
              <div className={styles.current}>第1页</div>/
              <div className={styles.totalPage}>共5页</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Table
