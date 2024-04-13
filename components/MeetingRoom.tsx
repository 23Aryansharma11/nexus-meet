"use client"
import { cn } from '@/lib/utils'
import {   CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users2Icon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right' | 'speaker-top' | 'speaker-bottom'

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout, setlayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setshowParticipants] = useState(false)

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if(callingState != CallingState.JOINED) return <Loader />
  const CallLayout = ()=>{
    switch(layout){
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />
        case 'speaker-left':
          return <SpeakerLayout participantsBarPosition="right" />
        case 'speaker-top':
          return <SpeakerLayout participantsBarPosition="bottom" />
        default:
          return <SpeakerLayout participantsBarPosition="top" />
    }
  }
  const router = useRouter()
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white '>
      <div className=' relative flex size-full items-center justify-center'>
        <div className=' flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh - 86px)] hidden ml-2', { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={()=> setshowParticipants(false)}/>
        </div>
      </div>
      <div className=' flex-wrap fixed bottom-0 flex w-full items-center justify-center gap-5'>
          <CallControls onLeave={()=> router.push('/')}/>
          <DropdownMenu>
            <div className=' flex items-center '>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232D] px-4 py-2 hover:bg-[#4C535B]'> <LayoutList size={20} className=' text-white' /></DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className='border-dark-1 bg-dark-1 text-[#F5F5F5]'>
              {
                ['grid', 'speaker-left', 'speaker-right', 'speaker-bottom', 'speaker-top'].map((item, index)=>(
                  <div key={index} className='text-[#F5F5F5] capitalize'> 
                      <DropdownMenuItem  className="cursor-pointer" onClick={()=> setlayout(item as CallLayoutType)}>
                        {item}
                      </DropdownMenuItem>
                  <DropdownMenuSeparator className='border-dark-1' /> 
                  </div> 
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton />
            <button onClick={()=> setshowParticipants((prev)=> !prev )}>
                <div className=' cursor-pointer rounded-2xl bg-[#19232D] px-4 py-2 hover:bg-[#4C535B]'>
                  <Users2Icon  size={20} className='text-white'/>
                </div>
            </button>

            {!isPersonalRoom &&( <EndCallButton /> ) }

      </div>
    </section>
  )
}

export default MeetingRoom