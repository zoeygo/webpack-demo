import React, { useRef, useCallback } from 'react'
// import { usePrint } from './usePrint'
import { useReactToPrint } from 'react-to-print'
import ReactToPrint from 'react-to-print';

export default function PrintArea() {
  const areaRef = useRef(null)
  const list = new Array(20).fill(0)
  // const attachPrint = usePrint()

  // 把 hook 绑定到要打印的区域
  // attachPrint(areaRef)

  const reactToPrintFn = useReactToPrint({ contentRef: areaRef })

  const handlePrint = () => {
    // if (areaRef.current?.print) {
    //   areaRef.current.print()
    // }
    const printContent = areaRef.current
    if (!printContent) return

    const popup = window.open('', '', 'width=600,height=600')
    if (!popup) return
    popup.document.write(`
      <html>
        <head>
          <title>打印</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `)
    popup.document.close()
    popup.focus()
    popup.print()
    popup.close()
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>打印指定区域（Hook版）</h1>
      <button onClick={reactToPrintFn}>npm包Print</button>
      {/* <button onClick={handlePrint} className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
        打印指定区域
      </button> */}
      <div ref={areaRef} className='border p-4 rounded-lg bg-gray-100'>
        <h2 className='text-xl font-semibold'>打印区域</h2>
        <p className='mt-2 text-gray-700'>这是要被打印的区域，调用 Hook 后只会打印这一部分。</p>
        {list.map((item, index) => (
          <div style={{ height: '200px', width: '200px', background: 'orange', margin: '20px auto' }} key={index}>
            Content to print {index}
          </div>
        ))}
      </div>
    </div>
  )
}
