
import { Users, Calendar, NotebookPen } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
interface DashboardNavProps {
    onNavigate: (view: "users" | "workspaces" | "reservations") => void
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
                <SidebarMenuButton isActive={activeItem === "workspaces"} onClick={() => onNavigate("workspaces")}>
                    <Calendar className="h-4 w-4" />
                    <span>Workspaces</span>
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
