import Modal from "@/components/commons/state-modal";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: {
    welcome: boolean;
  };
};

const page = async (props: Props) => {
  const { welcome } = props.searchParams;

  return (
    <div>
      <Link href="/welcome">welcome</Link>
    </div>
  );
};

export default page;
