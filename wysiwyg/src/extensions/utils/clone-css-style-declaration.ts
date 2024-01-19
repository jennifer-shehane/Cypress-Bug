export function cloneCSSStyleDeclaration (style: CSSStyleDeclaration): CSSStyleDeclaration {
  const clonedStyle = document.createElement('table').style
  // TODO: https://bugs.chromium.org/p/chromium/issues/detail?id=1218159 "cssText" isn't always updated correctly
  clonedStyle.cssText = style.cssText
  return clonedStyle
}