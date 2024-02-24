import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./(browse)/_components/Navbar";
import Sidebar from "./(browse)/_components/Sidebar";
import Container from "./(browse)/_components/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Streameo",
  description: "Built a streaming app to develope my skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="streameo-theme"
          >
            <Navbar />
            <div className="flex h-full pt-20">
              <Sidebar />
              <Container>
                {children}
              </Container>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
