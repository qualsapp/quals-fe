import { redirect } from "next/navigation";

const page = async () => {
  redirect(`/dashboard/events`);
};

export default page;
