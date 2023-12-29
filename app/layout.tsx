import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { LayoutChildProps } from "@/types";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import ModalProvider from "@/components/providers/modal-provider";
import SubscriptionProvider from "@/components/providers/subscription-provider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Google Drive",
  description: "Practics",
  icons: "/svg/logo.svg",
};

export default function RootLayout({ children }: LayoutChildProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="google-drive"
          >
            <NextTopLoader
              color="#2299dd"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299dd,0 0 5px #2299dd"
            />
            <Toaster position="top-center" />
            <ModalProvider />
            <SubscriptionProvider>
              {/* <ErrorBoundary fallback={<Error404 />}> */}
              {children}
              {/* </ErrorBoundary> */}
            </SubscriptionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
