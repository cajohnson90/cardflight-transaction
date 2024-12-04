// Represents the structured data of a successfully processed transaction.
export type ParsedTransaction = {
    version: string,
    transaction_id: string,
    amount: string,
    network: string,
    transaction_descriptor: string,
    merchant: string,
    raw_message: string
};

// Represents the initial state of the transaction formatting process.
export type TransactionFormatterState = {
    error?: null | string;
    message?: null | string;
    processedTransaction?: null | ParsedTransaction;
};