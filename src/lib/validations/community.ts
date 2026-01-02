import z from "zod";

export const CommunityScheme = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Location is required"),
  sports: z.array(z.string()).min(1, "At least one sport is required"),
  description: z.string(),
  file: z.file().optional(),
});
