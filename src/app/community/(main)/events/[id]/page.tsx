import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

const page = async (props: Props) => {
  redirect(`/community/events/${props.params.id}/matches`);
};

export default page;
