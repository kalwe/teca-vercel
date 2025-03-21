'use client'

import { useEffect, useRef, useState } from 'react'

export default function DropdownCheckboxPosition({
  id,
  onChange,
  dropdownPositionData = []
}: {
  id: number | null
  onChange: (id: number, name: string) => void
  dropdownPositionData?: { id: number; name: string }[]
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [positions, setPositions] =
    useState<{ id: number; name: string }[]>(dropdownPositionData)
  const [selectedName, setSelectedName] = useState<string>('Escolha um cargo')
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log('Dados recebidos no Dropdown:', dropdownPositionData) // Debug
    if (JSON.stringify(positions) !== JSON.stringify(dropdownPositionData)) {
      setPositions(dropdownPositionData)
    }
  }, [dropdownPositionData, positions])

  useEffect(() => {
    if (id !== null) {
      const selected = positions.find((p) => p.id === id)
      if (selected) {
        setSelectedName(selected.name)
      }
    }
  }, [id, positions])

  const handleSelect = (id: number, name: string) => {
    setSelectedName(name)
    onChange(id, name)
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className='bg-gray-200 hover:bg-gray-300 p-2 rounded-md w-full flex justify-between items-center text-left'
      >
        <span>{selectedName}</span>
        <svg
          className='w-2.5 h-2.5 ms-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className='absolute z-50 w-full bg-white border rounded-md mt-1 shadow-md'
          style={{ maxHeight: '300px', overflowY: 'auto' }}
        >
          <ul className='p-2'>
            {positions.length > 0 ? (
              positions.map((position) => (
                <li
                  key={position.id}
                  className={`p-2 cursor-pointer ${
                    id === position.id ? 'bg-gray-300' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleSelect(position.id, position.name)}
                >
                  {position.name}
                </li>
              ))
            ) : (
              <p className='text-center text-sm text-gray-500'>
                Nenhum cargo disponível.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
