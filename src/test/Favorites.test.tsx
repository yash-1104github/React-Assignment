import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'
import { setupFetchMock, setupLocalStorageMock, cleanupMocks } from './test-utils'

beforeEach(() => {
  setupFetchMock()
  setupLocalStorageMock()
})
afterEach(() => cleanupMocks())

test('favorites toggle and persistence', async () => {
  render(<App />)

  const titleEl = await screen.findByText('FalconSat')

  const headingId = titleEl.id 
  if (!headingId || !headingId.startsWith('launch-')) {
    console.log('Found title element but missing expected id attribute:', titleEl.outerHTML)
    throw new Error('Launch heading does not have expected id format "launch-<id>"')
  }
  const expectedId = headingId.replace('launch-', '')

  let card = document.querySelector<HTMLElement>(`[aria-labelledby="${headingId}"]`)
  if (!card) {
    card = (titleEl.closest('article') ?? titleEl.closest('div')) as HTMLElement | null
  }
  if (!card) {
    console.log('Title element outerHTML:', titleEl.outerHTML)
    throw new Error('Could not find launch card container for FalconSat')
  }

  const withinCard = within(card)

  let favButton: HTMLButtonElement | null = null
  try {
    favButton = withinCard.getByRole('button', { name: /add favorite|favorite|remove favorite/i }) as HTMLButtonElement
  } catch (err) {
    const allBtns = Array.from(card.querySelectorAll('button'))
    favButton = allBtns.find((b) =>
      /favorite|star|★|☆/i.test((b.getAttribute('aria-label') || b.textContent || '').trim())
    ) as HTMLButtonElement | undefined ?? null
  }

  if (!favButton) {
    console.log('CARD HTML (truncated):', card.outerHTML.slice(0, 2000))
    throw new Error(
      'Favorite button not found inside the FalconSat card. Check that the favorite control is rendered inside the card and has accessible text or aria-label.'
    )
  }

  if (!card.contains(favButton)) {
    console.log('Found button but it is not contained within the expected card. card HTML:', card.outerHTML)
    throw new Error('Favorite button found is not inside the FalconSat card')
  }

  fireEvent.click(favButton)

  if (favButton.hasAttribute('aria-pressed')) {
    expect(favButton).toHaveAttribute('aria-pressed', 'true')
  }

  const storedAfterAdd = JSON.parse(window.localStorage.getItem('favorites') || '[]')
  expect(Array.isArray(storedAfterAdd)).toBe(true)
  expect(storedAfterAdd).toContain(expectedId)

  fireEvent.click(favButton)
  if (favButton.hasAttribute('aria-pressed')) {
    expect(favButton).toHaveAttribute('aria-pressed', 'false')
  }
  const storedAfterRemove = JSON.parse(window.localStorage.getItem('favorites') || '[]')
  expect(storedAfterRemove).not.toContain(expectedId)
})