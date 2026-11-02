const CaptainRiding = ({onComplete}) => {
  return (
    <section
      aria-labelledby="captain-riding-title"
      className="min-h-[min(360px,45svh)] rounded-t-[28px] bg-[#f7d447] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 text-[#19323a] sm:min-h-[360px] sm:rounded-[24px] sm:px-7 sm:pb-6 sm:pt-6"
    >
      <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#b5962e]/50 sm:hidden" />
      <div className="mx-auto mb-5 flex size-9 items-center justify-center rounded-full bg-white/40" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <path d="m6 14 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="captain-riding-title" className="font-display text-xl font-bold">Ride in progress</h2>
          <p className="mt-1.5 text-sm text-[#5b4b17]">Head to the passenger’s destination</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-2xl font-bold">4 KM</p>
          <p className="text-sm text-[#5b4b17]">remaining</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span>About 7 min</span>
        </div>
        <button
          type="button"
          onClick={onComplete}
          className="min-h-14 rounded-xl bg-[#4b9d5a] px-6 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#3f894d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#19323a]"
        >
          Complete ride
        </button>
      </div>
      <p className="mt-4 text-center text-[11px] text-[#5b4b17]">Trip progress is a demo and is not connected to live navigation</p>
    </section>
  )
}

export default CaptainRiding
