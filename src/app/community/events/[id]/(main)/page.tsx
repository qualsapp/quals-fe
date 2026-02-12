import { getEvent } from "@/actions/event";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  redirect(`/community/events/${id}/matches?page=1&page_size=10`);
};

export default page;
