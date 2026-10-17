import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className="relative isolate grid min-h-svh grid-rows-[52svh_48svh] overflow-hidden bg-[#f6f0e7] text-[#19323a] lg:min-h-screen lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-1">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[52svh] bg-[#efb4a5] lg:inset-y-0 lg:left-[48%] lg:h-auto" />

      <header className="absolute left-6 top-5 z-20 flex items-center gap-3 sm:left-10 sm:top-8 lg:left-14">
        <img src="/Smiling%20Biker%20on%20a%20Chopper.png" alt="" className="h-10 w-16 object-contain sm:h-12 sm:w-[72px]" />
        <span className="font-display text-[22px] font-bold tracking-normal text-[#202823] sm:text-2xl">RideFlow</span>
      </header>

      <section className="relative isolate order-1 flex min-h-0 items-end justify-center overflow-hidden px-5 pb-2 pt-16 lg:order-2 lg:items-center lg:px-8 lg:pb-0 lg:pt-20">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div className="rideflow-landscape-track">
            <img src="/rideflow-landscape.svg" alt="" />
            <img src="/rideflow-landscape.svg" alt="" />
          </div>
        </div>
        <div className="rideflow-rider relative z-10 h-full max-h-[390px] w-full max-w-[440px] lg:max-h-[76vh] lg:max-w-[620px]">
          <img
            src="/Smiling%20Biker%20on%20a%20Chopper.png"
            alt="Cartoon illustration of a smiling rider on a chopper motorcycle"
            className="absolute inset-0 h-full w-full object-contain"
          />
          <svg aria-hidden="true" viewBox="0 0 1536 1024" className="pointer-events-none absolute inset-0 h-full w-full">
            <circle cx="215" cy="785" r="182" fill="#111419" />
            <g className="rideflow-wheel-spokes--rear" stroke="#BFC4C8" strokeWidth="9">
              <path d="M215 613v344M43 785h344M93 663l244 244M93 907l244-244M149 626l132 318M149 944l132-318M56 719l318 132M56 851l318-132" />
            </g>
            <circle cx="215" cy="785" r="176" fill="none" stroke="#E5E7E8" strokeWidth="9" />
            <circle cx="215" cy="785" r="28" fill="#252A30" stroke="#D3D7D9" strokeWidth="12" />

            <circle cx="1298" cy="785" r="182" fill="#111419" />
            <g className="rideflow-wheel-spokes--front" stroke="#BFC4C8" strokeWidth="9">
              <path d="M1298 613v344M1126 785h344M1176 663l244 244M1176 907l244-244M1232 626l132 318M1232 944l132-318M1139 719l318 132M1139 851l318-132" />
            </g>
            <circle cx="1298" cy="785" r="176" fill="none" stroke="#E5E7E8" strokeWidth="9" />
            <path d="m1207 625 91 160" stroke="#111419" strokeWidth="48" strokeLinecap="round" />
            <path d="m1207 625 91 160" stroke="#AEB6BD" strokeWidth="24" strokeLinecap="round" />
            <circle cx="1298" cy="785" r="28" fill="#252A30" stroke="#D3D7D9" strokeWidth="12" />
          </svg>
        </div>
        <span aria-hidden="true" className="absolute bottom-5 left-1/2 z-10 h-px w-3/5 -translate-x-1/2 bg-[#19323a]/15 lg:bottom-[12%] lg:w-2/3" />
      </section>

      <section className="order-2 flex min-h-0 flex-col justify-center px-6 pb-7 pt-3 sm:px-10 lg:order-1 lg:px-14 lg:pb-12 lg:pt-24 xl:px-20">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#657c7c] sm:text-xs">Your city, your way</p>
        <h1 className="font-display text-[34px] font-bold leading-[1.08] tracking-normal sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
          Get started<br className="hidden sm:block" /> with <span className="text-[#d96950]">RideFlow.</span>
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-[#626e6b] sm:mt-5 sm:text-base sm:leading-7">
          A smoother start to your next ride begins here.
        </p>
        <Link
          to="/login"
          className="mt-5 flex min-h-12 w-full max-w-sm items-center justify-between rounded-[5px] bg-[#19323a] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294b53] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d96950] sm:mt-8 sm:min-h-14 sm:px-6 sm:text-base"
        >
          <span>Continue</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
            <path d="M4.5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </main>
  )
}

export default Home
