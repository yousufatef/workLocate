import { RoomsContainer } from '@/components/rooms/rooms-container';
import { RoomsLoading } from '@/components/rooms/rooms-loading';
import { Suspense } from 'react';

const WorkspaceRoomsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<RoomsLoading />}>
        <RoomsContainer id={id} />
      </Suspense>
    </div>
  );
};

export default WorkspaceRoomsPage;
