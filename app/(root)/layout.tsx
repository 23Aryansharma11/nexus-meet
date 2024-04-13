import StremVideoProvider from '@/providers/StreamClientProvider';
import React, {ReactNode} from 'react';

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