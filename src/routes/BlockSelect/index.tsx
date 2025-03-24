import React, { useState, useEffect } from 'react'
import { Card, Typography, message } from 'antd'
import styles from './index.less'

const { Title, Paragraph } = Typography

const BlockSelect: React.FC = () => {
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null)
  const [selectedText, setSelectedText] = useState('')

  // 处理右键菜单
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    // 选中的内容
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      setSelectedText(selection.toString())
      setContextMenuPosition({
        x: event.clientX,
        y: event.clientY,
      })
    }
  }

  // 处理块选择点击
  const handleBlockSelect = async () => {
    if (selectedText) {
      try {
        await navigator.clipboard.writeText(selectedText)
        message.success('内容已复制到剪贴板')
      } catch (err) {
        message.error('复制失败')
      }
    }
    setContextMenuPosition(null)
  }

  // 点击其他区域关闭菜单
  useEffect(() => {
    const handleClick = () => setContextMenuPosition(null)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className={styles.container}>
      <Card>
        <Title level={2}>块选择演示</Title>
        <div onContextMenu={handleContextMenu}>
          <Paragraph>
            这是一段示例文本，你可以选中任意部分，然后点击右键， 在弹出的菜单中选择"块选择"选项来复制选中的内容。
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Paragraph>
          <Paragraph>
            你可以选择任意文本内容，包括多行文本。 选中后点击右键，然后点击"块选择"即可复制内容到剪贴板。
          </Paragraph>
        </div>

        {/* 自定义右键菜单 */}
        {contextMenuPosition && (
          <div
            className={styles.contextMenu}
            style={{
              left: contextMenuPosition.x,
              top: contextMenuPosition.y,
            }}
          >
            <div className={styles.menuItem} onClick={handleBlockSelect}>
              块选择
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default BlockSelect
