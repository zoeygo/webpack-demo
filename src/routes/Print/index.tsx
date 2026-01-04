import React, { memo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const Print: React.FC<any> = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })
  const list = new Array(20).fill(0)
  return (
    <div>
      <button onClick={reactToPrintFn}>Print</button>
      <div ref={contentRef}>
        {list.map((item, index) => (
          <div style={{ height: '200px', width: '200px', background: 'orange', margin: '20px auto' }} key={index}>
            Content to print {index}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Print)
