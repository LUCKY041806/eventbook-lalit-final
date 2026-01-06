import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Event Management & Ticket Booking",
  description: "Final year project by Lalit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        style={{ 
          margin: 0,
          minHeight: '100vh', 
          backgroundColor: '#f8fafc', 
          color: '#0f172a', 
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          display: 'flex',
          flexDirection: 'column'
        }}
        suppressHydrationWarning
      >
        <header style={{backgroundColor: '#4f46e5', color: 'white'}}>
          <nav style={{
            maxWidth: '1280px', 
            margin: '0 auto', 
            padding: '1rem',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h1 style={{fontWeight: 600, fontSize: 'clamp(1.1rem, 4vw, 1.25rem)'}}>
              EventBook
            </h1>
            <div style={{
              display: 'flex', 
              gap: '1rem', 
              fontSize: 'clamp(0.8rem, 3vw, 0.875rem)'
            }}>
              <Link href="/" style={{textDecoration: 'none', color: 'white', whiteSpace: 'nowrap'}}>Home</Link>
              <Link href="/events" style={{textDecoration: 'none', color: 'white', whiteSpace: 'nowrap'}}>Events</Link>
              <Link href="/organizer" style={{textDecoration: 'none', color: 'white', whiteSpace: 'nowrap'}}>Organizer</Link>
              <Link href="/login" style={{textDecoration: 'none', color: 'white', whiteSpace: 'nowrap'}}>Login</Link>
            </div>
          </nav>
        </header>
        
        <main style={{
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: 'clamp(1rem, 5vw, 1.5rem) clamp(1rem, 5vw, 2rem)',
          flex: 1
        }}>
          {children}
        </main>
        
        <footer style={{
          borderTop: '1px solid #e2e8f0', 
          marginTop: 'auto',
          padding: 'clamp(1rem, 4vw, 2rem) clamp(1rem, 5vw, 2rem)', 
          textAlign: 'center', 
          fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', 
          color: '#64748b',
          backgroundColor: 'white'
        }}>
          © {new Date().getFullYear()} EventBook - Final Year Project by Lalit
        </footer>
      </body>
    </html>
  );
}
