import React, { useState } from 'react'
import { Card, Typography, Space } from 'antd'
import styles from './index.less'

const { Title, Paragraph } = Typography

const PasteDemo: React.FC = () => {
  const [pastedText, setPastedText] = useState<string>('')
  const [pastedFiles, setPastedFiles] = useState<File[]>([])
  const [pastedImages, setPastedImages] = useState<string[]>([])

  const handlePaste = (event: React.ClipboardEvent) => {
    // 阻止默认事件
    event.preventDefault()
    const clipboardData = event.clipboardData

    // 获取文本内容并转换为数组
    const text = clipboardData.getData('text')
    if (text) {
      // 使用换行符分割文本
      // JSON.stringify(item) 即可查看到带换行符的内容
      // const textArray = text.includes('\r\n')
      //   ? text.split('\r\n')
      //   : text.includes('\n')
      //   ? text.split('\n')
      //   : text.includes('\n')
      //   ? text.split('\r')
      //   : text.split('\r')
      setPastedText(text)
    }

    // 处理文件
    const files = Array.from(clipboardData.files)
    if (files.length > 0) {
      setPastedFiles(files)
    }

    // 处理图片
    const items = clipboardData.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile()
        if (blob) {
          const reader = new FileReader()
          reader.onload = e => {
            setPastedImages(prev => [...prev, e.target?.result as string])
          }
          reader.readAsDataURL(blob)
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        <Title level={2}>粘贴内容获取演示</Title>

        <Card className={styles.pasteArea} tabIndex={0} onPaste={handlePaste}>
          <Paragraph>
            请在此区域按 Ctrl+V (Windows) 或 Command+V (Mac) 进行粘贴， 或选中文本后点击右键使用块选择功能
          </Paragraph>
          {pastedText && (
            <Card title='内容' size='small'>
              <pre className={styles.content}>{pastedText}</pre>
            </Card>
          )}

          {pastedFiles.length > 0 && (
            <Card title='粘贴的文件' size='small'>
              <ul>
                {pastedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} ({file.type}) - {Math.round(file.size / 1024)}KB
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {pastedImages.length > 0 && (
            <Card title='粘贴的图片' size='small'>
              <div className={styles.imageGrid}>
                {pastedImages.map((src, index) => (
                  <img key={index} src={src} alt={`Pasted image ${index + 1}`} className={styles.pastedImage} />
                ))}
              </div>
            </Card>
          )}
        </Card>
      </Space>
    </div>
  )
}

export default PasteDemo
