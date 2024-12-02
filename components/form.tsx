"use client";

import { useActionState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import ProcessedTransaction from "./processedTransaction";

export default function Form({
  actionName,
  defaultState = { processedTransaction: null, error: null },
}) {
  const [state, formAction, isPending] = useActionState(
    actionName,
    defaultState
  );

  // Trigger success toast after processedTransaction is available
  useEffect(() => {
    if (state?.processedTransaction) {
      toast.success("Transaction processed successfully!");
    }
  }, [state?.processedTransaction]); // Runs when processedTransaction changes

  // Trigger error toast if there is an error in the state
  useEffect(() => {
    if (state?.error) {
      toast.error(`Error: ${state.error}`); // Show error message from the state
    }
  }, [state?.error]); // Runs when error state changes

  return (
    <div>
      <form
        className="mt-6 flex flex-col dark:text-black w-[28rem]"
        action={formAction}
      >
        <input
          type="text"
          name="transactionNumber"
          className="h-14 px-4 mb-4 rounded-lg borderBlack transition-all"
          placeholder="Transaction Number"
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
        <ProcessedTransaction transaction={state?.processedTransaction} />
      )}
    </div>
  );
}
