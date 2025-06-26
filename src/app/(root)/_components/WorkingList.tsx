"use client";

import Heading from "@/components/common/Heading";
import InfiniteScroll from "react-infinite-scroll-component";
import { IWorkspace } from "@/types/workspace";
import useWorkspace from "@/hooks/useWorkspaces";
import Spinner from "@/components/common/Spinner";
import WorkspaceCard from "./WorkspaceCard";
import LoadingSpinner from "@/components/common/Spinner";
import WorkspaceCardSkeleton from "./WorkspaceCardSkeleton";
import { SearchBar } from "@/components/common/SearchBar";
import { useSearchParams } from "next/navigation";

const WorkingList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    workspaces,
    error,
    hasMore,
    loading,
    loadMore,
  } = useWorkspace(query); 

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
      <Heading>Explore Workspaces</Heading>
      <SearchBar />

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
