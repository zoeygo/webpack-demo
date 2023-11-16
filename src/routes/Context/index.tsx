/**
 * context使用
 * 主题色切换
 */
import React, { useContext } from 'react'

const ThemeContext = React.createContext(null) // 主题色context
const theme = {
  dark: {
    color: '#1890ff',
    background: '#1890ff',
    border: '1px solid blue',
    type: 'dark',
  },
  light: {
    color: '#fc4838',
    background: '#fc4838',
    border: '1px solid pink',
    type: 'light',
  },
}

/* useContext模式 */
function Input(props: { label?: string; placeholder?: string }) {
  const { color, border } = useContext(ThemeContext)
  const { label, placeholder } = props
  return (
    <div>
      <label style={{ color }}>{label}</label>
      <input className='input' placeholder={placeholder} style={{ border }} />
    </div>
  )
}

/* Consumer模式 */
function Box(props: any) {
  return (
    <ThemeContext.Consumer>
      {themeContextValue => {
        const { border, color } = themeContextValue
        return (
          <div className='context_box' style={{ border, color }}>
            {props.children}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

function Checkbox(props: { label?: string; name?: string; onChange?: any }) {
  const { label, name, onChange } = props
  const { type, color } = useContext(ThemeContext)
  return (
    <div className='checkbox' onClick={onChange}>
      <label htmlFor='name'>{label}</label>
      <input type='checkbox' id={name} value={type} name={name} checked={type === name} style={{ color }} />
    </div>
  )
}

// class组件contextType模式
class App extends React.PureComponent {
  // 赋值
  static contextType: React.Context<any> = ThemeContext
  render() {
    const { border, color, background, setTheme } = this.context as any
    return (
      <div className='context_app' style={{ border, color }}>
        <div className='context_change_theme'>
          <span>选择主题：</span>
          <Checkbox label='light' name='light' onChange={() => setTheme(theme.light)} />
          <Checkbox label='dark' name='dark' onChange={() => setTheme(theme.dark)} />
        </div>
        <div className='box_context'>
          <Box>
            <Input label='姓名：' placeholder='请输入姓名' />
            <Input label='年龄：' placeholder='请输入年龄' />
            <button className='okbtn' style={{ background }}>
              确定
            </button>
            <button className='cancelbtn' style={{ color }}>
              取消
            </button>
          </Box>
          <Box>
            <div className='person_des' style={{ color: '#fff', background }}>
              i am alien
            </div>
          </Box>
        </div>
      </div>
    )
  }
}

export default function Context() {
  const [themeContextValue, setThemeContext] = React.useState(theme.dark)
  // 传递颜色主题 和 改变主题的方法
  return (
    <ThemeContext.Provider value={{ ...themeContextValue, setTheme: setThemeContext }}>
      <App />
    </ThemeContext.Provider>
  )
}
