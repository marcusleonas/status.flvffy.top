import Image from "next/image";

export default function Loading() {
  return (
    <section>
      <p>Loading...</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img width={498} height={486} src="/img/elgato.gif" alt="elgato" />
    </section>
  );
}
