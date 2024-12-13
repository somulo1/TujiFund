import React from 'react';

const contributions = [
  { date: '2024-12-01', amount: 100, status: 'Completed' },
  { date: '2024-12-05', amount: 200, status: 'Pending' },
  { date: '2024-12-10', amount: 150, status: 'Completed' },
  { date: '2024-12-15', amount: 250, status: 'Completed' },
  { date: '2024-12-20', amount: 300, status: 'Pending' },
];

const ContributionList: React.FC = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '20px auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
    header: {
      textAlign: 'center' as const,
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#007BFF',
      color: '#fff',
      textAlign: 'left' as const,
      padding: '12px',
      fontSize: '1rem',
    },
    tableRow: {
      backgroundColor: '#fff',
      borderBottom: '1px solid #ddd',
    },
    tableRowHover: {
      backgroundColor: '#f1f1f1',
    },
    tableCell: {
      padding: '10px 15px',
      textAlign: 'left' as const,
      fontSize: '0.9rem',
    },
    completed: {
      color: 'green',
      fontWeight: 'bold',
    },
    pending: {
      color: 'orange',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Contributions</h1>
      <div className="flex space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => alert('Viewing full report...')}>View Full Report</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => alert('Downloading statement...')}>Download Statement</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Amount</th>
            <th style={styles.tableHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution, index) => (
            <tr
              key={index}
              style={
                index % 2 === 0 ? styles.tableRow : { ...styles.tableRow, ...styles.tableRowHover }
              }
            >
              <td style={styles.tableCell}>{contribution.date}</td>
              <td style={styles.tableCell}>${contribution.amount}</td>
              <td style={styles.tableCell}>
                <span
                  style={
                    contribution.status === 'Completed' ? styles.completed : styles.pending
                  }
                >
                  {contribution.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContributionList;
