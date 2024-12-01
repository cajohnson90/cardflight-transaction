import React from "react";
import SectionHeading from "./section-heading";
import { ParsedTransaction } from "@/types/parsedTransaction";

export default function ProcessedTransaction({
  formData,
}: {
  formData: ParsedTransaction;
}) {
  return (
    <div>
      <SectionHeading>Processed Transaction</SectionHeading>
      <p className="text-gray-500 -mt-6 dark:text-white/80">
        Here is the processed transaction number
      </p>
      <div className="bg-white/80 text-black p-2  rounded-md borderBlack">
        <code>
          <ul>
            <li>"version": "{formData.version}"</li>
            <li>"transaction_id": "{formData.transaction_id}"</li>
            <li>"amount": "{formData.amount}"</li>
            <li>"network": "{formData.network}"</li>
            <li>
              "transaction_descriptor": "{formData.transaction_descriptor}"
            </li>
            <li>"merchant": "{formData.merchant}"</li>
            <li>"raw_message": "{formData.raw_message}"</li>
          </ul>
        </code>
      </div>
    </div>
  );
}
