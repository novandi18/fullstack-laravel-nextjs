import { GlobeAltIcon } from "@heroicons/react/24/solid"
import { FC } from "react"

export const Footer: FC = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 h-16 border-t border-gray-200 dark:border-gray-800 flex items-center px-5 md:px-24 justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">Novandi Ramadhan</p>
      <a href="https://github.com/novandi18" target="_blank" rel="noopener noreferrer">
        <GlobeAltIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </a>
    </footer>
  )
}