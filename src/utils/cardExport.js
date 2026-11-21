import html2canvas from 'html2canvas'

export async function exportCardAsPng(cardEl, filename = 'proxy-card.png') {
  const canvas = await html2canvas(cardEl, {
    scale: 3,          // 3× for print-quality
    useCORS: true,
    backgroundColor: null,
    logging: false,
  })

  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, 'image/png')
}
