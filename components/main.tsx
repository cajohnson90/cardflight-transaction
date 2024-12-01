import SectionHeading from "./section-heading";
import Form from "./form";

export default function Main() {
  return (
    <div>
      <SectionHeading>Transaction</SectionHeading>
      <p className="text-gray-500 -mt-6 dark:text-white/80">
        Insert a transaction number and receive a parsed object with the
        following values: <span className="font-bold">version</span>
        {", "}
        <span className="font-bold">transaction_id</span>
        {", "}
        <span className="font-bold">amount</span>
        {", "}
        <span className="font-bold">network</span>
        {", "}
        <span className="font-bold">transaction_descriptor</span>
        {", "}
        <span className="font-bold">merchant</span>
        {", and "}
        <span className="font-bold">raw_message</span>.
      </p>
      <Form />
    </div>
  );
}
