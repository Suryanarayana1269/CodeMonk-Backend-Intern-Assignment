import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { setToken } from '../utils/auth'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await api.post('/token/', formData)
      setToken(res.data.access)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-xl border border-gray-300"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
      exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.3 } }}
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Login</h2>

      <AnimatePresence>
        {error && (
          <motion.p
            key="error-msg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-3 bg-red-100 text-red-700 rounded"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent shadow-sm transition"
          whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgb(59 130 246 / 0.7)' }}
          aria-label="Email address"
          autoComplete="email"
        />

        <motion.input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent shadow-sm transition"
          whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgb(59 130 246 / 0.7)' }}
          aria-label="Password"
          autoComplete="current-password"
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
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
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </motion.button>
      </form>

      <p className="mt-8 text-center text-gray-600 text-sm select-none">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline font-medium">
          Register
        </a>
      </p>
    </motion.div>
  )
}
