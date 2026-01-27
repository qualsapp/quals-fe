import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  redirect(`/community/events/${id}/matches`);
};

export default page;
