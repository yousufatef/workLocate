import { RoomsContainer } from '@/components/rooms/rooms-container';
import { RoomsLoading } from '@/components/rooms/rooms-loading';
import { Suspense } from 'react';

type Props = {
    params: {
        workspaceId: string;
    };
};

const WorkspaceRoomsPage = ({ params }: Props) => {
    const { workspaceId } = params;

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<RoomsLoading />}>
                <RoomsContainer workspaceId={workspaceId} />
            </Suspense>
        </div>
    );
};

export default WorkspaceRoomsPage;
