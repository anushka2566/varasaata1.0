import { type LucideIcon } from "lucide-react";
import { Logo } from "@/components/brand";

export type SidebarTab = "play" | "online" | "friends" | "dashboard" | "settings";

export interface SidebarNavItem {
  key: SidebarTab;
  icon: LucideIcon;
  label: string;
}

interface AppSidebarProps {
  activeTab: SidebarTab;
  items: SidebarNavItem[];
  onSelect: (tab: SidebarTab) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function NavButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
        active
          ? "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/35 shadow-inner"
          : "text-stone-200/80 hover:bg-amber-500/5 hover:text-amber-100"
      }`}
    >
      <Icon className={`h-4 w-4 shrink-0 ${active ? "text-amber-300" : "text-stone-300"}`} />
      <span>{label}</span>
    </button>
  );
}

export function AppSidebar({ activeTab, items, onSelect, mobileOpen, onMobileClose }: AppSidebarProps) {
  const renderNavContent = (onItemClick?: () => void) => (
    <nav className="mt-6 flex-1 space-y-2">
      {items.map(({ key, icon, label }) => (
        <NavButton
          key={key}
          active={activeTab === key}
          icon={icon}
          label={label}
          onClick={() => {
            onSelect(key);
            onItemClick?.();
          }}
        />
      ))}
    </nav>
  );

  return (
    <>
      <aside className="fixed left-0 top-0 z-30 hidden h-[100dvh] w-64 border-r border-amber-900/40 bg-[#120d0a]/95 px-4 py-6 shadow-2xl md:flex md:flex-col">
        <div className="flex items-center gap-3 border-b border-amber-900/30 pb-4">
          <Logo size={36} />
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-[0.22em] text-amber-200">పరసాట</div>
            <div className="text-lg font-bold tracking-wide text-amber-50">VARASAATA</div>
          </div>
        </div>
        {renderNavContent()}
      </aside>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onMobileClose}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[82%] max-w-xs transform border-r border-amber-900/40 bg-[#120d0a]/95 p-4 shadow-2xl transition-transform duration-200 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-amber-900/30 pb-4">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div className="min-w-0">
              <div className="text-xs font-semibold tracking-[0.22em] text-amber-200">పరసాట</div>
              <div className="text-base font-bold tracking-wide text-amber-50">VARASAATA</div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onMobileClose}
            className="rounded-full p-2 text-lg text-amber-100 hover:bg-amber-500/10"
          >
            ✕
          </button>
        </div>
        {renderNavContent(onMobileClose)}
      </div>
    </>
  );
}
