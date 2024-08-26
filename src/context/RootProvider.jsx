import React, { Children } from 'react'
import { AuthProvider } from './AuthProvider'
import CartProvider from './CartProvider'
import { SharedProvider } from './SharedProvider'

function RootProvider({children}) {
  return (
    <SharedProvider>
    <AuthProvider>
        <CartProvider>
            {children}
        </CartProvider>
    </AuthProvider>
    </SharedProvider>
  )
}

export default RootProvider