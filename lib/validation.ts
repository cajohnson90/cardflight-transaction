import { ParsedTransaction } from "@/types/types";

/** 
 * Validates a transaction string to ensure it follows the tag-length-value format. 
 * Each tag is followed by a specific length and associated value, and each tag's 
 * value type is validated (e.g., Tag 1 should be a string, Tag 2 should be a number).
 * 
 * @param transaction 
 * @returns boolean
 */
export function validateTransactionString(transaction: string): ParsedTransaction | null {
    let index = 0;
    const parsedTransaction: ParsedTransaction = {
        version: "1.0",
        transaction_id: generateUUID(),
        amount: "",
        network: "",
        transaction_descriptor: "",
        merchant: "",
        raw_message: transaction
    };

    while (index < transaction.length) {
        // Extract the tag (1 digit)
        const tag = transaction[index++];
        
        // Extract the length (2 digits)
        const length = parseInt(transaction.substring(index, index + 2), 10);
        if (isNaN(length) || length <= 0) {
            return null; // Invalid length
        }
        index += 2;
        
        // Extract the value (based on the length)
        const value = transaction.substring(index, index + length);
        if (value.length !== length) {
            return null; // Invalid value length
        }
        index += length;

        // Validate and process the tag values
        switch (tag) {
            case '1': // Network (should be a string)
                if (!/^[A-Za-z]+$/.test(value)) {
                    return null; // Invalid network format
                }
                parsedTransaction.network = value;
                break;
            case '2': // Amount (should be a number)
                if (isNaN(parseFloat(value))) {
                    return null; // Invalid amount
                }
                parsedTransaction.amount = value;
                break;
            case '3': // Merchant (should be a string or 10-character substring)
                parsedTransaction.merchant = value.length > 11
                    ? value.substring(0, 10) // truncate to 10 if longer
                    : value;
                break;
            default:
                return null; // Invalid tag
        }
    }

    // Generate the transaction descriptor based on network and amount
    parsedTransaction.transaction_descriptor = parsedTransaction.network.includes('VISA') 
        ? (parseInt(parsedTransaction.amount) * 100).toString().padStart(8, '0') 
        : `${parsedTransaction.network.substring(0, 2)}FFFF`;

    // Return the parsed transaction object if everything is valid
    return parsedTransaction;
}

/**
 * Generate a unique identifier using random values.
 * 
 * @returns string
 */
function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (singleChar) => {
      const randomNum = Math.floor(Math.random() * 16); 
      return (singleChar === 'x' ? randomNum: (randomNum & 0x3 | 0x8)).toString(16); 
    });
  }