import React, { useState, useRef, useEffect } from 'react'
import { Button, Slider, Space, Typography } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'

const { Title } = Typography

const TextToSpeech: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Sample rich text content
  const content = `
    <h2>欢迎使用文本转语音功能</h2>
    <p>这是一个示例文本，展示了文本转语音的功能。您可以：</p>
    <ul>
      <li>点击播放按钮开始播放</li>
      <li>使用滑块调节播放速度</li>
      <li>随时暂停或继续播放</li>
    </ul>
    <p>这个功能使用了Web Speech API，支持多种语言和声音。</p>
  `

  useEffect(() => {
    // 打印浏览器支持情况
    if ('speechSynthesis' in window) {
      console.log('===SpeechSynthesis is supported!===')
    } else {
      console.log('===SpeechSynthesis is not supported.===')
      return
    }
    // 大刷新不进入return，因此加上cancel
    window.speechSynthesis.cancel()
    // Create a temporary div to parse HTML content
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content

    // Get all text content
    const textContent = tempDiv.innerText

    // Initialize speech synthesis
    const utterance = new SpeechSynthesisUtterance(textContent)
    utterance.lang = 'zh-CN' // Set language to Chinese
    utterance.rate = playbackRate

    // Add event listeners
    utterance.onend = () => {
      setIsPlaying(false)
    }
    utterance.onerror = () => {
      setIsPlaying(false)
    }

    utteranceRef.current = utterance

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const handlePlayPause = () => {
    if (!utteranceRef.current) return
    if (isPlaying) {
      window.speechSynthesis.pause()
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      } else {
        window.speechSynthesis.speak(utteranceRef.current)
      }
    }
    setIsPlaying(!isPlaying)
  }

  const handleSpeedChange = (value: number) => {
    setPlaybackRate(value)
    if (utteranceRef.current) {
      utteranceRef.current.rate = value

      if (isPlaying) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume()
        } else {
          window.speechSynthesis.cancel()
          window.speechSynthesis.speak(utteranceRef.current)
        }
      }
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>文本转语音播放</Title>

      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />

        <Space>
          <Button
            type='primary'
            icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            onClick={handlePlayPause}
          >
            {isPlaying ? '暂停' : '播放'}
          </Button>

          <Space>
            <span>播放速度：</span>
            <Slider
              min={0.5}
              max={2}
              step={0.1}
              value={playbackRate}
              onChange={handleSpeedChange}
              style={{ width: 200 }}
            />
            <span>{playbackRate}x</span>
          </Space>
        </Space>
      </Space>
    </div>
  )
}

export default TextToSpeech
