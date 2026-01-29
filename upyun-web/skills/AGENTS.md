# cloud-upyun 项目开发指令

## 项目概述

使用 React + TypeScript + Tailwind CSS + shadcn/ui 开发文件管理和图床服务管理系统

### 项目环境

- Node.js v22.11.0
- pnpm 10.28.1

### 技术栈

- React
- React-Router
- Tailwind CSS
- shadcn/ui
- TypeScript

## 开发规范

- 使用函数式组件 + Hooks
- 使用 Tailwind CSS V4 编写样式
- 使用 shadcn/ui 组件库
- 使用 TypeScript，确保类型安全，使用 interface 定义类型时，必须以`IXxxXxxx`形式
- 尽可能封装可复用组件
- 代码要有注释
- 不要硬编码，使用常量或环境变量
- 错误要有友好的提示，以及数据请求有 Loading 效果

## 设计要求

- 支持深色主题（背景`#0A0A0A`，文字`#FFFFFF`）
- 适配移动端

## 注意事项

- 保持设计简洁，不用过度设计
- 性能优化：图片使用懒加载
- 确保所有链接可点击
- 要处理 API 调用失败的情况
- 加载时要有明确的提示