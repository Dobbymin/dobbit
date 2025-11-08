import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src={"/logo.png"} alt='Logo' width={45} height={45} />
      Home
    </div>
  );
}
