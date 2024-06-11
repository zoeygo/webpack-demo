import React, { Component } from 'react';
import classnames from 'classnames';
import { Icon } from 'choerodon-ui';
import { Bind } from 'lodash-decorators';

import intl from 'utils/intl';

import styles from './index.less';

const lineHeight = 18;

export default class ApprovalComment extends Component {
  contentRef;

  state = {
    overflow: false,
    expand: false,
    expendInnerHtml: '',
    openInnerHtml: '',
  };

  componentDidMount() {
    const { attachment = null } = this.props;
    if (this.contentRef && this.contentRef.offsetHeight > lineHeight * 3) {
      this.setState({ overflow: true });
      const text = this.contentRef.innerHTML;
      if (text && text.length) {
        // 记录原始的文本
        this.setState({ openInnerHtml: text });
        // 记录第三行的长度 用于判断在合适的地方添加 ...
        let thirdRowSize = 0;
        for (let i = 0; i <= text.length; i++) {
          this.contentRef.innerHTML = text.substr(0, i);
          // 第三行长度
          if (this.contentRef.offsetHeight > lineHeight * 2) {
            // 中文比英文和数字要宽
            if (/^[\u4e00-\u9fa5]$/.test(text[i])) {
              thirdRowSize += 0.5;
            }
            thirdRowSize++;
          }
          if (this.contentRef.offsetHeight > lineHeight * 3) {
            // 为查看附件按钮空出位置
            const maxSize = attachment && attachment() ? 40 : 50;
            // 当第三行的长度长于40时，就要多截取一部分，给展开按钮空出位置 否则直接将...加在后面
            const resultText =
              thirdRowSize < maxSize
                ? `${text.substr(0, i - 2)}...`
                : `${text.substr(0, i - (thirdRowSize - maxSize) - 2)}...`;
            this.contentRef.innerHTML = resultText; // `${text.substr(0, i-3)}...`;
            // 记录截取后的文本
            this.setState({ expendInnerHtml: resultText });
            break;
          }
        }
      }
    }
  }

  @Bind()
  handleExpand() {
    const { expand, expendInnerHtml, openInnerHtml } = this.state;
    if (this.contentRef && expendInnerHtml && openInnerHtml) {
      this.contentRef.innerHTML = expand ? expendInnerHtml : openInnerHtml;
    }
    this.setState({
      expand: !expand,
    });
  }

  render() {
    const { data, attachment = null, className } = this.props;
    const { overflow, expand } = this.state;
    return (
      <div
        className={classnames(
          {
            [styles['content-wrap']]: !expand,
            [styles['content-expand']]: expand,
          },
          className
        )}
      >
        {!expand && (
          <span
            className={classnames({
              [styles['content-expand-button-div-expend']]: overflow,
              [styles['content-expand-button-div-notOverflow']]: !overflow,
            })}
          >
            {attachment && !overflow && attachment()}
            {overflow && (
              <>
                <span>{attachment && attachment()}</span>
                <a onClick={this.handleExpand} className={styles['content-expand-button']}>
                  {intl.get('hzero.common.button.expand').d('展开')}
                  <Icon type="expand_more" style={{ verticalAlign: 'sub' }} />
                </a>
              </>
            )}
          </span>
        )}
        <span
          className={styles['content-pre']}
          ref={(ref) => {
            this.contentRef = ref;
          }}
        >
          {data}
        </span>
        {overflow && expand && (
          <div style={{ height: 18, display: 'flex' }}>
            <span>
              {attachment && !overflow && attachment()}
              {overflow && (
                <>
                  <span>{attachment && attachment()}</span>
                  <a onClick={this.handleExpand}>
                    {intl.get('hzero.common.button.up').d('收起')}
                    <Icon type="expand_less" style={{ verticalAlign: 'sub' }} />
                  </a>
                </>
              )}
            </span>
          </div>
        )}
      </div>
    );
  }
}
