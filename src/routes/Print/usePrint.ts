import { useCallback, type MutableRefObject } from 'react'

type PrintableElement = HTMLElement & { print?: () => void }

export function usePrint() {
  const printRef = useCallback((ref: MutableRefObject<PrintableElement | null>) => {
    console.log('printRef===', ref)
    if (!ref || !ref.current) return
    const print = () => {
      const printContent = ref.current
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

    // 把 print 方法绑定到 ref 上，方便调用
    ref.current.print = print
  }, [])

  return printRef
}
