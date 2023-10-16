import { useState, createContext, useContext } from 'react'
import { ExtendedPurchases } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

export interface AppContextType {
  isAuthenticated: boolean
  profile: User | null
  extendedPurchases: ExtendedPurchases[]
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
}

export const AppContext = createContext<AppContextType | null>(null)

interface AppProviderProps {
  children: React.ReactNode
}

function AppProvider({ children }: AppProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(Boolean(getAccessTokenFromLS()))
  const [profile, setProfile] = useState<User | null>(getProfileFromLS())
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])
  return (
    <AppContext.Provider
      value={{ isAuthenticated, setAuthenticated, profile, setProfile, extendedPurchases, setExtendedPurchases }}
    >
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
