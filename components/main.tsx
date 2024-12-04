import SectionHeading from "./section-heading";

export default function Main() {
  return (
    <div className="items-center justify-center w-[36rem]">
      <SectionHeading>Transaction</SectionHeading>
      <p className="text-gray-500 dark:text-white/80">
        Insert a transaction number and receive a parsed object with the
        following values:
        <span className="font-bold">version</span>,{" "}
        <span className="font-bold">transaction_id</span>,{" "}
        <span className="font-bold">amount</span>,{" "}
        <span className="font-bold">network</span>,{" "}
        <span className="font-bold">transaction_descriptor</span>,{" "}
        <span className="font-bold">merchant</span>, and{" "}
        <span className="font-bold">raw_message</span>.
      </p>
    </div>
  );
}
