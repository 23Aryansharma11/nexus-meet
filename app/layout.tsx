import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus Meet",
  description: "Video Calling App",
  icons:{
    icon: "/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      layout:{
        logoImageUrl: '/icons/logo.svg',
        socialButtonsVariant: 'iconButton'
      },
      variables:{
        colorText: "#fff",
        colorPrimary: "#0E78F9",
        colorBackground: "#1C1F2E",
        colorInputBackground: "#252A41",
        colorInputText: "#fff"
      }
    }}
    >
        <html lang="en">
          <body className={`${inter.className} bg-dark-2`}>
            {children}
            <Toaster />
          </body>
        </html>
    </ClerkProvider>
  );
}
