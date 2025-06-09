"use client"

import { useSearchParams } from "next/navigation"
import React from "react"
import Heading from "@/components/common/Heading"
import InfiniteScroll from "react-infinite-scroll-component"
import { IWorkspace } from "@/types/workspace"
import useWorkspace from "@/hooks/useWorkspaces"
import Spinner from "@/components/common/Spinner"
import WorkspaceCard from "./WorkspaceCard"
import LoadingSpinner from "@/components/common/Spinner"

const WorkingList = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  const {
    workspaces,
    error,
    hasMore,
    loadMore,
  } = useWorkspace(query)

  if (!workspaces) {
    return <Spinner />
  }

  console.log("Workspaces:", workspaces)
  return (
    <div className="container mt-[60px] relative">

      <Heading>Featured Spaces</Heading>

      {error && <p className="text-red-500">Your Search not found</p>}

      <InfiniteScroll
        dataLength={workspaces.length}
        next={loadMore}
        hasMore={hasMore ?? false}
        loader={<LoadingSpinner />}
        scrollThreshold={0.8}
        style={{ overflow: 'hidden' }}
        endMessage={
          <div className="text-center py-8">
            <p className="text-gray-500">{"You've reached the end of the list!"}</p>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 my-8">
          {workspaces.map((item: IWorkspace) => (
            <WorkspaceCard key={item._id} workspace={item} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default WorkingList