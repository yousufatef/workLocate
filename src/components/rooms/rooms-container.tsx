"use client"

import { Room } from "@/types/rooms"
import { useState, useEffect } from "react"
import { RoomsHeader } from "./rooms-header"
import { RoomsError } from "./rooms-error"
import { RoomsFilters } from "./rooms-filters"
import { RoomsGrid } from "./rooms-grid"
import { RoomsEmpty } from "./rooms-empty"


interface RoomsContainerProps {
  id: string
}

export function RoomsContainer({ id }: RoomsContainerProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  useEffect(() => {
    const fetchRooms = async () => {
      if (!id) {
        setError("Workspace ID is required")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`https://worklocate-315a35b40e37.herokuapp.com/api/room/${id}/all`)

        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Invalid workspace ID parameter")
          } else if (response.status === 404) {
            throw new Error("Workspace not found")
          } else {
            throw new Error(`Failed to fetch rooms: ${response.status}`)
          }
        }

        const data = await response.json()
        const roomsData = data.rooms || []

        setRooms(roomsData)
        setFilteredRooms(roomsData)
      } catch (error) {
        console.error("Error fetching rooms:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch rooms")
        setRooms([])
        setFilteredRooms([])
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [id])

  // Filter rooms based on search term and filters
  useEffect(() => {
    let filtered = rooms

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (room.workspaceId?.name && room.workspaceId.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          room.amenities.some((amenity: string) => amenity.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((room) => room.availabilityStatus === statusFilter)
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((room) => room.type === typeFilter)
    }

    setFilteredRooms(filtered)
  }, [rooms, searchTerm, statusFilter, typeFilter])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading rooms...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <RoomsError error={error} />
  }

  const uniqueTypes = Array.from(new Set(rooms.map((room) => room.type)))
  const availableCount = rooms.filter((room) => room.availabilityStatus === "available").length
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0)

  return (
    <>
      <RoomsHeader rooms={rooms} availableCount={availableCount} totalCapacity={totalCapacity} />

      {rooms.length > 0 && (
        <RoomsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          uniqueTypes={uniqueTypes}
          filteredCount={filteredRooms.length}
          totalCount={rooms.length}
        />
      )}

      {filteredRooms.length > 0 ? (
        <RoomsGrid rooms={filteredRooms} />
      ) : rooms.length === 0 ? (
        <RoomsEmpty type="no-rooms" />
      ) : (
        <RoomsEmpty type="no-results" />
      )}
    </>
  )
}
