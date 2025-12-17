import z from "zod";

export const CommunityScheme = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Location is required"),
  sports: z.string().min(1, "Sports is required"),
  description: z.string(),
  image: z.file().optional(),
});
