import  { useState } from 'react'
import { useLaunches } from '../context/LaunchesContext'
import LaunchCard from './LaunchCard'
import EmptyState from './EmptyState'
import LaunchDetailsModal from './LaunchDetailsModal'

const ITEMS_PER_PAGE = 15;

export default function LaunchList() {

  const { filtered } = useLaunches();
  const [selected, setSelected] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const currentItems = filtered.slice(start, end);

  if (filtered.length === 0) return <EmptyState message="No launches match your filters."/>

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {currentItems.map((l) => (
          <LaunchCard key={l.id} launch={l} onOpen={(lu) => setSelected(lu)} />
        ))}
      </div>

      <div className="flex items-center justify-center py-6 gap-6 mt-6 text-sm">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-5 py-1 rounded-md border cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          ← Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-5 py-1 rounded-md border cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next →
        </button>
      </div>

      <LaunchDetailsModal launch={selected} onClose={() => setSelected(null)} />
    </>
  )
};