'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'


function UserProvider({children}:{children:React.ReactNode}) {
   
    return (
       <>
            <SessionProvider>
                {children}
            </SessionProvider>
       </> 
    )
}

export default UserProvider
