import React, { useState, useEffect, useMemo } from 'react';

// Define a type for a transaction
interface Transaction {
  id: string;
  date: string; // ISO date string, e.g., 'YYYY-MM-DD'
  total: number;
  contact: string;
}

// Mock data for transactions
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'T001', date: '2023-01-15', total: 120.50, contact: 'Alice Smith' },
  { id: 'T002', date: '2023-01-20', total: 50.00, contact: 'Bob Johnson' },
  { id: 'T003', date: '2023-02-01', total: 200.75, contact: 'Alice Smith' },
  { id: 'T004', date: '2023-02-10', total: 35.20, contact: 'Charlie Brown' },
  { id: 'T005', date: '2023-03-05', total: 150.00, contact: 'David Lee' },
  { id: 'T006', date: '2023-03-12', total: 75.10, contact: 'Bob Johnson' },
  { id: 'T007', date: '2023-04-01', total: 99.99, contact: 'Alice Smith' },
  { id: 'T008', date: '2023-04-20', total: 450.00, contact: 'Eve White' },
  { id: 'T009', date: '2023-05-01', total: 10.00, contact: 'Frank Black' },
  { id: 'T010', date: '2023-05-15', total: 600.00, contact: 'Alice Smith' },
  { id: 'T011', date: '2024-01-05', total: 250.00, contact: 'Grace Hopper' },
  { id: 'T012', date: '2024-01-25', total: 88.88, contact: 'Alice Smith' },
  { id: 'T013', date: '2024-02-14', total: 300.00, contact: 'Bob Johnson' },
  { id: 'T014', date: '2024-03-01', total: 12.34, contact: 'Charlie Brown' },
];

const TransactionScreen: React.FC = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Memoize filtered transactions to avoid unnecessary re-calculations on every render
  const filteredTransactions = useMemo(() => {
    let result = allTransactions;

    // Apply date range filter
    if (startDate) {
      const startDateTime = new Date(startDate + 'T00:00:00'); // Ensure comparison from start of day
      result = result.filter(transaction => new Date(transaction.date + 'T00:00:00') >= startDateTime);
    }
    if (endDate) {
      const endDateTime = new Date(endDate + 'T23:59:59'); // Ensure comparison to end of day
      result = result.filter(transaction => new Date(transaction.date + 'T00:00:00') <= endDateTime);
    }

    // Apply search term filter (case-insensitive)
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        transaction =>
          transaction.id.toLowerCase().includes(lowerCaseSearchTerm) ||
          transaction.contact.toLowerCase().includes(lowerCaseSearchTerm) ||
          transaction.date.toLowerCase().includes(lowerCaseSearchTerm) ||
          transaction.total.toString().includes(lowerCaseSearchTerm) // Convert total to string for search
      );
    }

    // Sort by date descending (most recent first)
    // Note: It's important to sort a copy if `allTransactions` itself should not be mutated.
    // `filter` creates a new array, so `result` is already a copy.
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
  }, [allTransactions, startDate, endDate, searchTerm]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Transactions / Sales History</h1>

      <div style={{
        marginBottom: '20px', 
        border: '1px solid #e0e0e0', 
        padding: '15px', 
        borderRadius: '8px', 
        background: '#fcfcfc',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ marginTop: '0', color: '#333' }}>Filters</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label htmlFor="startDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9em' }}>Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }}
            />
          </div>
          <div>
            <label htmlFor="endDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9em' }}>End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }}
            />
          </div>
          <div style={{ flexGrow: 1, minWidth: '200px' }}>
            <label htmlFor="search" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9em' }}>Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Search by ID, Contact, Total..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '30px', marginBottom: '15px', color: '#333' }}>Transaction List</h2>
      {filteredTransactions.length === 0 ? (
        <p style={{ color: '#555' }}>No transactions found matching your criteria.</p>
      ) : (
        <div style={{ overflowX: 'auto', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#007bff', color: 'white' }}>
                <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', textAlign: 'right' }}>Total</th>
                <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} style={{ borderBottom: '1px solid #eee', background: filteredTransactions.indexOf(transaction) % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                  <td style={{ padding: '10px 15px', border: 'none' }}>{transaction.id}</td>
                  <td style={{ padding: '10px 15px', border: 'none' }}>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 15px', border: 'none', textAlign: 'right' }}>${transaction.total.toFixed(2)}</td>
                  <td style={{ padding: '10px 15px', border: 'none' }}>{transaction.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionScreen;
