# View 内容块

## 基本用法

```typescript jsx
<View 
  title="标题"
  subTitle="二级标题"
  breadcrumb={[
    {name: '主页', path: '/'},
    {name: '当前页'}
  ]}>
  内容区
</View>
```

## API

| 参数         | 说明                    | 类型                                  | 默认值   |
|------------|-----------------------|-------------------------------------|-------|
| className  | 最外层 div className 属性  | string                              | -     |
| breadcrumb | 面包屑                   | [BreadcrumbData](#BreadcrumbData)[] | -     |
| back       | 后退方法                  | (e:MouseEvent) => void              | -     |
| extra      | 操作区，位于 title 行的行尾行    | ReactNode                           | -     |
| title      | 自定义标题文字               | ReactNode                           | -     |
| subTitle   | 自定义二级标题文字             | ReactNode                           | -     |
| footer     | View的页脚，一般用于渲染 TabBar | ReactNode                           | -     |
| style      | 最外层 div style 属性      | CSSProperties                       | -     |
| border     | 是否显示边框                | boolean                             | false |
| margin     | 是否显示外边距，24px          | boolean                             | true  |
| padding    | 是否显示内边距，24px          | boolean                             | true  |
| radius     | 是否边框圆角                | boolean                             | true  |

### children
View内容定义

### <div id='BreadcrumbData'>BreadcrumbData<div>

```typescript jsx
interface BreadcrumbData {
  name: string
  path?: string
}
```
