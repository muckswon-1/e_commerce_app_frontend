import React, { createContext, useContext, useState } from 'react'

const SharedContext = createContext();

export function SharedProvider({children}) {
    const [sharedState, setSharedState] = useState({
        authData: null,
        cartData: []
    })

  return (
    <SharedContext.Provider value={{sharedState, setSharedState}}>
        {children}
    </SharedContext.Provider>
  )
}

export function useSharedContext() {
    return useContext(SharedContext)
}