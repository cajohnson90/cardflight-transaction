import React from "react";
import SectionHeading from "./section-heading";
import { ParsedTransaction } from "@/types/types";

export default function ProcessedTransaction({
  transaction,
}: {
  transaction: ParsedTransaction;
}) {
  return (
    <div className="mt-6">
      <SectionHeading>Processed Transaction</SectionHeading>
      <div className="p-2 bg-white/80 text-black rounded-md borderBlack">
        <code>
          <ul>
            <li>&quot;version&quot;: &quot;{transaction.version}&quot;</li>
            <li>
              &quot;transaction_id&quot;: &quot;{transaction.transaction_id}
              &quot;
            </li>
            <li>&quot;amount&quot;: &quot;{transaction.amount}&quot;</li>
            <li>&quot;network&quot;: &quot;{transaction.network}&quot;</li>
            <li>
              &quot;transaction_descriptor&quot;: &quot;
              {transaction.transaction_descriptor}&quot;
            </li>
            <li>&quot;merchant&quot;: &quot;{transaction.merchant}&quot;</li>
            <li>
              &quot;raw_message&quot;: &quot;{transaction.raw_message}&quot;
            </li>
          </ul>
        </code>
      </div>
    </div>
  );
}
