"use server";

import { ParsedTransaction } from "@/types/parsedTransaction";

/**
 * Format a transaction string into an object.
 * 
 * @param transaction: any
 * @param formData: FormData
 * 
 * @returns FormData
 */
export async function transactionFormatter(previousState: any, formData: FormData) {
    const transactionNumber = String(formData.get('transactionNumber')).trim();
    if (!validateString(transactionNumber)) {
        return {
            error: "Invalid translation number",
            processedTransaction: undefined,
        }
    }

    const data = processTransaction(transactionNumber)
    return { message: 'Success', processedTransaction: data };
}

/**
 * Convert a transaction string into an object.
 * 
 * @param transaction: string
 * @returns ParsedTransaction
 */
function processTransaction(transaction: string): ParsedTransaction {
    const d = new Date();
    const parsedTransaction: ParsedTransaction = {
        version: "1.0",
        transaction_id: `${d.getFullYear()}${d.getMonth()}${d.getDay()}-${d.getSeconds()}${d.getMinutes()}${d.getHours()}-${d.getMilliseconds()}`,
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


function validateString(value: unknown) {
    return (value || typeof value == "string") 
}
