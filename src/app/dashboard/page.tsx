"use client"

import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ModeToggle } from "@/components/layout/ModeToggle"
import { DashboardNav } from "./_components/dashboard-nav"
import { UsersView } from "./_components/users-view"
import { ReservationView } from "./_components/reservations-view"
import WorkspacesView from "./_components/workspace-view"
import { OwnerView } from "./_components/owners-view"
import RoomsView from "./_components/rooms-view"

const LottieHandler = dynamic(() => import("@/components/common/LottieHandler"), {
  ssr: false,
})

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeView, setActiveView] = useState<
    "users" | "owners" | "workspaces" | "rooms" | "reservations"
  >("users")

  const { isSignedIn, user, isLoaded } = useUser()

  // ✅ نمنع الريندر لحد ما يتأكد إنه mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isLoaded) {
    return null // ممكن تحط Spinner هنا لو حبيت
  }

  if (isSignedIn && user.publicMetadata.role === "admin") {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border">
              <div className="flex h-16 items-center px-3 justify-between">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <ModeToggle />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav onNavigate={setActiveView} activeItem={activeView} />
            </SidebarContent>
            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <div className="flex flex-col w-full">
              <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                <SidebarTrigger />
              </header>
              <main className="flex-1 px-6">
                {activeView === "users" && <UsersView />}
                {activeView === "owners" && <OwnerView />}
                {activeView === "workspaces" && <WorkspacesView />}
                {activeView === "rooms" && <RoomsView />}
                {activeView === "reservations" && <ReservationView />}
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center mt-32">
        <LottieHandler type="notFound" />
        <Link href="/" replace className="underline">
          How about going back to safety?
        </Link>
      </div>
    </div>
  )
}
