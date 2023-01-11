/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import * as React from 'react';
import { forwardRef, useState } from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import cx from 'classnames';

import { useCombinedRefs } from './utils';
import Stroke from './Stroke';
import Confirm from './assets/confirm.svg';
import Back from './assets/rollback.svg';
import DownLoad from './assets/download.svg';
import Close from './assets/close.svg';

interface IProps {
  type: string;
  info: { size: number; color: string };
  setInfo: any;
  onChange: (type: string, options?: { color?: string; size?: number }) => void;
  onClose: () => void;
  onCancel: () => void;
  onDownload: () => void;
  onCopy: () => void;
}

const Tools = forwardRef<HTMLDivElement, IProps>(
  ({ type, info, setInfo, onChange, onClose, onCancel, onDownload, onCopy }, ref) => {
    const [selected, setSelected] = useState('');
    const [position, setPosition] = useState<any>('bottom');
    const toolsRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, toolsRef) as any;
    const handleClick = (curType: string) => {
      const pos = (combinedRef.current as HTMLDivElement).getBoundingClientRect();
      if (pos.bottom >= window.innerHeight - pos.height - 5) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
      onChange(curType);
      setSelected(curType);
    };
    const handleClose = () => {
      onClose();
      setSelected('');
    };

    return (
      <div className="tools" ref={combinedRef}>
        <Popover
          positions={[position]}
          align="start"
          isOpen={selected === 'rect'}
          content={({ position, popoverRect }) => (
            // <ArrowContainer
            //   position={position}
            //   targetRect={targetRect}
            //   popoverRect={popoverRect}
            //   arrowColor={'#272323'}
            //   arrowSize={5}
            // >
              <Stroke
                info={info}
                onChange={options =>
                  setInfo((opt: { size?: number; color?: string }) => ({
                    ...opt,
                    ...options
                  }))
                }
              />
            // </ArrowContainer>
          )}
        >
          <div
            className={cx('tools-item tools-rect', {
              'tool-selected': type === 'rect'
            })}
            onClick={() => handleClick('rect')}
          />
        </Popover>
        <Popover
          positions={[position]}
          align="start"
          isOpen={selected === 'circle'}
          content={({ position, popoverRect }) => (
            // <ArrowContainer
            //   position={position}
            //   targetRect={targetRect}
            //   popoverRect={popoverRect}
            //   arrowColor={'#272323'}
            //   arrowSize={5}
            // >
              <Stroke
                info={info}
                onChange={options =>
                  setInfo((opt: { size?: number; color?: string }) => ({
                    ...opt,
                    ...options
                  }))
                }
              />
            // </ArrowContainer>
          )}
        >
          <div
            className={cx('tools-item tools-circle', {
              'tool-selected': type === 'circle'
            })}
            onClick={() => handleClick('circle')}
          />
        </Popover>
        <Popover
          positions={[position]}
          align="start"
          isOpen={selected === 'line'}
          content={({ position, popoverRect }) => (
            // <ArrowContainer
            //   position={position}
            //   targetRect={targetRect}
            //   popoverRect={popoverRect}
            //   arrowColor={'#272323'}
            //   arrowSize={5}
            // >
              <Stroke
                info={info}
                onChange={options =>
                  setInfo((opt: { size?: number; color?: string }) => ({
                    ...opt,
                    ...options
                  }))
                }
              />
            // </ArrowContainer>
          )}
        >
          <div
            className={cx('tools-item tools-text', {
              'tool-selected': type === 'line'
            })}
            onClick={() => handleClick('line')}
          >
            L
          </div>
        </Popover>
        <Popover
          positions={[position]}
          align="start"
          isOpen={selected === 'mosaic'}
          content={({ position, popoverRect }) => (
            // <ArrowContainer
            //   position={position}
            //   targetRect={targetRect}
            //   popoverRect={popoverRect}
            //   arrowColor={'#272323'}
            //   arrowSize={5}
            // >
              <Stroke
                info={info}
                onChange={options =>
                  setInfo((opt: { size?: number; color?: string }) => ({
                    ...opt,
                    ...options
                  }))
                }
                isHideColor
              />
            // </ArrowContainer>
          )}
        >
          <div
            className={cx('tools-item tools-text', {
              'tool-selected': type === 'mosaic'
            })}
            onClick={() => handleClick('mosaic')}
          >
            M
          </div>
        </Popover>
        <div className="tools-hold" />
        <Back onClick={onCancel} />
        <DownLoad onClick={onDownload} />
        <Close onClick={handleClose} />
        <Confirm className="tools-item" onClick={onCopy} />
      </div>
    );
  }
);

export default Tools;
