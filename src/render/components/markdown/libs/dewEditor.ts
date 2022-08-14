import Clipboard from 'clipboard'
import MarkdownIt from 'markdown-it'

const markdownIt = new MarkdownIt()

export function insertTextIntoEditor(ele: { [key: string]: any }, text: string) {
  ele.focus()
  const startPos = ele.selectionStart
  const endPos = ele.selectionEnd
  const tempValue = ele.value

  // 如果选中了一段文本，则会进行替换，如果没有选中的文本，则直接插入
  ele.value = tempValue.substring(0, startPos) + text + tempValue.substring(endPos)
  ele.selectionStart = startPos
  ele.selectionEnd = startPos + text.length
}

export function isExistSelection(textareaDom: { [key: string]: any }) {
  return typeof textareaDom.selectionStart === 'number' && typeof textareaDom.selectionEnd === 'number'
}

export function copyTextToClipboard(className: string) {
  const clipboard = new Clipboard(className)

  clipboard.on('success', () => {
    console.log('复制到剪切板成功')
  })
  clipboard.on('error', (err: any) => {
    console.log('复制到剪切板失败')
    console.log(err)
  })
}
