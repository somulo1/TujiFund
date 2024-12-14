import React from 'react';

// Define the type for a transaction
interface Transaction {
    id: number;
    date: string;
    amount: number;
    description: string;
}

// Define the props for the TransactionHistory component
interface TransactionHistoryProps {
    transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{transaction.date}</td>
                            <td className="border px-4 py-2">${transaction.amount.toFixed(2)}</td>
                            <td className="border px-4 py-2">{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
