import z from "zod";

export const ProfileScheme = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, periods, and underscores"
    )
    .regex(/^(?!.*\.$)/, "Username cannot end with a period"),
  display_name: z.string().min(3, "Name is required"),
  sports: z.array(z.string()).min(1, "At least one sport is required"),
  // locations: z.array(z.string()).min(1, "At least one sport is required"),
  // level: z.string().nonempty("Level is required"),
  bio: z.string().max(160, "Bio must be at most 160 characters"),
  file: z.file().optional(),
});

export const HostScheme = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, periods, and underscores"
    )
    .regex(/^(?!.*\.$)/, "Username cannot end with a period"),
  display_name: z.string().min(3, "Name is required"),
  bio: z.string().max(160, "Bio must be at most 160 characters"),
  file: z.file().optional(),
});
