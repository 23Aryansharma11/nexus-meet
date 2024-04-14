"use client"
import { useCall, useCallStateHooks, LoadingIndicator } from '@stream-io/video-react-sdk';
import { Circle, Disc2, Mic, MicOff, Monitor, MonitorCheck, PhoneOff, Video, VideoOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { useToast } from './ui/use-toast';
import { cn } from '@/lib/utils';

const CustomCallControls = () => {
    const router = useRouter();
    const { toast } = useToast()
    const { useMicrophoneState, useCameraState, useScreenShareState, useHasOngoingScreenShare, useIsCallRecordingInProgress } = useCallStateHooks();
    const call = useCall();
    const { microphone, isMute:isAudioMute } = useMicrophoneState();
    const { camera, isMute:isCameraMute } = useCameraState();
    const { screenShare, isMute: isScreenSharing } = useScreenShareState();
    const isSomeoneScreenSharing = useHasOngoingScreenShare();
    const isCallRecordingInProgress = useIsCallRecordingInProgress();
    const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
    useEffect(() => {
        setIsAwaitingResponse((isAwaiting) => {
          if (isAwaiting) return false;
          return isAwaiting;
        });
      }, [isCallRecordingInProgress]);

      const toggleRecording = useCallback(async () => {
        try {
          setIsAwaitingResponse(true);
          if (isCallRecordingInProgress) {
            await call?.stopRecording();
            toast({title: "Call recording stopped",className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-[#19232d] text-white outline-none rounded-xl border-0'
              )})
          } else {
            await call?.startRecording();
            toast({title: "Call recording started",className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-[#19232d] text-white outline-none rounded-xl border-0'
              )
            })
          }
        } catch (e) {
          console.error(`Failed start recording`, e);
        }
      }, [call, isCallRecordingInProgress]);

      const endMyCall = ()=>{
        call?.leave();
        router.replace('/');
      }
  return (
    <div className=' flex w-[90%] gap-6 justify-center items-center'>
        {/* Toggle Audio */}
        <button onClick={() => microphone.toggle()} className={`cursor-pointer rounded-2xl px-2 py-1 hover:bg-[#4c535b] ${isAudioMute? "bg-red-500": "bg-[#19232d]"}`}>
      {isAudioMute ? (
        <MicOff />
      ) : (
        <Mic />
      )}
    </button>
    {/* Toogle Video */}
    <button onClick={() => camera.toggle()} className={`cursor-pointer rounded-2xl px-2 py-1 ${!isCameraMute? "bg-[#19232d]": "bg-red-500"}`}>
      {isCameraMute ? (
        <VideoOff />
      ) : (
        <Video />
      )}
    </button>

      {/* Screen Share */}

      <button
      disabled={!isScreenSharing && isSomeoneScreenSharing}
      onClick={() => screenShare.toggle()}
      className={`cursor-pointer rounded-2xl px-2 py-1 hover:bg-[#4c535b] bg-[#19232d]`}
      >
      {isScreenSharing ? (
        <Monitor />
      ) : (
        <MonitorCheck />
      )}
    </button>

      {/* Recording */}
      {isAwaitingResponse ? (
        <LoadingIndicator
          tooltip={
            isCallRecordingInProgress
              ? 'Waiting for recording to stop... '
              : 'Waiting for recording to start...'
          }
        />
      ) : (
        <button disabled={!call} title="Record call" onClick={toggleRecording} className={`cursor-pointer rounded-2xl px-2 py-1 hover:bg-[#4c535b] bg-[#19232d]`}
        >
          {isCallRecordingInProgress ? (
            <Disc2 />
          ) : (
            <Circle />
          )}
        </button>
      )}

      <button onClick={endMyCall} className='bg-red-600 rounded-2xl px-2 py-1'>
        <PhoneOff />
      </button>
    </div>
  )
}

export default CustomCallControls
