# ImageComponent

## 基本用法

### 图片
```typescript jsx
<ImageComponent image={{
  type: IMAGE_TYPE.IMG,
  src: ''
}}/>
```

### ant design图标
```typescript jsx
<ImageComponent image={{
  type: IMAGE_TYPE.ANTD,
  name: 'PicRightOutlined'
}}/>
```

## API

| 参数        | 说明                   | 类型              | 默认值 |
|-----------|----------------------|-----------------|-----|
| image     | 图片对象                 | [Image](#image) | -   |
| className | 最外层 div className 属性 | string          | -   |
| style     | 最外层 div style 属性     | CSSProperties   | -   |

### <div id='image'>Image<div>
```typescript jsx
export interface Image {
  type: number
  src?: string
  name?: string
}
```

### type 类型常量
```typescript jsx
// 图标类型
const IMAGE_TYPE = {
  IMG: 0, // 图片
  ANTD: 1, // ant design
  ALI: 2 // 阿里图标库
}
```
