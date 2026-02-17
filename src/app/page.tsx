import Link from "next/link";

type Props = {
  searchParams: Promise<{
    welcome: boolean;
  }>;
};

const page = async (props: Props) => {
  const { welcome } = await props.searchParams;

  console.log(welcome);

  return (
    <div>
      <Link href="/welcome">welcome</Link>
    </div>
  );
};

export default page;
