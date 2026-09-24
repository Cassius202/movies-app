'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../utility/buttons'

export const Pagination = ({ totalPages, thereIsNextPage }: { totalPages: number, thereIsNextPage: boolean }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-gray-400">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-3 items-center justify-center">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          handleClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Prev
        </Button>
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          handleClick={() => goToPage(currentPage + 1)}
          disabled={thereIsNextPage === false}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}