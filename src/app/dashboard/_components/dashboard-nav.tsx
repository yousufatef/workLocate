
import { Users, Calendar, NotebookPen } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
interface DashboardNavProps {
    onNavigate: (view: "users" | "owners" | "workspaces" | "rooms" | "reservations") => void
    activeItem: string
}

export function DashboardNav({ onNavigate, activeItem }: DashboardNavProps) {

    return (
        <SidebarMenu className="p-6 flex flex-col gap-6">
            <SidebarMenuItem>
                <SidebarMenuButton isActive={activeItem === "users"} onClick={() => onNavigate("users")}>
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton isActive={activeItem === "owners"} onClick={() => onNavigate("owners")}>
                    <Users className="h-4 w-4" />
                    <span>Owners</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton isActive={activeItem === "workspaces"} onClick={() => onNavigate("workspaces")}>
                    <Calendar className="h-4 w-4" />
                    <span>Workspaces</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton isActive={activeItem === "rooms"} onClick={() => onNavigate("rooms")}>
                    <Calendar className="h-4 w-4" />
                    <span>Rooms</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton isActive={activeItem === "reservations"} onClick={() => onNavigate("reservations")}>
                    <NotebookPen className="h-4 w-4" />
                    <span>Reservations</span>
                </SidebarMenuButton>
            </SidebarMenuItem>

        </SidebarMenu>
    )
}
