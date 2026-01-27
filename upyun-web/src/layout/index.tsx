import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 overflow-auto p-4">
        {/* <SidebarTrigger /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
