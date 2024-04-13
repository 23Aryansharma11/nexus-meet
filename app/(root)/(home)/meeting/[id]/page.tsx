"use client"

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

interface ID{
    params: {
        id: string
    }
}
const Meeting = ({params: {id}}: ID) => {
  const { call, isCallLoading } = useGetCallById(id)
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const {user, isLoaded} = useUser();

  if(!isLoaded || isCallLoading ) return <Loader />
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme >
          {
            !isSetupComplete ? (
              <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
            )
            :
            (
              <MeetingRoom />
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting