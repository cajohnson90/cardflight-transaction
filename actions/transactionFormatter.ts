"use server";

import { ParsedTransaction }from "@/types/parsedTransaction";

type TransactionFormatterReturn = 
  | { error: string } // If there's an error (invalid transaction number)
  | { message: string; processedTransaction: ParsedTransaction }; // If successful, includes the processed transaction

/**
 * Formats and processes a transaction string by validating it 
 * and converting it into a parsed transaction object. If the 
 * transaction number is invalid, it returns an error message.
 * 
 * @param previousState any
 * @param formData FormData
 * @returns Promise<TransactionFormatterReturn>
 */
export async function transactionFormatter(previousState: any, formData: FormData): Promise<TransactionFormatterReturn> {
    const transactionNumber = String(formData.get('transactionNumber')).trim();
    if (!validateTransactionString(transactionNumber)) {
        return {
            error: "Invalid translation number"
        }
    }

    const data = processTransaction(transactionNumber);
    return { message: 'Success', processedTransaction: data };
}

/**
 * Converts a valid transaction string into a structured ParsedTransaction object.
 * It extracts values based on the tag-length-value pattern and processes the 
 * transaction data accordingly.
 * 
 * @param transaction string
 * @returns ParsedTransaction
 */
function processTransaction(transaction: string): ParsedTransaction {
    const d = new Date();
    const parsedTransaction: ParsedTransaction = {
        version: "1.0",
        transaction_id: `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()+1}-${d.getHours()}${d.getMinutes()}${d.getSeconds()}-${d.getMilliseconds()}`,
        amount: "",
        network: "",
        transaction_descriptor: "",
        merchant: "",
        raw_message: transaction
    }

    while (transaction !== "") {
        const tag: number = parseInt(transaction.charAt(0))
        let characterLength = parseInt(transaction.substring(1, 3))
        if (tag == 3 && characterLength > 11) {
            characterLength = 10;
        }

        const value: string = transaction.substring(3, (3 + characterLength));

        switch (tag) {
            case 1:
                parsedTransaction.network = value;
                break;
            case 2:
                parsedTransaction.amount = value;
                break;
            case 3:
                parsedTransaction.merchant = value;
        }

        transaction = transaction.slice(3 + value.length)
    }

    parsedTransaction.transaction_descriptor = parsedTransaction.network.includes('VISA') 
        ? (parseInt(parsedTransaction.amount) * 1000).toString().padStart(8, '0') 
        : `${parsedTransaction.network.substring(0, 2)}FFFF`
    
    return parsedTransaction;
}

/**
 * Validates a transaction string to ensure it follows the tag-length-value format. 
 * Each tag is followed by a specific length and associated value, and each tag's 
 * value type is validated (e.g., Tag 1 should be a string, Tag 2 should be a number).
 * 
 * @param str 
 * @returns boolean
 */
function validateTransactionString(transaction: string): boolean {
    let index = 0;
  
    while (index < transaction.length) {
      // Extract the tag (1 digit)
      const tag = transaction[index++];
      
      // Extract the length (2 digits)
      const length = parseInt(transaction.substr(index, 2), 10);
      if (isNaN(length)) {
        return false; // Invalid length
      }
      index += 2;
  
      // Extract the value (based on the length)
      const value = transaction.substr(index, length);
      if (value.length !== length) {
        return false; // Invalid value length
      }
      index += length;
  
      // Validate specific tags
      if (tag === '1' && !/^[A-Za-z]+$/.test(value)) {
        return false; // Tag 1 should be a string
      }
      if (tag === '2' && isNaN(parseFloat(value))) {
        return false; // Tag 2 should be a number
      }
    }
  
    return true; // All checks passed
  }
  
