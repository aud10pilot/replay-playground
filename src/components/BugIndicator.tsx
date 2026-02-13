import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface BugIndicatorProps {
  description: string
}

export default function BugIndicator({ description }: BugIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const anchorRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLButtonElement>(null)

  const updatePosition = useCallback(() => {
    if (!anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    setPos({ top: rect.top + window.scrollY, left: rect.left + window.scrollX })
  }, [])

  useEffect(() => {
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [updatePosition])

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

  const overlayRoot = document.getElementById('bug-overlay')

  return (
    <>
      {/* Invisible anchor — no dimensions, no effect on layout */}
      <span
        ref={anchorRef}
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
      />

      {overlayRoot && pos && createPortal(
        <>
          <button
            ref={dotRef}
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
            style={{
              position: 'absolute',
              top: pos.top - 6,
              left: pos.left + 2,
            }}
            className="flex h-4 w-4 items-center justify-center bg-transparent border-none p-0 cursor-pointer z-[9998]"
            aria-label="View bug description"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </button>

          {isOpen && (
            <div
              ref={popoverRef}
              style={{
                position: 'absolute',
                top: pos.top - 8,
                left: pos.left + 24,
              }}
              className="z-[9999] w-72 bg-gray-900 text-white rounded-lg shadow-xl p-4 text-sm leading-relaxed"
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
        </>,
        overlayRoot
      )}
    </>
  )
}
