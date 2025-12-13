export function isBase64Image(str) {
  return typeof str === "string" && str.startsWith("data:image");
}

export function isURLImage(str) {
  return typeof str === "string" && /^https?:\/\//.test(str);
}