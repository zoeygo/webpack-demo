/**
 * 快捷回复
 * div支持插入标签等
 */
import { Tag } from 'antd';
import React, { memo, useRef, useCallback } from 'react';

import styles from './index.less';

let position: string | Range = ''; // 记录光标位置

interface TagProps {
    content: string,
}

const QuickReply: React.FC = () => {
    const inputRef: any = useRef(null);
    const tagText: TagProps[] = [{ content: '标签1' }, { content: '标签2' }, {content: '标签3' }, { content: '标签4' }];

    // 添加tag标签到输入框
    const addTag = useCallback((value: string) => {
        const node = document.createElement("span");
        node.style.border = "1px solid #e0e0e0";
        node.style.cursor = "pointer";
        node.style.marginLeft = "1rem";
        node.innerText = value;
        const cancelNode = document.createElement("Tag");
        cancelNode.innerText = "✕";
        cancelNode.onclick = (event: any) => {
            const target = event.target;
            if (inputRef.current) {
                inputRef.current.removeChild(target.parentElement);
            }
        };
        node.append(cancelNode);
        if (position === '') {
            // 没有div光标，则在div内容末尾插入
            inputRef.current.appendChild(node);
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
            <div className='quick-reply-content'>
                <div
                    className='quick-reply-content-input'
                    contentEditable="true"
                    ref={inputRef}
                    onBlur={handleBlur}
                />
                <div className='quick-reply-content-tag'>
                    {
                        tagText.map((item, index) =>
                            <Tag
                                onClick={() => addTag(item.content)}
                                key={`tag_${index}`}
                            >
                                {item.content}
                            </Tag>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default memo(QuickReply);