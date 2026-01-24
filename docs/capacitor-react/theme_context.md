# 主题 (Theme) 实现指南

## 概述

本项目采用 React Context API 实现主题系统，支持浅色、深色和跟随系统三种主题模式。通过单例模式的 UserConfig 类管理用户主题偏好，使用 React Context Provider 将主题注入到所有子组件中，实现全局主题管理和响应式更新。

### 核心特性

- **轻量级**：基于 React Context API，无额外依赖
- **类型安全**：完整的 TypeScript 类型定义
- **响应式**：主题变化自动更新所有子组件
- **持久化**：主题设置保存到 localStorage
- **系统跟随**：支持跟随系统主题自动切换
- **移动端优化**：应用唤醒时重新检测系统主题

### 支持的主题模式

- **light**：浅色主题
- **dark**：深色主题
- **system**：跟随系统主题（默认）

## 架构设计

### 目录结构

```
capacitor-react/src/
├── context/
│   └── ThemeContext.tsx    # 主题上下文和 Provider
├── config/
│   └── UserConfig.ts        # 用户配置管理（包含主题设置）
├── components/
│   ├── App.tsx             # 应用主入口（包裹 AppearanceProvider）
│   ├── Drawer.tsx          # 抽屉菜单（主题切换示例）
│   ├── Header.tsx          # 顶部导航栏（使用主题）
│   ├── Footer.tsx          # 底部导航栏（使用主题）
│   ├── Post.tsx            # 日记条目（使用主题）
│   └── Chat.tsx            # 聊天窗口（使用主题）
```

### 数据流向

```
用户操作 (点击主题切换)
    ↓
Drawer.tsx (调用 setAppearance)
    ↓
ThemeContext.handleSetAppearance
    ↓
UserConfig.setAppearance (保存到 localStorage)
    ↓
ThemeContext.refreshTheme (刷新主题)
    ↓
ThemeContext.setAppearance (更新 React 状态)
    ↓
所有子组件重新渲染 (使用新的主题)
```

### 系统主题检测流程

```
系统主题变化
    ↓
window.matchMedia 触发 change 事件
    ↓
ThemeContext.systemThemeHandler
    ↓
检查当前配置是否为 'system'
    ↓
如果是，调用 refreshTheme
    ↓
更新所有子组件主题

应用从后台唤醒
    ↓
Capacitor App 触发 resume 事件
    ↓
ThemeContext.appListener
    ↓
检查当前配置是否为 'system'
    ↓
如果是，调用 refreshTheme
    ↓
重新检测系统主题并更新
```

## 核心组件

### 1. 主题类型定义 ([UserConfig.ts](../../capacitor-react/src/config/UserConfig.ts))

```typescript
export type Appearance = 'light' | 'dark' | 'system'
```

### 2. 主题上下文 ([ThemeContext.tsx](../../capacitor-react/src/context/ThemeContext.tsx))

```typescript
interface AppearanceContextType {
  appearance: 'light' | 'dark'
  setAppearance: (appearance: Appearance) => void
}

export function AppearanceProvider({ children }: AppearanceProviderProps)

export function useAppearance(): AppearanceContextType
```

**核心方法说明：**

- `getSystemTheme()`: 获取系统主题（light/dark）
- `getSystemThemeFromConfig(configAppearance)`: 将配置的主题转换为实际主题
- `addSystemThemeListener(handler)`: 添加系统主题监听
- `removeSystemThemeListener(handler)`: 移除系统主题监听
- `refreshTheme()`: 刷新主题（统一入口）
- `useAppearance()`: 获取当前主题和设置主题的 Hook

### 3. 用户配置管理 ([UserConfig.ts](../../capacitor-react/src/config/UserConfig.ts))

```typescript
class UserConfig {
  getAppearance(): Appearance
  setAppearance(appearance: Appearance): void
  private saveToStorage(): void
  private loadFromStorage(): void
}
```

负责管理用户的主题偏好设置，使用 localStorage 持久化存储。

## 使用方式

### 基本使用

在组件中使用 `useAppearance` Hook 获取主题：

```typescript
import { useAppearance } from '../context/ThemeContext'

function MyComponent() {
  const { appearance } = useAppearance()

  return (
    <div>
      <p>当前主题: {appearance}</p>
    </div>
  )
}
```

### 主题切换

在设置页面提供主题切换功能：

```typescript
import { useAppearance } from '../context/ThemeContext'

function Settings() {
  const { appearance, setAppearance } = useAppearance()

  const handleThemeToggle = () => {
    const newAppearance = appearance === 'light' ? 'dark' : 'light'
    setAppearance(newAppearance)
  }

  return (
    <button onClick={handleThemeToggle}>
      切换主题
    </button>
  )
}
```

### 三种模式循环切换

支持 light → dark → system → light 的循环切换：

```typescript
import { useAppearance } from '../context/ThemeContext'
import { userConfig, Appearance } from '../config/UserConfig'

function Settings() {
  const { setAppearance } = useAppearance()
  const [currentAppearance, setCurrentAppearance] = useState<Appearance>(userConfig.getAppearance())

  const handleAppearanceToggle = () => {
    const appearanceOrder: Appearance[] = ['light', 'dark', 'system']
    const currentIndex = appearanceOrder.indexOf(currentAppearance)
    const nextIndex = (currentIndex + 1) % appearanceOrder.length
    const newAppearance = appearanceOrder[nextIndex]
    
    setCurrentAppearance(newAppearance)
    setAppearance(newAppearance)
  }

  return (
    <button onClick={handleAppearanceToggle}>
      {getAppearanceText()}
    </button>
  )
}
```

## 开发指南

### 1. 新增组件时如何获取主题

当创建新的组件时，按照以下步骤操作：

#### 步骤一：导入 useAppearance Hook

在组件文件顶部导入 `useAppearance`：

```typescript
import { useAppearance } from '../context/ThemeContext'
```

#### 步骤二：使用 useAppearance 获取主题

在组件中调用 `useAppearance()` Hook：

```typescript
export function MyComponent() {
  const { appearance } = useAppearance()

  return (
    <div>
      {/* 组件内容 */}
    </div>
  )
}
```

#### 步骤三：在 styled-components 中使用主题

使用 `$appearance` 属性将主题传递给 styled-components：

```typescript
import styled from 'styled-components'
import { useAppearance } from '../context/ThemeContext'

const Container = styled.div<{ $appearance: 'light' | 'dark' }>`
  background-color: ${props => props.$appearance === 'light' ? '#ffffff' : '#1a1a1a'};
  color: ${props => props.$appearance === 'light' ? '#333333' : '#e0e0e0'};
`

export function MyComponent() {
  const { appearance } = useAppearance()

  return (
    <Container $appearance={appearance}>
      {/* 组件内容 */}
    </Container>
  )
}
```

### 2. 动态响应主题变更

所有使用 `useAppearance` Hook 的组件都会自动响应主题变更，无需额外处理。当主题变化时，React 会自动重新渲染这些组件。

```typescript
import { useAppearance } from '../context/ThemeContext'

export function MyComponent() {
  const { appearance } = useAppearance()

  // 当 appearance 变化时，组件会自动重新渲染
  return (
    <div style={{ 
      backgroundColor: appearance === 'light' ? '#fff' : '#000' 
    }}>
      当前主题: {appearance}
    </div>
  )
}
```

## 最佳实践

### 命名规范

#### 主题属性命名

- 使用 `$` 前缀表示 transient props（styled-components）
- 使用字面量类型 `'light' | 'dark'` 而不是类型别名

```typescript
// ✅ 推荐的命名方式
const Container = styled.div<{ $appearance: 'light' | 'dark' }>`
  background-color: ${props => props.$appearance === 'light' ? '#fff' : '#000'};
`

// ❌ 不推荐的命名方式
const Container = styled.div<{ appearance: Appearance }>`
  background-color: ${props => props.appearance === 'light' ? '#fff' : '#000'};
`
```

### 组件开发规范

#### 必须使用主题的场景

- 所有用户可见的组件
- 需要响应主题变化的样式
- 背景色、文字颜色等视觉元素

#### 不需要使用主题的场景

- 纯逻辑组件（无 UI）
- 主题无关的工具函数
- 第三方组件的包装器（如果不需要自定义样式）

#### 组件模板

创建新组件时，使用以下模板：

```typescript
import styled from 'styled-components'
import { useAppearance } from '../context/ThemeContext'

interface MyComponentProps {
  // 组件属性定义
}

const Container = styled.div<{ $appearance: 'light' | 'dark' }>`
  background-color: ${props => props.$appearance === 'light' ? '#ffffff' : '#1a1a1a'};
  color: ${props => props.$appearance === 'light' ? '#333333' : '#e0e0e0'};
`

export function MyComponent({ ... }: MyComponentProps) {
  const { appearance } = useAppearance()

  return (
    <Container $appearance={appearance}>
      {/* 组件内容 */}
    </Container>
  )
}
```

### 性能优化

- 避免在渲染循环中频繁调用 `useAppearance()`
- 对于静态主题，可以在组件外部缓存主题值
- 合理使用 React.memo 优化性能

```typescript
// ✅ 推荐：在组件内部使用
export function MyComponent() {
  const { appearance } = useAppearance()
  return <div>{appearance}</div>
}

// ❌ 不推荐：在渲染循环中频繁调用
export function MyComponent() {
  return (
    <div>
      {Array(100).fill(0).map((_, i) => {
        const { appearance } = useAppearance()
        return <div key={i}>{appearance}</div>
      })}
    </div>
  )
}
```

## 扩展指南

### 添加新主题模式

如需添加新的主题模式（如 'auto'、'custom' 等），按照以下步骤：

1. 在 `Appearance` 类型中添加新模式：

```typescript
export type Appearance = 'light' | 'dark' | 'system' | 'custom'
```

2. 在 `getSystemThemeFromConfig` 函数中添加处理逻辑：

```typescript
function getSystemThemeFromConfig(configAppearance: Appearance): 'light' | 'dark' {
  if (configAppearance === 'system') {
    return getSystemTheme()
  }
  if (configAppearance === 'custom') {
    return getCustomTheme()
  }
  return configAppearance
}
```

3. 更新主题切换逻辑以支持新模式

### 自定义主题颜色

如需支持自定义主题颜色，可以扩展主题系统：

```typescript
interface ThemeColors {
  background: string
  foreground: string
  primary: string
  secondary: string
}

const lightTheme: ThemeColors = {
  background: '#ffffff',
  foreground: '#333333',
  primary: '#4a6fa5',
  secondary: '#6a9fd5'
}

const darkTheme: ThemeColors = {
  background: '#1a1a1a',
  foreground: '#e0e0e0',
  primary: '#6a9fd5',
  secondary: '#4a6fa5'
}

// 在 ThemeContext 中提供完整的主题对象
interface AppearanceContextType {
  appearance: 'light' | 'dark'
  theme: ThemeColors
  setAppearance: (appearance: Appearance) => void
}
```

## 常见问题

### Q: System 主题是如何工作的？

A: System 主题模式通过 `window.matchMedia('(prefers-color-scheme: dark)')` 检测系统主题偏好。当用户选择 system 模式时，应用会自动跟随系统主题变化。系统主题变化时，会触发 `change` 事件，应用监听该事件并更新所有子组件。此外，当应用从后台唤醒时，也会重新检测系统主题，确保主题同步。

### Q: 为什么子组件只接收 'light' | 'dark'，而不接收 'system'？

A: 'system' 只是一个配置选项，表示"跟随系统"。在 ThemeContext 内部，我们会将 'system' 转换为实际的 'light' 或 'dark' 主题。这样设计的好处是：
- 子组件无需关心 system 模式的逻辑
- 简化了子组件的主题处理
- 保持了主题系统的内聚性

### Q: 如何在非 React 环境中使用主题？

A: 可以直接使用 `UserConfig` 单例获取和设置主题：

```typescript
import { userConfig } from './config/UserConfig'

// 获取主题
const appearance = userConfig.getAppearance()
console.log('当前主题:', appearance)

// 设置主题
userConfig.setAppearance('dark')
```

注意：在非 React 环境中修改主题后，React 组件不会自动更新，需要手动触发刷新。

### Q: 主题切换会影响性能吗？

A: 主题切换的性能影响很小。使用 React Context API，只有使用 `useAppearance` Hook 的组件会在主题变化时重新渲染。建议：
- 合理使用 React.memo 避免不必要的渲染
- 避免在大型组件树的根节点使用主题
- 将主题相关的样式抽取到独立的组件中

### Q: 如何在开发时测试主题切换？

A: 可以通过以下方式测试：
1. 在 Drawer 中点击主题切换按钮
2. 修改系统主题设置（测试 system 模式）
3. 直接调用 `userConfig.setAppearance()` 修改配置
4. 使用浏览器开发者工具模拟系统主题变化

### Q: 主题设置会持久化吗？

A: 是的，主题设置会保存到 localStorage。当用户刷新页面或重新打开应用时，会自动加载之前保存的主题设置。

## 参考资源

- [ThemeContext.tsx](../../capacitor-react/src/context/ThemeContext.tsx) - 主题上下文和 Provider 实现
- [UserConfig.ts](../../capacitor-react/src/config/UserConfig.ts) - 用户配置管理
- [App.tsx](../../capacitor-react/src/App.tsx) - 应用初始化示例
- [Drawer.tsx](../../capacitor-react/src/components/navigation/Drawer.tsx) - 主题切换示例
- [i18n.md](./i18n.md) - 国际化实现指南（参考文档）
