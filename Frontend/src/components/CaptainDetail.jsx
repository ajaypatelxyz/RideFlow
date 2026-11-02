const CaptainDetail = ({captain}) => {
  const firstName = captain?.fullName?.firstName || 'Captain'
  const lastName = captain?.fullName?.lastName || ''
  const initials = `${firstName[0] || 'C'}${lastName[0] || ''}`.toUpperCase()
  const vehicle = captain?.vehicle

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f3e7dd] font-display text-sm font-bold text-[#8d4c3b]" aria-label={`${firstName} profile`}>
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-[#19323a]">{firstName} {lastName}</p>
          <p className="mt-0.5 truncate text-xs text-[#697572]">
            {vehicle?.vehicleType ? `${vehicle.vehicleType} captain` : 'RideFlow captain'}
            {vehicle?.plate ? ` · ${vehicle.plate}` : ''}
          </p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-display text-lg font-bold tracking-tight text-[#19323a]">₹295.20</p>
        <p className="text-xs text-[#697572]">Earned today</p>
      </div>
    </div>
  )
}

export default CaptainDetail
