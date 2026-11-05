import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import ConfirmRide from './ConfirmRide'
import WaitingForDriver from './WaitingForDriver'
import RideMap from '../components/RideMap'

const UserHome = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [activeLocation, setActiveLocation] = useState('pickup')
  const [isPickupExpanded, setIsPickupExpanded] = useState(false)
  const [isVehicleExpanded, setIsVehicleExpanded] = useState(false)
  const [isConfirmExpanded, setIsConfirmExpanded] = useState(false)
  const [isSearchingDriver, setIsSearchingDriver] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [locationMessage, setLocationMessage] = useState('')
  const {user} = useContext(UserDataContext)

  const normalizeLocation = (location) => location.trim().replace(/\s+/g, ' ').toLowerCase()
  const locationsAreSame = normalizeLocation(pickup) === normalizeLocation(destination)

  const updateLocation = (location, value) => {
    const nextPickup = location === 'pickup' ? value : pickup
    const nextDestination = location === 'destination' ? value : destination

    if (nextPickup.trim() && nextDestination.trim() &&
      normalizeLocation(nextPickup) === normalizeLocation(nextDestination)) {
      setLocationMessage('Pickup and destination cannot be the same place.')
      return
    }

    setLocationMessage('')

    if (location === 'pickup') {
      setPickup(value)
    } else {
      setDestination(value)
    }
  }

  useEffect(() => {
    if (!locationMessage) return

    const timeout = setTimeout(() => setLocationMessage(''), 3000)
    return () => clearTimeout(timeout)
  }, [locationMessage])

  const pickupLocations = [
    {
      name: 'Kempegowda International Airport',
      address: 'KIAL Rd, Devanahalli, Bengaluru, Karnataka',
      icon: '✈',
    },
    {
      name: 'Phoenix Marketcity',
      address: 'Whitefield Rd, Mahadevapura, Bengaluru, Karnataka',
      icon: '●',
    },
    {
      name: 'Salarpuria Aura Block B',
      address: 'Block-B, Touch Stone, Chandana, Bengaluru, Karnataka',
      icon: '●',
    },
    {
      name: 'Sheraton Grand Bengaluru Whitefield',
      address: 'Prestige Shantiniketan Road, Bengaluru, Karnataka',
      icon: '▰',
    },
    {
      name: 'KSR Bengaluru City Junction',
      address: 'M.G. Railway Colony, Majestic, Bengaluru, Karnataka',
      icon: '●',
    },
  ]

  const vehicles = [
    {
      name: 'Car',
      description: 'Affordable, comfortable rides',
      capacity: '4 seats',
      icon: '🚘',
      price: '₹193.20',
    },
    {
      name: 'Bike',
      description: 'A quick ride through the city',
      capacity: '1 seat',
      icon: '🏍️',
      price: '₹65.00',
    },
    {
      name: 'Auto',
      description: 'Easy city travel',
      capacity: '3 seats',
      icon: '🛺',
      price: '₹118.86',
    },
  ]
  const selectedVehicleDetails = vehicles.find((vehicle) => vehicle.name === selectedVehicle)

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#e8ebe4] text-[#19323a]">
      <div className="absolute inset-0 z-0">
        <RideMap className="z-0" />
      </div>

      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
        <Link
          to="/home"
          aria-label="RideFlow home"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/90 py-2 pl-2 pr-4 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-[#19323a] text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M5 18.5h2.5a3 3 0 0 0 3-3v-7a3 3 0 0 1 3-3H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="5" cy="18.5" r="2" fill="#efb4a5" />
              <circle cx="19" cy="5.5" r="2" fill="#efb4a5" />
            </svg>
          </span>
          <span className="font-display text-base font-bold tracking-tight text-[#19323a]">RideFlow</span>
        </Link>

        <Link
          to="/user-logout"
          aria-label="Sign out"
          title={user?.fullName?.firstName ? `Sign out, ${user.fullName.firstName}` : 'Sign out'}
          className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#19323a] shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M5.5 20c.5-3.5 2.8-5.3 6.5-5.3s6 1.8 6.5 5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </Link>
      </header>

      <section className={`absolute inset-x-0 bottom-0 z-10 flex flex-col overflow-hidden border-t border-white/80 bg-[#fffefa] px-5 pb-6 pt-3 shadow-[0_-12px_40px_rgba(25,50,58,0.12)] transition-[height] duration-500 ease-in-out sm:bottom-6 sm:left-6 sm:right-auto sm:w-[460px] sm:rounded-[24px] sm:border sm:p-7 ${
        isSearchingDriver
          ? 'h-[min(620px,72svh)] rounded-t-[28px] sm:h-[min(600px,75svh)]'
          : isConfirmExpanded
          ? 'h-[min(620px,72svh)] rounded-t-[28px] sm:h-[min(600px,75svh)]'
          : isVehicleExpanded
          ? 'h-[min(620px,68svh)] rounded-t-[28px] sm:h-[min(560px,70svh)]'
          : isPickupExpanded
          ? 'h-[100svh] rounded-none sm:h-[min(760px,88svh)] sm:rounded-[24px]'
          : 'h-[min(370px,82svh)] rounded-t-[28px] sm:h-[410px]'
      }`}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#d8d8cf] sm:hidden" />
        {isSearchingDriver ? (
          <div className="mb-3 flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => {
                setIsSearchingDriver(false)
                setIsConfirmExpanded(true)
              }}
              aria-label="Back to ride confirmation"
              className="flex size-9 items-center justify-center rounded-full text-[#19323a] transition hover:bg-[#f1f0eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 rotate-90" fill="none">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h2 className="ml-2 text-base font-bold text-[#19323a]">Ride request</h2>
          </div>
        ) : isConfirmExpanded ? (
          <div className="mb-3 flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => setIsConfirmExpanded(false)}
              aria-label="Back to vehicle selection"
              className="flex size-9 items-center justify-center rounded-full text-[#19323a] transition hover:bg-[#f1f0eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 rotate-90" fill="none">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h2 className="ml-2 text-base font-bold text-[#19323a]">Confirm your ride</h2>
          </div>
        ) : isVehicleExpanded ? (
          <div className="mb-3 flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => setIsVehicleExpanded(false)}
              aria-label="Collapse vehicle options"
              className="flex size-9 items-center justify-center rounded-full text-[#19323a] transition hover:bg-[#f1f0eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="ml-2">
              <h2 className="text-base font-bold text-[#19323a]">Choose a vehicle</h2>
              <p className="text-xs text-[#697572]">Select a ride for your trip</p>
            </div>
          </div>
        ) : isPickupExpanded && (
          <div className="mb-3 flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => setIsPickupExpanded(false)}
              aria-label={`Collapse ${activeLocation} suggestions`}
              className="flex size-9 items-center justify-center rounded-full text-[#19323a] transition hover:bg-[#f1f0eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="ml-2 text-sm font-semibold text-[#536562]">
              Choose a {activeLocation} location
            </span>
          </div>
        )}
        {!isVehicleExpanded && !isSearchingDriver && <div className="mb-5 shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#657c7c]">RideFlow rides</p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#19323a]">Find a trip</h1>
          <p className="mt-1 text-sm text-[#697572]">Where would you like to go?</p>
        </div>}

        {!isVehicleExpanded && !isSearchingDriver && <div className="relative shrink-0 space-y-2.5">
          <div className="pointer-events-none absolute bottom-9 left-[19px] top-9 border-l border-dashed border-[#9da9a2]" />
          <label className="relative flex h-[54px] items-center gap-3 rounded-xl border border-[#ecebe5] bg-[#f5f4ef] px-3 transition focus-within:border-[#8da4a0] focus-within:bg-white">
            <span className="z-10 flex size-[14px] shrink-0 items-center justify-center rounded-full border-[3px] border-[#19323a] bg-[#f5f4ef]" aria-hidden="true" />
            <span className="sr-only">Pickup location</span>
            <input
              type="text"
              value={pickup}
              onChange={(e) => updateLocation('pickup', e.target.value)}
              onFocus={() => {
                setActiveLocation('pickup')
                setIsPickupExpanded(true)
              }}
              placeholder="Add a pickup location"
              autoComplete="street-address"
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-[#19323a] outline-none placeholder:font-normal placeholder:text-[#77817c]"
            />
            {pickup && (
              <button
                type="button"
                onClick={() => updateLocation('pickup', '')}
                aria-label="Clear pickup location"
                className="rounded-full px-1 text-lg leading-5 text-[#77817c] hover:text-[#19323a]"
              >
                ×
              </button>
            )}
          </label>

          <label className="relative flex h-[54px] items-center gap-3 rounded-xl border border-[#ecebe5] bg-[#f5f4ef] px-3 transition focus-within:border-[#8da4a0] focus-within:bg-white">
            <span className="z-10 size-[14px] shrink-0 border-[3px] border-[#d96950] bg-[#f5f4ef]" aria-hidden="true" />
            <span className="sr-only">Destination</span>
            <input
              type="text"
              value={destination}
              onChange={(e) => updateLocation('destination', e.target.value)}
              onFocus={() => {
                setActiveLocation('destination')
                setIsPickupExpanded(true)
              }}
              placeholder="Enter your destination"
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-[#19323a] outline-none placeholder:font-normal placeholder:text-[#77817c]"
            />
            {destination && (
              <button
                type="button"
                onClick={() => updateLocation('destination', '')}
                aria-label="Clear destination"
                className="rounded-full px-1 text-lg leading-5 text-[#77817c] hover:text-[#19323a]"
              >
                ×
              </button>
            )}
          </label>
        </div>}

        {isSearchingDriver && selectedVehicleDetails ? (
          <WaitingForDriver
            pickup={pickup}
            destination={destination}
            vehicle={selectedVehicleDetails}
            onCancel={() => {
              setIsSearchingDriver(false)
              setIsConfirmExpanded(true)
            }}
          />
        ) : isConfirmExpanded && selectedVehicleDetails ? (
          <ConfirmRide
            pickup={pickup}
            destination={destination}
            vehicle={selectedVehicleDetails}
            onConfirm={() => {
              setIsConfirmExpanded(false)
              setIsSearchingDriver(true)
            }}
          />
        ) : isVehicleExpanded && (
          <>
            <div className="mb-3 flex shrink-0 items-center gap-2 rounded-lg bg-[#f5f4ef] px-3 py-2 text-xs text-[#536562]">
              <span className="max-w-[45%] truncate font-semibold text-[#19323a]">{pickup}</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 shrink-0" fill="none">
                <path d="M3 10h13m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="min-w-0 truncate font-semibold text-[#19323a]">{destination}</span>
            </div>
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.name}
                  type="button"
                  onClick={() => setSelectedVehicle(vehicle.name)}
                  aria-pressed={selectedVehicle === vehicle.name}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950] ${
                    selectedVehicle === vehicle.name
                      ? 'border-[#19323a] bg-[#f1f4f1]'
                      : 'border-[#ecebe5] bg-white hover:border-[#9eafa5]'
                  }`}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#f5f4ef] text-2xl" aria-hidden="true">
                    {vehicle.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-[#19323a]">{vehicle.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-[#697572]">{vehicle.description}</span>
                    <span className="mt-1 block text-[11px] font-medium text-[#87918a]">{vehicle.capacity}</span>
                  </span>
                  <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                    selectedVehicle === vehicle.name ? 'border-[#19323a] bg-[#19323a] text-white' : 'border-[#c9cec7]'
                  }`} aria-hidden="true">
                    {selectedVehicle === vehicle.name && (
                      <svg viewBox="0 0 16 16" className="size-3" fill="none">
                        <path d="m3.5 8 3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!selectedVehicle}
              onClick={() => setIsConfirmExpanded(true)}
              className="mt-3 flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl bg-[#19323a] px-4 text-sm font-bold text-white transition-colors hover:bg-[#294b53] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950] disabled:cursor-not-allowed disabled:bg-[#aab4ae]"
            >
              {selectedVehicle ? `Select ${selectedVehicle}` : 'Select a vehicle'}
            </button>
          </>
        )}

        {!isVehicleExpanded && isPickupExpanded && (
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-[#eeede7]">
            <p className="px-1 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#87918a]">
              Suggested {activeLocation} locations
            </p>
            {pickupLocations.map((location) => (
              <button
                key={location.name}
                type="button"
                onClick={() => {
                  if (activeLocation === 'pickup') {
                    updateLocation('pickup', location.name)
                  } else {
                    updateLocation('destination', location.name)
                  }
                }}
                className="flex w-full items-center gap-3 border-b border-[#f0efe9] px-1 py-3.5 text-left transition-colors hover:bg-[#f8f7f2] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#d96950]"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f0f1ec] text-sm text-[#536562]" aria-hidden="true">
                  {location.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[#19323a]">{location.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-[#707b75]">{location.address}</span>
                </span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 shrink-0 text-[#9aa39c]" fill="none">
                  <path d="m7.5 4 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                updateLocation('pickup', 'Current location')
              }}
              className="flex w-full items-center gap-3 px-1 py-4 text-left transition-colors hover:bg-[#f8f7f2] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#d96950]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e7f0e9] text-[#315d43]" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="size-4" fill="none">
                  <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-[#19323a]">Set location on map</span>
            </button>
          </div>
        )}

        {!isVehicleExpanded && pickup.trim() && destination.trim() && !locationsAreSame && (
          <button
            type="button"
            onClick={() => {
              setIsPickupExpanded(false)
              setIsVehicleExpanded(true)
            }}
            className="mt-4 flex min-h-12 w-full shrink-0 items-center justify-between rounded-xl bg-[#19323a] px-4 text-sm font-bold text-white transition-colors hover:bg-[#294b53] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d96950]"
          >
            <span>{selectedVehicle ? `Choose vehicle · ${selectedVehicle}` : 'Choose a vehicle'}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M4.5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </section>
      {locationMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="absolute bottom-5 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-2 rounded-full border border-[#e5a89a] bg-white px-4 py-3 text-sm font-medium text-[#19323a] shadow-lg"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f9e9e5] text-xs font-bold text-[#a64131]" aria-hidden="true">
            !
          </span>
          <span>{locationMessage}</span>
        </div>
      )}
    </main>
  )
}

export default UserHome
