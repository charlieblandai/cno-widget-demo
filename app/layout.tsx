import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AppProvider } from "@/lib/app-context";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Colonial Penn - Get a Quote",
  description: "Guaranteed Acceptance Whole Life Insurance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AppProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* Bland Web Widget - CORRECTED */}
          <Script
            id="bland-settings"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.blandSettings = {
                  widget_id: "d95464c-7f3e-41a0-bd36-0d6c16e64882",
                  request_data: {
                    userType: "prospect",
                    product: "GBL",
                    page: window.location.pathname
                  }
                };
              `
            }}
          />
          <Script
            src="https://widget.bland.ai/loader.js"
            strategy="afterInteractive"
            defer
          />

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-gray-600">
                  © Colonial Penn® Program 2013-2025
                </div>
                <div className="flex space-x-6 text-sm">
                  <a href="#" className="text-[#003DA5] hover:underline">Terms of use</a>
                  <a href="#" className="text-[#003DA5] hover:underline">Privacy Policy</a>
                  <a href="#" className="text-[#003DA5] hover:underline">Notices and Disclosures</a>
                </div>
              </div>
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
