'use client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"  
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { PhoneOff } from 'lucide-react';

const EndCallButton = () => {
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant  = useLocalParticipant();
    const router = useRouter();
    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if(!isMeetingOwner)  return null;

  return (
    <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger>
        <Button onClick={async ()=> {
        await call.endCall();
        router.push('/')
    }} className=' bg-red-500 text-white rounded-full'>
        <PhoneOff size={20}/>
        </Button>
        </TooltipTrigger>
      <TooltipContent className="bg-dark-1 border-0">
      <p>End Call For Everyone</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  
  )
}

export default EndCallButton
