import { useState } from 'react'

const ConfirmRidePopUp = ({onAccept, onDecline}) => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const confirmRide = (event) => {
    event.preventDefault()

    if (otp !== '1234') {
      setError('Enter the demo OTP 1234 to confirm this ride.')
      return
    }

    onAccept()
  }

  return (
    <form onSubmit={confirmRide} className="flex min-h-0 flex-col">
      <div className="mx-auto mb-4 flex size-8 items-center justify-center rounded-full bg-[#f1f0eb]" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-5 text-[#536562]" fill="none">
          <path d="m6 14 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="mb-4 font-display text-lg font-bold text-[#19323a]">Confirm this ride to start</h2>

      <div className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-[#f7d447] px-3 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white/80 bg-[#f3e7dd] font-display text-xs font-bold text-[#8d4c3b]" aria-label="Harsh Patel profile">
            HP
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#19323a]">Harsh Patel</p>
            <p className="mt-0.5 text-xs text-[#536562]">Sample passenger</p>
          </div>
        </div>
        <p className="shrink-0 text-sm font-bold text-[#19323a]">2.2 KM</p>
      </div>

      <div className="divide-y divide-[#ecebe5]">
        <div className="flex items-start gap-3 py-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f0f1ec] text-[#315d67]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-4" fill="none">
              <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#19323a]">562/11-A</p>
            <p className="mt-0.5 text-xs text-[#697572]">Kankariya Talab, Bhopal</p>
          </div>
        </div>

        <div className="flex items-start gap-3 py-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f9e9e5] text-[#d96950]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-4" fill="none">
              <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="9" r="2.2" fill="currentColor" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#19323a]">562/11-A</p>
            <p className="mt-0.5 text-xs text-[#697572]">Kankariya Talab, Bhopal</p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f0f1ec] text-xs font-bold text-[#536562]" aria-hidden="true">
            ₹
          </span>
          <div>
            <p className="text-sm font-bold text-[#19323a]">₹193.20</p>
            <p className="mt-0.5 text-xs text-[#697572]">Cash · Sample fare</p>
          </div>
        </div>
      </div>

      <label htmlFor="ride-otp" className="sr-only">Enter ride OTP</label>
      <input
        id="ride-otp"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        maxLength={4}
        value={otp}
        onChange={(event) => {
          setOtp(event.target.value.replace(/\D/g, '').slice(0, 4))
          setError('')
        }}
        placeholder="Enter OTP"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'ride-otp-error' : 'ride-otp-hint'}
        className="mt-4 min-h-12 w-full rounded-xl border border-[#9ba7a0] bg-white px-4 text-base font-semibold tracking-[0.3em] text-[#19323a] outline-none transition focus:border-[#315d67] focus:ring-2 focus:ring-[#315d67]/20"
      />
      {error ? (
        <p id="ride-otp-error" role="alert" className="mt-1.5 text-xs font-medium text-[#b23b32]">{error}</p>
      ) : (
        <p id="ride-otp-hint" className="mt-1.5 text-xs text-[#697572]">Demo OTP: 1234</p>
      )}

      <button
        type="submit"
        className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#4b9d5a] px-4 text-sm font-bold text-white transition-colors hover:bg-[#3f894d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#19323a]"
      >
        Confirm
      </button>
      <button
        type="button"
        onClick={onDecline}
        className="mt-2 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#cf3f32] px-4 text-sm font-bold text-white transition-colors hover:bg-[#b9362b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#19323a]"
      >
        Decline
      </button>
      <p className="mt-2 text-center text-[10px] text-[#8b928d]">Sample ride details · OTP verification is demo-only</p>
    </form>
  )
}

export default ConfirmRidePopUp
