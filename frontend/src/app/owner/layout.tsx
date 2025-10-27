

import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/hotelOwner/Navbar";
import Sidebar from "@/components/hotelOwner/Sidebar";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {/* Owner-specific header */}
          <div className="flex flex-col h-screen">
            <Navbar />
            {/* Sidebar */}
            <div className="flex h-full">
              <Sidebar />
              {/* Main content */}
              <main className="flex-1 p-4 pt-10 md:px-10 h-full">
                {children}
                </main>
            </div>
          </div>
          {/* Footer if needed */}
        </ClerkProvider>
      </body>
    </html>
  );
}
