"use client";

import { useActionState, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import { transactionFormatter } from "@/actions/transactionFormatter";
import ProcessedTransaction from "./processedTransaction";

export default function Form() {
  const [state, formAction, isPending] = useActionState(transactionFormatter, {
    parsedTransaction: null,
    error: null,
  });

  return (
    <div>
      <form className="mt-10 flex flex-col dark:text-black" action={formAction}>
        <input
          type="text"
          name="transactionNumber"
          className="h-14 px-4 mb-4 rounded-lg border-black dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          placeholder="Transaction Id Number"
          maxLength={500}
          required
        />
        <button
          type="submit"
          className="group flex gap-2 items-center h-[3rem] w-[8rem] bg-gray-800 text-white rounded-full justify-center outline-none transition focus:scale-110 hover:scale-110 active:scale-105 hover:bg-gray-950 disabled:scale-100 disabled:bg-opacity-60"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Submit"}
          <FaPaperPlane className="text-xs opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
        {isPending && <p className="sr-only">Loading...</p>}
      </form>
      {state?.processedTransaction && (
        <ProcessedTransaction formData={state?.processedTransaction} />
      )}
    </div>
  );
}
