import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate();
    const {setUser} = useContext(UserDataContext)

    const submitHandler = async(e) => {

        e.preventDefault()
        setMessage(null)
        setIsSubmitting(true)
        const userData = {
          email: email,
          password: password
        }

        try {
          const response = await axios.post('http://localhost:3000/api/auth/user/login', userData, {
            withCredentials: true
          })

          if(response.status === 200){

            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            setMessage({ type: 'success', text: 'Login successful!' })
            setTimeout(() => navigate('/home'), 1200)

          }

          setEmail('')
          setPassword('')
        } catch (error) {
          if(error.response?.status === 401){
            setMessage({ type: 'error', text: 'Invalid email or password' })
          } else {
            setMessage({ type: 'error', text: 'Unable to log in right now. Please try again.' })
          }
        } finally {
          setIsSubmitting(false)
        }

    }

  return (
    <main className="min-h-svh bg-[#f6f0e7] text-[#19323a]">
      {message && (
        <div
          role={message.type === 'error' ? 'alert' : 'status'}
          aria-live={message.type === 'error' ? 'assertive' : 'polite'}
          className={`fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-lg ${
            message.type === 'success' ? 'border-[#9ab8a6]' : 'border-[#e5a89a]'
          }`}
        >
          <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs ${
            message.type === 'success' ? 'bg-[#e7f0e9] text-[#315d43]' : 'bg-[#f9e9e5] text-[#a64131]'
          }`} aria-hidden="true">
            {message.type === 'success' ? '✓' : '!'}
          </span>
          <div className="flex-1 text-xs leading-4 text-[#626e6b]">
            <p className="inline font-bold text-[#19323a]">
              {message.type === 'success' ? 'You’re signed in' : 'Login unsuccessful'}
            </p>
            <p className="inline"> — {message.text}</p>
          </div>
          <button
            type="button"
            onClick={() => setMessage(null)}
            aria-label="Dismiss message"
            className="shrink-0 rounded-full px-1 text-base leading-5 text-[#657c7c] hover:text-[#19323a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
          >
            ×
          </button>
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-[#efb4a5]" />
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 sm:px-10 lg:px-14">
        <header className="flex h-20 items-center justify-between">
          <Link to="/" aria-label="Back to RideFlow home" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d96950]">
            <img src="/Smiling%20Biker%20on%20a%20Chopper.png" alt="" className="h-10 w-16 object-contain sm:h-12 sm:w-[72px]" />
            <span className="font-display text-xl font-bold text-[#202823]">RideFlow</span>
          </Link>
          <Link to="/" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#536562] transition-colors hover:text-[#19323a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d96950]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M19 12H5m7 7-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center pb-12 pt-5 sm:pb-16">
          <section className="w-full max-w-[430px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#657c7c]">User login</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-[#19323a] sm:text-5xl">Welcome back.</h1>
            <p className="mt-3 text-sm leading-6 text-[#626e6b] sm:text-base">Sign in to continue with RideFlow.</p>

            <form onSubmit={submitHandler} className="mt-9 space-y-5 sm:mt-10">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-[#19323a]">Email address</label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-14 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-4 text-base text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-[#19323a]">Password</label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-4 text-base text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="flex h-14 w-full items-center justify-between rounded-[5px] bg-[#19323a] px-5 text-sm font-bold text-white transition-colors hover:bg-[#294b53] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d96950] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base">
                <span>{isSubmitting ? 'Signing in...' : 'Log in'}</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
                  <path d="M4.5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#626e6b]">
              New to RideFlow?{' '}
              <Link to="/register" className="font-bold text-[#19323a] underline decoration-[#d96950] decoration-2 underline-offset-4 hover:text-[#d96950]">Create an account</Link>
            </p>

            <div className="my-7 flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-[#d8d8cf]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b9088]">or</span>
              <span className="h-px flex-1 bg-[#d8d8cf]" />
            </div>

            <Link to="/captain-login" className="flex min-h-14 w-full items-center justify-center rounded-[5px] border border-[#b8c0b8] bg-transparent px-5 text-sm font-bold text-[#19323a] transition-colors hover:border-[#19323a] hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d96950] sm:text-base">
              Sign in as a captain
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}

export default UserLogin
