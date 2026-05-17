import { Outlet } from 'react-router';
import { DairyNav } from './DairyNav';
import { FloatingBubbles } from './FloatingBubbles';
import { CursorFollower } from './CursorFollower';
import { Footer } from './Footer';

export function DairyLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Decorative Background Elements */}
      <FloatingBubbles />
      <CursorFollower />
      
      {/* Main Navigation */}
      <DairyNav />
      
      {/* Active Page Content (Home or Order Page) */}
      <main className="relative z-10">
        <Outlet />
      </main>
      
      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}