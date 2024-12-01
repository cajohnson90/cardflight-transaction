export type ParsedTransaction = {
    version: string,
    transaction_id: string,
    amount: string,
    network: string,
    transaction_descriptor: string,
    merchant: string,
    raw_message: string
}