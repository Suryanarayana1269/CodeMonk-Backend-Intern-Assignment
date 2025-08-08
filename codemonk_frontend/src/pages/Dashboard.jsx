import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { removeToken } from '../utils/auth'

export default function Dashboard() {
  const [content, setContent] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [results, setResults] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoadingSubmit(true)
    setMessage(null)
    setError(null)
    try {
      await api.post('/paragraphs/', { content })
      setMessage('Paragraphs submitted successfully!')
      setContent('')
      setResults([])
      setSearchWord('')
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed')
    } finally {
      setLoadingSubmit(false)
    }
  }

  const handleSearch = async e => {
    e.preventDefault()
    if (!searchWord.trim()) return
    setLoadingSearch(true)
    setResults([])
    setError(null)
    try {
      const res = await api.get(`/paragraphs/search/`, {
        params: { word: searchWord.trim().toLowerCase() },
      })
      setResults(res.data.results)
      if (res.data.results.length === 0) {
        setMessage('No paragraphs found containing the word.')
      } else {
        setMessage(null)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed')
    } finally {
      setLoadingSearch(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Logout"
          title="Logout"
        >
          Logout
        </motion.button>
      </div>

      {/* Paragraph Submission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit Paragraphs</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Enter paragraphs separated by two newlines"
            rows={7}
            className="w-full border border-gray-300 rounded-lg p-4 resize-y focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent shadow-sm"
            required
            whileFocus={{ scale: 1.02, boxShadow: '0 0 10px #60a5fa' }}
          />
          <motion.button
            type="submit"
            disabled={loadingSubmit}
            whileHover={{ scale: loadingSubmit ? 1 : 1.05 }}
            whileTap={{ scale: loadingSubmit ? 1 : 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loadingSubmit ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </motion.button>
        </form>
      </section>

      {/* Paragraph Search */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Search Paragraphs by Word</h2>
        <form onSubmit={handleSearch} className="mb-6 flex gap-3">
          <motion.input
            type="text"
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
            placeholder="Enter word to search"
            className="flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-transparent shadow-sm"
            required
            whileFocus={{ scale: 1.02, boxShadow: '0 0 10px #34d399' }} // green ring on focus
          />
          <motion.button
            type="submit"
            disabled={loadingSearch}
            whileHover={{ scale: loadingSearch ? 1 : 1.05 }}
            whileTap={{ scale: loadingSearch ? 1 : 0.95 }}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2"
          >
            {loadingSearch ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </motion.button>
        </form>

        {/* Messages */}
        <AnimatePresence>
          {message && (
            <motion.p
              key="msg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-4 text-blue-600 font-medium select-none"
            >
              {message}
            </motion.p>
          )}
          {error && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-4 text-red-600 font-semibold select-none"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Results */}
        <motion.div
          className="space-y-5 max-h-96 overflow-y-auto border border-gray-200 p-5 rounded-lg bg-gray-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          <AnimatePresence>
            {results.map(({ paragraph_id, content, count }) => (
              <motion.div
                key={paragraph_id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg"
              >
                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{content}</p>
                <p className="text-sm text-gray-500 mt-3">
                  Occurrences: <strong className="text-green-600">{count}</strong>
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  )
}
