import { createContext, useContext, useState } from 'react'

// These exports are shared with consumers, not only React components.
// eslint-disable-next-line react-refresh/only-export-components
export const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateCaptain = (captainData) => {
    setCaptain(captainData)
  }

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  }

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
// export const useCaptain = () => useContext(CaptainDataContext)

export default CaptainContext