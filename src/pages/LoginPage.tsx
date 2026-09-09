import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { mockUsers } from '../mock/data'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('superadmin@chit.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const success = await login(identifier, password)
    setLoading(false)

    if (success) {
      navigate('/dashboard', { replace: true })
      return
    }

    setError('Invalid email/username or password. Use any mock admin credential.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[1.2fr_0.8fr]">
        <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 font-bold">C</div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Chit Fund</p>
                <h1 className="text-2xl font-semibold">Management System</h1>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Operations</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight">Professional office tools for chit operations.</h2>
            </div>
            <div className="grid gap-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">Collections and installment tracking</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">Customer, auction, and payout workflows</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">Role-aware access for admin and office teams</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Sign in</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="identifier" className="mb-2 block text-sm font-medium text-slate-700">Email / Username</label>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300" />
                  Remember me
                </label>
                <button type="button" className="text-sky-600 hover:text-sky-700">Forgot password</button>
              </div>

              {error && <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Demo accounts</p>
              <div className="space-y-2 text-sm text-slate-600">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2">
                    <span>{user.name}</span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
