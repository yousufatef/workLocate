import { Toaster } from "sonner";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
            <Toaster />
        </div>
    );
}
export default layout;