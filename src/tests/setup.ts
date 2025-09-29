import '@testing-library/jest-dom'

if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {

  if (!(window.HTMLElement.prototype as any).scrollIntoView) {
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: function scrollIntoView() {

      },
    })
  }
}