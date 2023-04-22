export class IHelpStatisticsResource{
    abortedTransactionsCount?: number;
    abortedTransactionsCountCompare?: number;
    canceledTransactionCount?: number;
    canceledTransactionCountCompare?: number;
    doneTransactionsCount?: number;
    doneTransactionsCountCompare?: number;
    endDate?: Date;
    requests?: IStatisticsRequest[]; 
    startDate?: Date;
    transactionsCount?: number;
    transactionsCountCompare?: number;
}

export class IStatisticsRequest{
    date?: string;
    requestsCount?: number;
}