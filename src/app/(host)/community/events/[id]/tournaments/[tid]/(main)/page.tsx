import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string; tid: string }>;
};

const page = async ({ params }: Props) => {
  const { id, tid } = await params;

  redirect(`/community/events/${id}/tournaments/${tid}/matches`);
};

export default page;
