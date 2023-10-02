import { useState, createContext, useContext } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

export interface AppContextType {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

export const AppContext = createContext<AppContextType | null>(null)

interface AppProviderProps {
  children: React.ReactNode
}

function AppProvider({ children }: AppProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(Boolean(getAccessTokenFromLS()))
  const [profile, setProfile] = useState<User | null>(getProfileFromLS())

  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}

function useApp() {
  const context = useContext(AppContext) as AppContextType
  if (context === undefined || context === null) throw new Error('AppContext was used outside of the AppProvider')
  return context
}

export { useApp, AppProvider }
