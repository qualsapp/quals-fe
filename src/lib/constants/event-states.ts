export const eventLineupStates: Record<"live" | "next" | "completed", string> =
  {
    live: "border-destructive",
    next: "border-secondary",
    completed: "border-gray-400",
  };

export const eventBadgeVariants: Record<"live" | "next" | "completed", string> =
  {
    live: "destructive",
    next: "secondary",
    completed: "gray",
  };
