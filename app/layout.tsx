import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { LayoutChildProps } from "@/types";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import ModalProvider from "@/components/providers/modal-provider";
import { ErrorBoundary } from "@/components/providers/error-boundry";
import Error404 from "@/components/shared/Error404";
import SubscriptionProvider from "@/components/providers/subscription-provider";

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
            <Toaster position="top-center" />
            <ModalProvider />
            <SubscriptionProvider>
              <ErrorBoundary fallback={<Error404 />}>{children}</ErrorBoundary>
            </SubscriptionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
