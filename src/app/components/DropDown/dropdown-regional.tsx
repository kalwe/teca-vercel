'use client'

import { regionSchema } from '@/app/schemas/regionSchema' // ✅ Importando o Schema
import { RegionService } from '@/app/services/dropdownService'
import { DropdownCheckboxRegionalProps } from '@/app/types/dropdown'
import React, { useEffect, useRef, useState } from 'react'

export function DropdownCheckboxRegional({
  value,
  onChange,
}: DropdownCheckboxRegionalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [regions, setRegions] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // 📌 Busca as regiões da API ao carregar o componente
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await RegionService.getAllRegions()

        // 🔥 Valida os dados da API antes de usar
        const validRegions = data
          .map((region) => {
            try {
              return regionSchema.parse(region).name
            } catch (err) {
              console.error('Erro de validação na região:', err)
              return null
            }
          })
          .filter((r) => r !== null) // Remove valores inválidos

        setRegions(validRegions)
      } catch (err) {
        console.error('❌ Erro ao carregar regiões:', err)
        setError('Erro ao carregar regiões.')
      } finally {
        setLoading(false)
      }
    }

    fetchRegions()
  }, [])

  // Alterna a visibilidade do dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDropdownOpen((prev) => !prev)
  }

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 🔍 Valida e atualiza a seleção
  const handleSelect = (option: string) => {
    try {
      regionSchema.parse({ name: option }) // ✅ Valida a seleção antes de alterar o estado
      onChange(option) // TODO: ajusta o type na interface
      setIsDropdownOpen(false)
    } catch (err) {
      console.error('Erro na validação da região selecionada:', err)
    }
  }

  return (
    <div>
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        className={`bg-[#D9D9D9] hover:bg-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-white-800 w-[100%] ${
          error ? 'border-red-500' : ''
        }`}
        type="button"
        disabled={loading || !!error}
      >
        {loading ? 'Carregando...' : error ? 'Erro ao carregar' : value || 'Regional'}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Exibe erro caso a API falhe */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Dropdown menu */}
      {isDropdownOpen && !loading && !error && (
        <div
          id="dropdownDefaultCheckbox"
          className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          ref={dropdownRef}
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            {regions.length > 0 ? (
              regions.map((option) => (
                <li key={option}>
                  <div className="flex items-center">
                    <input
                      id={`checkbox-item-${option}`}
                      type="radio"
                      checked={value === option}
                      onChange={() => handleSelect(option)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`checkbox-item-${option}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option}
                    </label>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm px-3 py-2">
                Nenhuma regional disponível
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownCheckboxRegional
