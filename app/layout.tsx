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
          
          {/* Bland Web Widget */}
          <Script
            id="bland-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(b,l,a,n,d){
                  b.Bland=function(){(b.Bland.q=b.Bland.q||[]).push(arguments)};
                  var s=l.createElement('script');
                  s.async=true;
                  s.src=a;
                  s.onload = function() {
                    // Initialize AFTER the script loads
                    Bland('init', {
                      widgetId: '42ee0bcc-4714-48fa-a203-7d297d3715c4',
                      request_data: {
                        userType: 'prospect',
                        product: 'GBL',
                        page: window.location.pathname
                      }
                    });
                  };
                  l.head.appendChild(s);
                })(window,document,'https://us.api.bland.ai/widget/loader.js');
              `
            }}
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
