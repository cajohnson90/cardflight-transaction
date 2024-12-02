import React from "react";
import SectionHeading from "./section-heading";
import { ParsedTransaction } from "@/types/parsedTransaction";

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
            <li>"version": "{transaction.version}"</li>
            <li>"transaction_id": "{transaction.transaction_id}"</li>
            <li>"amount": "{transaction.amount}"</li>
            <li>"network": "{transaction.network}"</li>
            <li>
              "transaction_descriptor": "{transaction.transaction_descriptor}"
            </li>
            <li>"merchant": "{transaction.merchant}"</li>
            <li>"raw_message": "{transaction.raw_message}"</li>
          </ul>
        </code>
      </div>
    </div>
  );
}
