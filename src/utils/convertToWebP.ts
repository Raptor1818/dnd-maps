export async function convertToWebP(file: File): Promise<File> {
  if (file.type === "image/webp") return file

  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement("canvas")
  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get canvas context")

  ctx.drawImage(bitmap, 0, 0)

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject("Canvas toBlob failed")
        const webpFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
          type: "image/webp",
        })
        resolve(webpFile)
      },
      "image/webp",
      0.9 // quality
    )
  })
}
