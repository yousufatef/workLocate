"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../common/LoadingSpinner";
import { IWorkspace } from "@/types/workspace";
import {
    createWorkspace,
    updateWorkspace,
    // updateWorkspace,
} from "@/lib/actions/Workspace.actions";
import { useUser } from "@clerk/nextjs";

const WorkspaceFormSchema = z.object({
    name: z.string().min(3, "Name لازم 3 حروف على الأقل"),
    description: z.string().min(10, "Description قصير"),
    address: z.string().min(5, "Address قصير"),
    amenities: z
        .array(z.string().min(1))
        .min(1, "لازم تختار Amenity واحدة على الأقل"),
    roomCounter: z
        .number({ invalid_type_error: "Room counter لازم رقم" })
        .int()
        .positive("Room counter لازم أكبر من 0"),
});


const defaultValues = {
    name: "",
    description: "",
    address: "",
    amenities: ["High-Speed Internet"],
    roomCounter: 1,
};


interface WorkspaceFormProp {
    type: "create" | "edit";
    workspace?: IWorkspace;
    workspaceId?: string;
}

const WorkspaceForm = ({ type, workspace, workspaceId }: WorkspaceFormProp) => {
    const router = useRouter();

    type WorkspaceFormType = z.infer<typeof WorkspaceFormSchema>;
    const form = useForm<WorkspaceFormType>({
        resolver: zodResolver(WorkspaceFormSchema),
        defaultValues:
            workspace && type === "edit"
                ? {
                    name: workspace.name,
                    address: workspace.address,
                    description: workspace.description,
                    amenities: workspace.amenities || [],
                    roomCounter: workspace.roomCounter,
                    // imageUrl: "",
                }
                : defaultValues,
    });


    const { user } = useUser();
    console.log("user", user?.publicMetadata?.userMongoId);


    async function onSubmit(values: WorkspaceFormType) {
        const updatePayload = {
            name: values.name.trim(),
            address: values.address.trim(),
            description: values.description.trim(),
            amenities: values.amenities,          // مصفوفة Strings
            roomCounter: values.roomCounter,
        };
        const payload = {
            name: values.name.trim(),
            address: values.address.trim(),
            description: values.description.trim(),
            amenities: values.amenities,          // مصفوفة Strings
            roomCounter: values.roomCounter,
            clerkId: user?.id ?? "",
            adminId: (user?.publicMetadata.userMongoId as string) ?? "",
        };

        try {
            if (type === "edit" && workspaceId) {
                const res = await updateWorkspace(updatePayload, workspaceId);
                const updatedWorkspace = Array.isArray(res) ? res[0] : res;

                console.log("Updated Workspace:", updatedWorkspace);

                form.reset();
                router.push(`/workspace/${workspaceId}`);
            } if (type === "create") {
                const res = await createWorkspace(payload);
                const createdWorkspace = Array.isArray(res) ? res[0] : res;

                console.log("Created Workspace:", createdWorkspace);

                form.reset();
                router.push(`/workspace/${createdWorkspace?._id}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            <h2 className="text-2xl font-bold mb-6">
                {type === "create" ? "Create Workspace" : "Edit Workspace"}
            </h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Workspace Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description"
                                        {...field}
                                        className="h-32 resize-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* Amenities */}
                    <FormField
                        control={form.control}
                        name="amenities"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Amenities (comma separated)"
                                        value={field.value.join(", ")}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    .split(",")
                                                    .map((item) => item.trim())
                                                    .filter(Boolean)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Room Counter */}
                    <FormField
                        control={form.control}
                        name="roomCounter"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        placeholder="Room counter"
                                        value={field.value}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value === "" ? 0 : Number(e.target.value),
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full py-6 text-lg"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <LoadingSpinner /> Submitting...
                            </>
                        ) : (
                            `${type} workspace`
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default WorkspaceForm;






