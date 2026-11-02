import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import CaptainDetail from '../components/CaptainDetail'
import RidePopup from '../components/RidePopup'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import CaptainRiding from './CaptainRiding'

const CaptainHome = () => {
  const {captain} = useContext(CaptainDataContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [rideRequestStatus, setRideRequestStatus] = useState(
    location.state?.rideCompleted ? 'ignored' : 'pending',
  )

  const stats = [
    {
      label: 'Hours online',
      value: '10.2',
      icon: (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </>
      ),
    },
    {
      label: 'Trips completed',
      value: '12',
      icon: (
        <>
          <path d="M5 19.5h14M7 16l2.2-6.1a3 3 0 0 1 5.6 0L17 16" />
          <path d="M9 16h6M12 5v1" />
        </>
      ),
    },
    {
      label: 'Rating',
      value: '4.9',
      icon: (
        <>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </>
      ),
    },
  ]

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#e8ebe4] text-[#19323a]">
      <div className="absolute inset-x-0 top-0 h-[63svh] overflow-hidden sm:h-[68svh]" aria-hidden="true">
        <svg viewBox="0 0 900 760" preserveAspectRatio="xMidYMid slice" className="size-full">
          <defs>
            <pattern id="captain-city-blocks" width="170" height="140" patternUnits="userSpaceOnUse">
              <rect x="10" y="12" width="62" height="45" rx="4" fill="#f8f8f3" />
              <rect x="82" y="12" width="76" height="45" rx="4" fill="#f4f4ee" />
              <rect x="10" y="68" width="62" height="61" rx="4" fill="#f5f5ef" />
              <rect x="82" y="68" width="76" height="61" rx="4" fill="#faf9f4" />
            </pattern>
          </defs>
          <rect width="900" height="760" fill="#e9ece5" />
          <rect width="900" height="760" fill="url(#captain-city-blocks)" />
          <path d="M610 78c72-37 151-12 183 49l-20 112-122 5-64-69 23-97Z" fill="#d5e5c4" />
          <path d="M112 456c71-44 157-28 190 26l-24 112-125 7-64-63 23-82Z" fill="#d7e8c8" />
          <g fill="none" stroke="#fff" strokeWidth="25">
            <path d="M-70 156c196-20 302 12 455 0s310-29 594 8" />
            <path d="M-48 373c170-17 300-5 442 7s335 4 558-21" />
            <path d="M-75 614c209-12 320-12 489-1s297 18 564-10" />
            <path d="M196-60c-2 137 19 245 5 350s-18 280 8 534" />
            <path d="M468-64c12 153-9 270 3 390s17 287-1 565" />
            <path d="M737-53c-17 157-15 272-3 400s5 286-18 552" />
            <path d="M-18 700 850 52" />
          </g>
          <g fill="none" stroke="#d6d8d1" strokeWidth="2">
            <path d="M-70 156c196-20 302 12 455 0s310-29 594 8" />
            <path d="M-48 373c170-17 300-5 442 7s335 4 558-21" />
            <path d="M-75 614c209-12 320-12 489-1s297 18 564-10" />
            <path d="M196-60c-2 137 19 245 5 350s-18 280 8 534" />
            <path d="M468-64c12 153-9 270 3 390s17 287-1 565" />
            <path d="M737-53c-17 157-15 272-3 400s5 286-18 552" />
            <path d="M-18 700 850 52" />
          </g>
          <g fill="#849187" fontFamily="DM Sans, sans-serif" fontSize="18" fontWeight="500">
            <text x="84" y="126">Market Street</text>
            <text x="548" y="330">Civic Center</text>
            <text x="232" y="535">Westfield Plaza</text>
            <text x="667" y="590">Garden District</text>
            <text x="334" y="284">Central Avenue</text>
          </g>
          <path d="M77 532 279 385 407 286 638 111" fill="none" stroke="#19323a" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity=".8" />
          <path d="M77 532 279 385 407 286 638 111" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 13" />
          <g transform="translate(78 532)">
            <circle r="19" fill="#fff" opacity=".9" />
            <circle r="10" fill="#19323a" />
            <circle r="3.5" fill="#fff" />
          </g>
          <g transform="translate(638 111)">
            <path d="M0-27c-14 0-25 11-25 25 0 18 25 42 25 42S25 16 25-2C25-16 14-27 0-27Z" fill="#d96950" stroke="#fff" strokeWidth="5" />
            <circle cy="-3" r="7" fill="#fff" />
          </g>
          <g transform="translate(350 326) rotate(48)">
            <rect x="-15" y="-25" width="30" height="50" rx="9" fill="#19323a" />
            <rect x="-10" y="-16" width="20" height="14" rx="4" fill="#dce8e4" />
            <circle cx="-9" cy="17" r="2" fill="#f2c56c" />
            <circle cx="9" cy="17" r="2" fill="#f2c56c" />
          </g>
        </svg>
      </div>

      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
        <Link
          to="/captain-home"
          aria-label="RideFlow captain home"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/90 py-2 pl-2 pr-4 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-[#19323a] text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M5 18.5h2.5a3 3 0 0 0 3-3v-7a3 3 0 0 1 3-3H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="5" cy="18.5" r="2" fill="#efb4a5" />
              <circle cx="19" cy="5.5" r="2" fill="#efb4a5" />
            </svg>
          </span>
          <span className="font-display text-base font-bold tracking-tight">RideFlow</span>
        </Link>

        <Link
          to="/captain-logout"
          aria-label="Sign out"
          title="Sign out"
          className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#19323a] shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
            <path d="M10 17l5-5-5-5M15 12H3m9-8h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </header>

      <div className="absolute left-1/2 top-[39%] z-[1] flex -translate-x-1/2 items-center gap-2 rounded-xl border border-white/80 bg-white/95 px-3 py-2 shadow-lg sm:top-[40%]">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#e7f0e9] text-[#315d43]" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="size-4" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-xs font-semibold leading-tight text-[#19323a]">
          {rideRequestStatus === 'accepted' ? 'Ride in progress' : 'Next pickup'}
          <br />
          <span className="font-normal text-[#697572]">
            {rideRequestStatus === 'accepted' ? '4 km remaining' : '7 min away'}
          </span>
        </span>
      </div>

      <section className={`absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-3xl shadow-[0_-12px_40px_rgba(25,50,58,0.12)] sm:bottom-6 ${
        rideRequestStatus === 'accepted'
          ? 'sm:px-0'
          : `flex max-h-[82svh] flex-col overflow-y-auto rounded-t-[28px] border-t border-white/80 bg-[#fffefa] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 sm:max-h-[540px] sm:rounded-[24px] sm:border sm:px-7 sm:pt-6 ${
            rideRequestStatus === 'ignored' ? 'min-h-[min(360px,45svh)] sm:min-h-[360px]' : ''
          }`
      }`}>
        {rideRequestStatus === 'accepted' ? (
          <CaptainRiding onComplete={() => navigate('/finish-ride')} />
        ) : rideRequestStatus === 'confirming' ? (
          <div className="mx-auto w-full max-w-md rounded-t-[28px] bg-[#fffefa] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:rounded-[24px] sm:px-7 sm:pb-6">
            <ConfirmRidePopUp
              onAccept={() => setRideRequestStatus('accepted')}
              onDecline={() => setRideRequestStatus('ignored')}
            />
          </div>
        ) : (
          <>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#d8d8cf] sm:hidden" />
            {rideRequestStatus === 'pending' ? (
              <RidePopup
                status={rideRequestStatus}
                onConfirm={() => setRideRequestStatus('confirming')}
                onIgnore={() => setRideRequestStatus('ignored')}
              />
            ) : (
              <>
            <CaptainDetail captain={captain} />

            <div className="my-6 h-px shrink-0 bg-[#ecebe5]" />

            <div className="grid grid-cols-3 gap-2.5">
              {stats.map((stat) => (
                <div key={stat.label} className="flex min-w-0 flex-col items-center rounded-2xl bg-[#f5f5f1] px-2 py-4 text-center">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="mb-2 size-6 fill-none stroke-[#19323a]" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {stat.icon}
                  </svg>
                  <p className="font-display text-base font-bold text-[#19323a]">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] leading-tight text-[#697572] sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-3 text-center text-[10px] text-[#8b928d]">Sample dashboard figures</p>
            <button
              type="button"
              onClick={() => setRideRequestStatus('pending')}
              className="mt-4 min-h-12 w-full rounded-xl border border-[#d8d8cf] px-4 text-sm font-bold text-[#19323a] transition-colors hover:bg-[#f5f4ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
            >
              View ride request preview
            </button>
              </>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default CaptainHome
