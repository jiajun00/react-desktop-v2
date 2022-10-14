# Table 通用表格组件

## 基本用法

```typescript jsx
import Table from '@/components/Table'

const [tableLoading, setTableLoading] = React.useState<boolean>(false)
const [dataSource, setDataSource] = React.useState<DataSource>({
  current: 0,
  list: [],
  total: 0,
  totalPage: 0
})

const getList = (values: RoleListParams) => {
  setTableLoading(true)
  const params = {
    ...values
  }
  getRoleList(params, res => {
    const { data } = res
    setDataSource(data)
    setTableLoading(false)
  })
}

const columns = [
  {
    title: '角色名',
    dataIndex: 'roleName',
    key: 'roleName',
    width: 120
  },
  {
    title: '操作',
    dataIndex: 'id',
    width: 100,
    render: (id: string, record: RoleData) => {
      return (
        <Space size="middle">
          <a>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined onClick={() => console.log(id)} />
          </a>
        </Space>
      )
    }
  }
];

<Table
  rowKey="id"
  loading={tableLoading}
  dataSource={dataSource}
  columns={columns}
  search={{
    placeholder: '请输入角色名搜索',
    name: 'roleName'
  }}
  reload
  getData={getList}
  addFun={() => console.log('add')}
  deleteFun={values => console.log(values)}
/>
```

## API

| 参数         | 说明                       | 类型                                                               | 默认值                       |     必传     |
|------------|--------------------------|------------------------------------------------------------------|---------------------------|:----------:|
| dataSource | 表格数据                     | [DataSource](#DataSource)                                        | -                         |     是      |
| columns    | 表格列配置                    | [ColumnsType](https://ant.design/components/table-cn/#Column) [] | -                         |     是      |
| rowKey     | 表格行 key 的取值，可以是字符串或一个函数  | string / (record): string                                        | key                       |     否      |
| pagination | 分页器,设为 null 或 false 时不分页 | object                                                           | {current: 1,pageSize: 10} |     否      |
| search     | 表格搜索框功能                  | [Search](#Search)                                                | -                         |     否      |
| loading    | 页面是否加载中                  | boolean                                                          | -                         |     否      |
| reload     | 页面是否显示刷新按钮               | boolean                                                          | -                         |     否      |
| getData    | 请求接口数据方法                 | (values: any): void                                              | -                         |     是      |
| deleteFun  | 批量删除方法                   | (values: React.Key[]): void                                      | -                         |     否      |
| addFun     | 批量删除方法                   | (): void                                                         | -                         |     否      |

### <div id='DataSource'>DataSource</div>

```typescript jsx
export interface DataSource {
  current: number
  totalPage: number
  total: number
  list: []
}
```

### <div id='Search'>Search</div>

```typescript jsx
export interface Search {
  placeholder?: string
  name: string
  width?: number
}
```
