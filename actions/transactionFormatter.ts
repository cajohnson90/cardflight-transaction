"use server";

import { TransactionFormatterState }from "@/types/types";
import { validateTransactionString } from "@/lib/validation";

/**
 * Formats and processes a transaction string by validating it 
 * and converting it into a parsed transaction object. If the 
 * transaction number is invalid, it returns an error message.
 * 
 * @param previousState TransactionFormatterState
 * @param formData FormData
 * @returns Promise<TransactionFormatterReturn>
 */
export async function transactionFormatter(previousState: TransactionFormatterState, formData: FormData): Promise<TransactionFormatterState> {
    const transactionNumber = String(formData.get('transactionNumber')).trim();
    const parsedTransaction = validateTransactionString(transactionNumber)
    if (!parsedTransaction) {
      return {
        processedTransaction: null,
        error: "Invalid transaction number",
        message: null,
      };
    }

    return {
      processedTransaction: parsedTransaction,
      error: null,
      message: "Transaction successfully processed",
    };
}
