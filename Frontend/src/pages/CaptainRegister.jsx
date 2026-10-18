import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRegister = () => {
  return (
    <main className="min-h-svh bg-[#f6f0e7] text-[#19323a]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-[#efb4a5]" />
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 sm:px-10 lg:px-14">
        <header className="flex h-20 items-center justify-between">
          <Link to="/" aria-label="Back to RideFlow home" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d96950]">
            <img src="/captain-mascot.svg" alt="Captain mascot" className="size-12 rounded-[14px] sm:size-14" />
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
          <section className="w-full max-w-[560px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#657c7c]">Captain registration</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-[#19323a] sm:text-5xl">Join RideFlow.</h1>
            <p className="mt-3 text-sm leading-6 text-[#626e6b] sm:text-base">Create your captain profile and add your vehicle details.</p>

            <form onSubmit={(event) => event.preventDefault()} className="mt-8 space-y-5 sm:mt-9">
              <fieldset className="min-w-0 border-0 p-0">
                <legend className="mb-2 text-sm font-semibold text-[#19323a]">Full name</legend>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label htmlFor="captain-first-name" className="block text-xs font-medium text-[#626e6b]">First name</label>
                    <input
                      id="captain-first-name"
                      name="fullName.firstName"
                      type="text"
                      minLength={3}
                      required
                      autoComplete="given-name"
                      placeholder="First name"
                      className="h-14 min-w-0 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-3 text-sm text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10 sm:px-4 sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="captain-last-name" className="block text-xs font-medium text-[#626e6b]">Last name <span className="font-normal">(optional)</span></label>
                    <input
                      id="captain-last-name"
                      name="fullName.lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last name"
                      className="h-14 min-w-0 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-3 text-sm text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10 sm:px-4 sm:text-base"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="space-y-2">
                <label htmlFor="captain-register-email" className="block text-sm font-semibold text-[#19323a]">Email address</label>
                <input
                  id="captain-register-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  autoCapitalize="none"
                  placeholder="you@example.com"
                  className="h-14 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-4 text-base text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="captain-register-password" className="block text-sm font-semibold text-[#19323a]">Password</label>
                <input
                  id="captain-register-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="h-14 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-4 text-base text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10"
                />
              </div>

              <fieldset className="min-w-0 border-0 p-0">
                <legend className="mb-2 text-sm font-semibold text-[#19323a]">Vehicle details</legend>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label htmlFor="vehicle-color" className="block text-xs font-medium text-[#626e6b]">Vehicle color</label>
                    <input
                      id="vehicle-color"
                      name="vehicle.color"
                      type="text"
                      minLength={3}
                      required
                      placeholder="e.g. Black"
                      className="h-14 min-w-0 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-3 text-sm text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10 sm:px-4 sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="vehicle-plate" className="block text-xs font-medium text-[#626e6b]">License plate</label>
                    <input
                      id="vehicle-plate"
                      name="vehicle.plate"
                      type="text"
                      minLength={3}
                      required
                      autoCapitalize="characters"
                      placeholder="e.g. ABC123"
                      className="h-14 min-w-0 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-3 text-sm text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10 sm:px-4 sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="vehicle-capacity" className="block text-xs font-medium text-[#626e6b]">Passenger capacity</label>
                    <input
                      id="vehicle-capacity"
                      name="vehicle.capacity"
                      type="number"
                      min={1}
                      step={1}
                      required
                      placeholder="e.g. 4"
                      className="h-14 min-w-0 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-3 text-sm text-[#19323a] outline-none transition-shadow placeholder:text-[#969c94] focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10 sm:px-4 sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="vehicle-type" className="block text-xs font-medium text-[#626e6b]">Vehicle type</label>
                    <select
                      id="vehicle-type"
                      name="vehicle.vehicleType"
                      required
                      defaultValue=""
                      className="h-14 min-w-0 w-full rounded-[5px] border border-[#d8d8cf] bg-white px-3 text-sm text-[#19323a] outline-none transition-shadow focus:border-[#19323a] focus:ring-2 focus:ring-[#19323a]/10 sm:px-4 sm:text-base"
                    >
                      <option value="" disabled>Select type</option>
                      <option value="bike">Bike</option>
                      <option value="car">Car</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              <button type="submit" className="flex h-14 w-full items-center justify-between rounded-[5px] bg-[#19323a] px-5 text-sm font-bold text-white transition-colors hover:bg-[#294b53] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d96950] sm:text-base">
                <span>Create captain account</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
                  <path d="M4.5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#626e6b]">
              Already a captain?{' '}
              <Link to="/captain-login" className="font-bold text-[#19323a] underline decoration-[#d96950] decoration-2 underline-offset-4 hover:text-[#d96950]">Log in</Link>
            </p>

            <div className="my-7 flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-[#d8d8cf]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b9088]">or</span>
              <span className="h-px flex-1 bg-[#d8d8cf]" />
            </div>

            <Link to="/register" className="flex min-h-14 w-full items-center justify-center rounded-[5px] border border-[#b8c0b8] bg-transparent px-5 text-sm font-bold text-[#19323a] transition-colors hover:border-[#19323a] hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d96950] sm:text-base">
              Register as a user
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}

export default CaptainRegister
