"use client";

import React, { useState } from "react";
import Heading from "@/components/common/Heading";
import InfiniteScroll from "react-infinite-scroll-component";
import { IWorkspace } from "@/types/workspace";
import useWorkspace from "@/hooks/useWorkspaces";
import Spinner from "@/components/common/Spinner";
import WorkspaceCard from "./WorkspaceCard";
import LoadingSpinner from "@/components/common/Spinner";
import WorkspaceCardSkeleton from "./WorkspaceCardSkeleton";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";

const WorkingList = () => {
  const [search, setSearch] = useState("");
  const [query] = useDebounce(search, 500); // ← تأخير البحث

  const {
    workspaces,
    error,
    hasMore,
    loading,
    loadMore,
  } = useWorkspace(query); // ← الفلترة تتم هنا

  if (error) {
    return (
      <p className="text-red-500 text-center py-8">
        Error loading workspaces
      </p>
    );
  }

  if (!workspaces && loading) {
    return <Spinner />;
  }

  if (workspaces.length === 0 && !error && !loading) {
    return <WorkspaceCardSkeleton />;
  }

  return (
    <div className="container mt-[60px] relative">
      {/* 🔍 Search Input */}
      <div className="w-full max-w-[700px] mx-auto mb-6 px-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by workspace name..."
          className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-[#134B70] focus-visible:outline-none"
        />
      </div>

      <Heading>Explore Workspaces</Heading>

      <InfiniteScroll
        dataLength={workspaces.length}
        next={loadMore}
        hasMore={hasMore ?? false}
        loader={<LoadingSpinner />}
        scrollThreshold={0.8}
        style={{ overflow: "hidden" }}
        endMessage={
          <div className="text-center py-8">
            <p className="text-gray-500">
              {"You've reached the end of the list!"}
            </p>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2">
          {workspaces.map((item: IWorkspace) => (
            <WorkspaceCard key={item._id} workspace={item} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default WorkingList;
