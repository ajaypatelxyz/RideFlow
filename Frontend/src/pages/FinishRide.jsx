import { useNavigate } from 'react-router-dom'

const FinishRide = () => {
  const navigate = useNavigate()

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#f6f0e7] px-5 py-10 text-[#19323a]">
      <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-[#dce9d5] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 size-72 rounded-full bg-[#f4dca0]/70 blur-3xl" aria-hidden="true" />

      <section className="relative w-full max-w-md rounded-[28px] border border-white/80 bg-[#fffefa]/95 px-6 py-9 text-center shadow-[0_24px_70px_rgba(25,50,58,0.12)] backdrop-blur sm:px-10 sm:py-11">
        <p className="font-display text-sm font-bold tracking-tight text-[#19323a]">RideFlow</p>

        <div className="relative mx-auto mt-8 flex size-28 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[#e7f0e9] animate-ping opacity-30 motion-reduce:animate-none" aria-hidden="true" />
          <span className="relative flex size-24 items-center justify-center rounded-full bg-[#e7f0e9] text-[#3e8b50] shadow-inner">
            <svg aria-hidden="true" viewBox="0 0 64 64" className="size-14 animate-bounce motion-reduce:animate-none" fill="none">
              <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="3" />
              <path d="m19 32 9 9 18-19" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="absolute right-0 top-2 size-3 rounded-full bg-[#efb4a5] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          <span className="absolute bottom-1 left-0 size-2.5 rounded-full bg-[#f0c84b] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#4b8a58]">Trip complete</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#19323a] sm:text-4xl">Great ride!</h1>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#697572]">
          You’ve completed your trip. Thanks for being a part of RideFlow.
        </p>

        <div className="mt-7 rounded-2xl bg-[#f5f5f1] px-5 py-4">
          <p className="text-xs font-medium text-[#697572]">Sample fare collected</p>
          <p className="mt-1 font-display text-2xl font-bold text-[#19323a]">₹193.20</p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/captain-home', {
            replace: true,
            state: {rideCompleted: true},
          })}
          className="mt-7 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#19323a] px-5 text-sm font-bold text-white transition-colors hover:bg-[#294b53] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
        >
          Back to captain home
        </button>
        <p className="mt-3 text-[10px] text-[#8b928d]">Completion and fare details are demo-only</p>
      </section>
    </main>
  )
}

export default FinishRide
