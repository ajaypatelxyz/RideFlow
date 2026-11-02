const WaitingForDriver = ({pickup, destination, vehicle, onCancel}) => {
  return (
    <>
      <div className="flex shrink-0 flex-col items-center py-3 text-center">
        <span className="flex size-24 items-center justify-center rounded-full bg-[#f5f4ef] text-6xl" aria-hidden="true">
          {vehicle.icon}
        </span>
        <div className="mt-4 flex items-center gap-2">
          <span className="relative flex size-3" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#d96950] opacity-50" />
            <span className="relative inline-flex size-3 rounded-full bg-[#d96950]" />
          </span>
          <h2 className="font-display text-lg font-bold text-[#19323a]">Waiting for a driver</h2>
        </div>
        <p className="mt-1 text-sm text-[#697572]">Demo search · live driver matching is not connected yet</p>
      </div>

      <div className="mt-2 min-h-0 flex-1 divide-y divide-[#ecebe5] overflow-y-auto">
        <div className="flex items-start gap-3 py-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f0f1ec] text-[#315d67]" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-4" fill="none">
              <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#19323a]">{pickup}</p>
            <p className="mt-0.5 text-xs text-[#697572]">Pickup location</p>
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
            <p className="text-sm font-bold text-[#19323a]">{destination}</p>
            <p className="mt-0.5 text-xs text-[#697572]">Destination</p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f0f1ec] text-xs font-bold text-[#536562]" aria-hidden="true">
            ₹
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#19323a]">{vehicle.price}</p>
            <p className="mt-0.5 text-xs text-[#697572]">Estimated fare · Cash</p>
          </div>
          <span className="rounded-full bg-[#f5f4ef] px-2.5 py-1 text-xs font-semibold text-[#536562]">
            {vehicle.name}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="mt-3 flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl border border-[#d8d8cf] bg-white px-4 text-sm font-bold text-[#536562] transition-colors hover:border-[#19323a] hover:text-[#19323a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
      >
        Cancel search
      </button>
    </>
  )
}

export default WaitingForDriver
