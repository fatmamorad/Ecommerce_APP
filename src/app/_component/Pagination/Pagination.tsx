"use client";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const maxVisible = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav aria-label="Page navigation " className="fixed top-[650px] z-40 left-1/2 -translate-1/2">
      <ul className="flex justify-center space-x-1 h-10 text-base">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 h-10 flex items-center justify-center rounded-md border bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Prev
            </button>
          </li>
        )}

        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 h-10 flex items-center justify-center rounded-md border ${
                page === currentPage
                  ? "bg-cyan-700 text-white border-cyan-700"
                  : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 h-10 flex items-center justify-center bg-gray-100 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
