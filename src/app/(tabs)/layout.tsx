import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-full w-full min-h-dvh">
      {/* Desktop Sidebar (hidden on mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto pb-24 md:pb-6 relative">
          {children}
        </div>
        {/* Mobile Bottom Navigation (hidden on desktop) */}
        <BottomNav />
      </div>
    </div>
  );
}
