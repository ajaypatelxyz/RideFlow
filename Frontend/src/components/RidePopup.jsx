const RidePopup = ({status, onConfirm, onIgnore}) => {
  const isAccepted = status === 'accepted'

  return (
    <div className="flex min-h-0 flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#657c7c]">Ride request preview</p>
          <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-[#19323a]">
            {isAccepted ? 'Ride accepted' : 'New ride available'}
          </h2>
        </div>
        <span className={`mt-1 flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
          isAccepted ? 'bg-[#e7f0e9] text-[#315d43]' : 'bg-[#fff2c8] text-[#8b6812]'
        }`}>
          <span className={`size-1.5 rounded-full ${isAccepted ? 'bg-[#4b9d5a]' : 'bg-[#d4a72c]'}`} />
          {isAccepted ? 'Accepted · demo' : 'Demo request'}
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-[#f7d447] px-3 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-white/80 bg-[#f3e7dd] font-display text-xs font-bold text-[#8d4c3b]" aria-label="Harsh Patel profile">
            HP
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#19323a]">Harsh Patel</p>
            <p className="mt-0.5 text-xs text-[#536562]">Passenger · Sample profile</p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-sm font-bold text-[#19323a]">2.2 km</p>
          <p className="text-[10px] text-[#536562]">Pickup distance</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 divide-y divide-[#ecebe5] overflow-y-auto rounded-xl border border-[#ecebe5] px-3">
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
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#8b928d]">Pickup</p>
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
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#8b928d]">Destination</p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f0f1ec] text-xs font-bold text-[#536562]" aria-hidden="true">
            ₹
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#19323a]">₹193.20</p>
            <p className="mt-0.5 text-xs text-[#697572]">Cash payment · Sample fare</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid shrink-0 grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isAccepted}
          className="flex min-h-12 items-center justify-center rounded-xl bg-[#4b9d5a] px-4 text-sm font-bold text-white transition-colors hover:bg-[#3f894d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#19323a] disabled:cursor-default disabled:bg-[#4b9d5a]"
        >
          {isAccepted ? 'Accepted' : 'Confirm'}
        </button>
        <button
          type="button"
          onClick={onIgnore}
          className="flex min-h-12 items-center justify-center rounded-xl bg-[#e1e3e5] px-4 text-sm font-bold text-[#41484c] transition-colors hover:bg-[#d2d5d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#19323a]"
        >
          {isAccepted ? 'Back to dashboard' : 'Ignore'}
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] text-[#8b928d]">Sample request only · ride matching is not connected</p>
    </div>
  )
}

export default RidePopup
