import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'

interface BugIndicatorProps {
  description: string
}

export default function BugIndicator({ description }: BugIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        dotRef.current &&
        !dotRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <span className="relative inline-block w-0 h-0 overflow-visible align-middle" style={{ fontSize: 0, lineHeight: 0 }}>
      <button
        ref={dotRef}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="absolute -top-2 -left-1 flex h-4 w-4 items-center justify-center bg-transparent border-none p-0 cursor-pointer z-[9998]"
        aria-label="View bug description"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute left-4 top-0 z-[9999] w-72 bg-gray-900 text-white rounded-lg shadow-xl p-4 text-sm leading-relaxed"
          style={{ fontSize: '14px', lineHeight: '1.5' }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white bg-transparent border-none p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="mb-3 pr-4">{description}</p>
          <p className="text-xs text-indigo-300">
            In the Replay extension, ask it to fix this.
          </p>
        </div>
      )}
    </span>
  )
}
