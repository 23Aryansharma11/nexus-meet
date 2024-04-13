import StremVideoProvider from '@/providers/StreamClientProvider';
import { Metadata } from 'next';
import React, {ReactNode} from 'react';
export const metadata: Metadata = {
  title: "Nexus Meet",
  description: "Video Calling App",
  icons:{
    icon: "/icons/logo.svg"
  }
};
const layout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      <StremVideoProvider>
        {children}
      </StremVideoProvider>
    </main>
  )
}

export default layout