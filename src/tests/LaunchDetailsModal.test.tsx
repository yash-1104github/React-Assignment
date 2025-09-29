import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import LaunchDetailsModal from "../components/LaunchDetailsModal"
import { launchesMock, setupFetchMock, cleanupMocks } from "./test-utils"
import { vi } from "vitest"

beforeEach(() => setupFetchMock())
afterEach(() => cleanupMocks())

test("launch detail modal renders correctly", async () => {
  const handleClose = vi.fn()
  const launch = launchesMock[0]

  render(<LaunchDetailsModal launch={launch} onClose={handleClose} />)

  const dialog = await screen.findByRole("dialog")
  expect(dialog).toBeInTheDocument()

  expect(screen.getByText(launch.name)).toBeInTheDocument()
  expect(screen.getByText(/Details/i)).toBeInTheDocument()

  expect(await screen.findByText(/Rocket: Falcon 1/i)).toBeInTheDocument()

  fireEvent.click(screen.getByRole("button", { name: /✕/i }))
  expect(handleClose).toHaveBeenCalled()
})
