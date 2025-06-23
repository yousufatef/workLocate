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
import { useRouter } from "next/navigation";
import LoadingSpinner from "../common/LoadingSpinner";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Room } from "@/types/rooms";
import { updateRoom } from "@/lib/actions/room.actions";

// --- Schema ---
const RoomFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  amenities: z
    .array(z.string().min(1, "Amenity cannot be empty"))
    .min(1, "You must select at least one amenity"),
  type: z.enum(["personal", "meeting", "shared"]),
  capacity: z
    .number({ invalid_type_error: "Capacity must be a number" })
    .int()
    .positive("Capacity must be greater than 0"),
  pricePerHour: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be a positive number"),
  availabilityStatus: z.enum(["available", "unavailable"]),
  isBooked: z.boolean(),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .int()
    .positive("Duration must be greater than 0"),
});

// --- Defaults ---
const defaultValues: z.infer<typeof RoomFormSchema> = {
  name: "",
  amenities: ["High-Speed Internet"],
  type: "meeting",
  capacity: 10,
  pricePerHour: 50,
  availabilityStatus: "available", // Only "available" or "unavailable" allowed
  isBooked: false,
  duration: 1,
};

// --- Props ---
interface RoomFormProp {
  type: "create" | "edit";
  room?: Room;
  roomId?: string;
}

// --- Component ---
const RoomForm = ({ type, room, roomId }: RoomFormProp) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof RoomFormSchema>>({
    resolver: zodResolver(RoomFormSchema),
    defaultValues:
      type === "edit" && room
        ? {
            name: room.name ?? "",
            amenities: room.amenities ?? [],
            type: room.type ?? "meeting",
            capacity: room.capacity ?? 1,
            pricePerHour: room.pricePerHour ?? 0,
            availabilityStatus:
              room.availabilityStatus === "available" || room.availabilityStatus === "unavailable"
                ? room.availabilityStatus
                : "available",
            isBooked: room.isBooked ?? false,
            duration: room.duration ?? 1,
          }
        : defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof RoomFormSchema>) => {
    try {
      if (type === "edit" && roomId) {
        const res = await updateRoom({ values, roomId });
        const updated = Array.isArray(res) ? res[0] : res;
        console.log("Updated room:", updated);
        form.reset();
        router.push(`/room/${roomId}`);
      } else {
        console.log("Created room:", values);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-6">
        {type === "create" ? "Create Room" : "Edit Room"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Room Name" {...field} />
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

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Room Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="shared">Shared</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Capacity */}
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Capacity"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Per Hour */}
          <FormField
            control={form.control}
            name="pricePerHour"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price per Hour"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Availability Status */}
          <FormField
            control={form.control}
            name="availabilityStatus"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Availability Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Is Booked */}
          <FormField
            control={form.control}
            name="isBooked"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label className="text-sm">Is Booked</label>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Duration (hours)"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
              `${type} room`
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RoomForm;
