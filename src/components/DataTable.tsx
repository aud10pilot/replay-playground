/**
 * INTENTIONAL BUGS:
 * 1. Off-by-one pagination: endIndex is start + perPage + 1, so last item appears on next page too
 * 2. Stale state on edit: Direct object mutation instead of setState — no re-render
 * 3. Placeholder text: "TODO: Fix this date" visible in table
 * 4. XSS: Comment rendered with dangerouslySetInnerHTML
 * 5. Console errors: console.log("TODO") and uncaught promise rejection on mount
 */

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Pencil } from 'lucide-react'
import BugIndicator from './BugIndicator'

interface Task {
  id: number
  title: string
  status: string
  date: string
  assignee: string
}

const allTasks: Task[] = [
  { id: 1, title: "Review pull request #142", status: "Done", date: "2026-02-10", assignee: "Alice" },
  { id: 2, title: "Update API documentation", status: "In Progress", date: "2026-02-11", assignee: "Bob" },
  { id: 3, title: "Fix authentication bug", status: "Todo", date: "TODO: Fix this date", assignee: "Charlie" },
  { id: 4, title: "Deploy staging environment", status: "Done", date: "2026-02-09", assignee: "Alice" },
  { id: 5, title: "Write unit tests for checkout", status: "In Progress", date: "2026-02-12", assignee: "Diana" },
  { id: 6, title: "Refactor user service", status: "Todo", date: "2026-02-13", assignee: "Bob" },
  { id: 7, title: "Update dependencies", status: "Done", date: "2026-02-08", assignee: "Charlie" },
  { id: 8, title: "Configure CI/CD pipeline", status: "In Progress", date: "2026-02-11", assignee: "Eve" },
  { id: 9, title: "Design new onboarding flow", status: "Todo", date: "2026-02-14", assignee: "Diana" },
  { id: 10, title: "Performance audit", status: "Done", date: "2026-02-07", assignee: "Alice" },
  { id: 11, title: "Set up error monitoring", status: "In Progress", date: "2026-02-12", assignee: "Eve" },
  { id: 12, title: "Lorem ipsum dolor sit amet", status: "Todo", date: "2026-02-15", assignee: "Frank" },
]

const comments = [
  { id: 1, author: "Alice", text: "Great progress on this sprint!" },
  { id: 2, author: "Bob", text: "<b>Important:</b> Please review the <em>security changes</em> before merging. <img src=x onerror='console.log(\"XSS\")'>" },
  { id: 3, author: "Charlie", text: "TODO: write a real comment here" },
]

const ITEMS_PER_PAGE = 5

export default function DataTable() {
  const [tasks, setTasks] = useState(allTasks)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    // BUG: Console log left in
    console.log("TODO: fix this pagination bug")

    // BUG: Uncaught promise rejection — no .catch()
    fetch("/api/nonexistent-endpoint").then((res) => res.json())
  }, [])

  // BUG: Off-by-one — endIndex includes one extra item
  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE + 1
  const displayedTasks = tasks.slice(startIndex, endIndex)
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE)

  const handleEdit = (id: number) => {
    // BUG: Direct mutation — React won't re-render
    const task = tasks.find((t) => t.id === id)
    if (task) {
      task.title = task.title + " (edited)"
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700"
      case "In Progress":
        return "bg-yellow-100 text-yellow-700"
      case "Todo":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-8">
      {/* Task Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 pt-3">
          <BugIndicator description="Open the browser console (DevTools) — you'll see 'TODO: fix this pagination bug' logged on mount, plus an uncaught promise rejection from a fetch to a nonexistent API endpoint." />
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Task</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Assignee</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                Actions
                <BugIndicator description="Clicking the edit (pencil) icon on any row directly mutates the task object instead of using React setState. The title changes in memory but the component never re-renders to show the update." />
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {task.title}
                  {task.id === 12 && (
                    <BugIndicator description="This task title is placeholder 'Lorem ipsum' text that was never replaced with real content." />
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                {/* BUG: "TODO: Fix this date" is visible for task #3 */}
                <td className="px-4 py-3 text-sm text-gray-600">
                  {task.date}
                  {task.id === 3 && (
                    <BugIndicator description="This date field shows 'TODO: Fix this date' — placeholder text that was never replaced with an actual date value." />
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{task.assignee}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="text-gray-400 hover:text-indigo-600 bg-transparent border-none p-1"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            Showing {startIndex + 1}–{Math.min(endIndex, tasks.length)} of {tasks.length}
            <BugIndicator description="Pagination has an off-by-one error. Each page shows 6 items instead of 5, so the last item on page 1 also appears as the first item on page 2. The slice end index is start + perPage + 1 instead of start + perPage." />
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-1 rounded border border-gray-300 disabled:opacity-40 bg-white hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              className="p-1 rounded border border-gray-300 disabled:opacity-40 bg-white hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Recent Comments
          <BugIndicator description="Comments are rendered using dangerouslySetInnerHTML, which means raw HTML in user comments gets executed. This is an XSS vulnerability — Bob's comment injects HTML tags and an onerror handler." />
        </h3>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-indigo-600">{comment.author[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                {/* BUG: XSS — rendering raw HTML from user comment */}
                <div
                  className="text-sm text-gray-600 mt-1"
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
