import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (transactionIncome, transaction) => {
        if (transaction.type === 'income') {
          return transactionIncome + transaction.value;
        }

        return transactionIncome;
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (transactionOutcome, transaction) => {
        if (transaction.type === 'outcome') {
          return transactionOutcome + transaction.value;
        }

        return transactionOutcome;
      },
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
