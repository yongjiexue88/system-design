import { FormEvent, useState } from 'react'

type AuthMode = 'login' | 'register'

interface AuthCardProps {
  mode: AuthMode
  onSubmit: (values: { email: string; password: string }) => void | Promise<void>
  onToggleMode: () => void
  error?: string | null
}

function AuthCard({ mode, onSubmit, onToggleMode, error }: AuthCardProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit({ email, password })
  }

  const isLogin = mode === 'login'

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-900 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/50">
      <h1 className="mb-2 text-2xl font-semibold text-white">
        {isLogin ? 'Sign in to continue' : 'Create a new account'}
      </h1>
      <p className="mb-6 text-sm text-slate-400">
        {isLogin
          ? 'Access the AI agent by signing in with your account credentials.'
          : 'Register to start persisting conversations locally with the AI agent.'}
      </p>

      {error ? (
        <div className="mb-4 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-xs uppercase tracking-wide text-slate-500">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-xs uppercase tracking-wide text-slate-500">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            placeholder="Minimum 8 characters"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-400"
        >
          {isLogin ? 'Sign in' : 'Register'}
        </button>
      </form>

      <button
        type="button"
        onClick={onToggleMode}
        className="mt-6 text-sm text-slate-400 underline-offset-4 hover:text-white hover:underline"
      >
        {isLogin ? "Don't have an account? Create one." : 'Already registered? Sign in here.'}
      </button>
    </div>
  )
}

export default AuthCard
