import { useState, createContext, useContext } from 'react'
import { getAccessTokenFromLS } from 'src/utils/auth'

export interface AppContextType {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextType | null>(null)

interface AppProviderProps {
  children: React.ReactNode
}

function AppProvider({ children }: AppProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(Boolean(getAccessTokenFromLS()))

  return <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</AppContext.Provider>
}

function useApp() {
  const context = useContext(AppContext) as AppContextType
  if (context === undefined || context === null) throw new Error('AppContext was used outside of the AppProvider')
  return context
}

export { useApp, AppProvider }
