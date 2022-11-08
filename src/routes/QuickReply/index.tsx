/**
 * 快捷回复
 * div支持插入标签等
 */
import { Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import React, { memo, useRef, useCallback } from 'react';

import styles from './index.less';

let position: string | Range = ''; // 记录光标位置

interface TagProps {
    content: string,
}

const QuickReply: React.FC = () => {
    const inputRef: any = useRef(null);
    const tagText: TagProps[] = [{ content: '1' }, { content: '2' }];

    // 添加tag标签到输入框
    const addTag = useCallback((value: string) => {
        const node = document.createElement("span");
        node.innerText = value;
        const cancelNode = document.createElement("span");
        cancelNode.innerHTML = `${<CloseOutlined />}`;
        cancelNode.onclick = (event: any) => {
            const target = event.target;
            if (inputRef) {
                inputRef.removeChild(target.parentElement);
            }
        };
        node.append(cancelNode);
        if (position === '') {
            // 没有div光标，则在div内容末尾插入
            inputRef.appendChild(node);
        } else if (typeof position === 'object') {
            position.insertNode(node);
        }
    }, []);

    // 输入区失焦
    const handleBlur = useCallback(() => {
        position = window.getSelection() ? window.getSelection().getRangeAt(0) : '';
    }, []);

    return (
        <div
            className={styles['quick-reply']}
        >
            <div className='drag-hr'>
                <hr />
            </div>
            <div className='quick-reply-content'>
                <div
                    className='quick-reply-content-input'
                    contentEditable="true"
                    ref={inputRef}
                    onBlur={handleBlur}
                >
                    输入区
                </div>
                <div className='quick-reply-content-tag'>
                    {
                        tagText.map(item => <Tag onClick={() => addTag(item.content)}>{item.content}</Tag>)
                    }
                </div>
            </div>
        </div>
    );
};

export default memo(QuickReply);