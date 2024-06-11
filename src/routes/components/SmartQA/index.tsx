/**
 * 一键复制功能，由于代码是md格式，直接copy返回数据是不行的，但对于html嵌套结构，可以拿到最终的innerText
 * 针对整个界面禁止右键，但其中一块区域支持右键的情况，可以判断点击的event.target是不是属于可右键区域
 * element.contains(event.target)---element可右键区域
 */
import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { Alert, Input, Button, Tooltip, Spin, notification } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

import type { NotificationArgsProps } from 'antd'

import { getResponse } from 'utils/utils'
import request from 'utils/request'
import ReactMarkdown from 'react-markdown'
import noCommentSvg from './assets/no_comment.svg'
import ApprovalComment from './ApprovalComment'
import styles from './index.less'

const { TextArea } = Input
type NotificationPlacement = NotificationArgsProps['placement']
function SmartQA() {
  const listRef = useRef()
  const [api, contextHolder] = notification.useNotification()
  const [state, setState] = useState({
    data: [],
    loading: false,
    queryFlag: false,
    question: '',
  })

  useEffect(() => {
    if (listRef.current) {
      listRef.current.data = state.data
      listRef.current.scroll(0, listRef.current.scrollHeight)
    }
  }, [state.data])

  // 问题回复
  useEffect(() => {
    // 查询flag为true则触发查询
    if (!state.queryFlag) {
      return
    }
    const { message } = state.data[state.data.length - 1]
    setState(preState => ({
      ...preState,
      loading: true,
    }))
    request(`/test/quest`, {
      method: 'POST',
      body: {
        message,
      },
      responseType: 'text',
    })
      .then(res => {
        if (getResponse(res)) {
          const timestamp = new Date().getTime()
          const newData = [...state.data, { message: res, self: false, id: timestamp }]
          setState(preState => ({
            ...preState,
            data: newData,
            loading: false,
            queryFlag: false,
          }))
        }
      })
      .finally(() => {
        setState(preState => ({
          ...preState,
          loading: false,
          queryFlag: false,
        }))
      })
  }, [state.data, state.queryFlag])

  // 清空会话
  const handleClearChat = () => {
    setState(preState => ({
      ...preState,
      data: [],
    }))
  }

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `请输入消息内容！`,
      placement,
    })
  }

  const handleSend = useCallback(() => {
    const { question } = state
    if (!question) {
      openNotification('bottom')
      return
    }
    const timestamp = new Date().getTime()
    const newData = [...state.data, { message: question, self: true, id: timestamp }]
    setState(preState => ({
      ...preState,
      data: newData,
      queryFlag: true,
      question: '',
    }))
  }, [state.question, state.data])

  // 一键复制
  const handleCopyAll = useCallback(id => {
    const inputElement = document.querySelector(`.${id}`)
    // 将自定义的内容放入剪贴板中
    if (inputElement && inputElement.innerText) {
      navigator.clipboard.writeText(inputElement.innerText).then(() => <Alert message='复制成功' type='success' />)
    }
  }, [])

  const renderCommentItem = useCallback(messageItem => {
    const { self, message, id } = messageItem
    return (
      <div key={id} id={`comment-item-${id}`} className={styles['comment-item']}>
        <div
          className={classnames(styles['comment-item-name'], {
            [styles['align-left']]: !self,
            [styles['align-right']]: self,
          })}
        >
          {!self && '智能助手'}
        </div>
        <div
          className={classnames(styles['comment-item-content'], {
            [styles['left-content']]: !self,
            [styles['right-content']]: self,
          })}
        >
          <div
            className={classnames(styles['comment-item-content-arrow'], {
              [styles['arrow-left']]: !self,
              [styles['arrow-right']]: self,
            })}
          />
          <div className={styles['comment-item-content-main']}>
            {self ? (
              <ApprovalComment data={message} />
            ) : (
              <>
                <ReactMarkdown className={`comment-item-content-markdown-${id}`}>{message}</ReactMarkdown>
              </>
            )}
          </div>
          {!self && (
            <Tooltip title='一键复制'>
              <CopyOutlined onClick={() => handleCopyAll(`comment-item-content-markdown-${id}`)} />
            </Tooltip>
          )}
        </div>
      </div>
    )
  }, [])

  const renderCommentList = useMemo(() => {
    if (!state.data || !state.data.length) {
      return (
        <div className={styles['empty-comment']}>
          <div className={styles['empty-comment-pic']}>
            <img src={noCommentSvg} />
          </div>
          <div className={styles['empty-comment-word']}>暂无消息</div>
        </div>
      )
    }
    return (
      <>
        {state.data.map(renderCommentItem)}
        <div className={styles['comment-item-content-loading']}>
          <Spin spinning={state.loading} />
        </div>
      </>
    )
  }, [state.data, state.loading, renderCommentItem])

  return (
    <div className={styles['comment-container']} id='smart-qa'>
      <div className={styles['comment-list']} ref={listRef}>
        {renderCommentList}
      </div>
      <div className={styles['comment-clear']}>
        <span onClick={handleClearChat}>清空会话</span>
      </div>
      <div className={styles['comment-editor']}>
        <TextArea value={state.question} name='comment' variant='borderless' placeholder='给智能助手发送消息' />
        <div className={styles['editor-btn']}>
          <Button style={{ marginLeft: 0, marginRight: '8px' }} onClick={handleSend}>
            发送
          </Button>
        </div>
      </div>
      {contextHolder}
    </div>
  )
}

export default SmartQA
