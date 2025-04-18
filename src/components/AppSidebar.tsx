
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, HardDrive, Users, ShoppingBag, Package, LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

type SidebarItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const AppSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  
  const mainNavItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Components', href: '/components', icon: Cpu },
    { name: 'Categories', href: '/categories', icon: Package },
    { name: 'Merchants', href: '/merchants', icon: ShoppingBag },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Configurations', href: '/configurations', icon: HardDrive },
  ];

  return (
    <div className="min-h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="h-6 w-6 text-primary" />
          <span>PC Configurator</span>
        </h1>
        <p className="text-xs text-sidebar-foreground/70 mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full flex items-center justify-start gap-2 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default AppSidebar;
