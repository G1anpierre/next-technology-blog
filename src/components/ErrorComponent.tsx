import React from 'react'

export const ErrorComponent = ({reset}: {reset: () => void}) => {
  return (
    <div className="relative h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <h2>Something went wrong!</h2>
        <button
          className="bg-indigo-500 rounded-md px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  )
}
