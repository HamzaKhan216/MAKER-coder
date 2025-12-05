import React, { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  balance: number; // Positive for money customer owes us, negative for money we owe customer
}

const KhataScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 'c1', name: 'John Doe', balance: 500.00 },
    { id: 'c2', name: 'Jane Smith', balance: -200.50 }, // Jane Smith we owe money to
    { id: 'c3', name: 'Alice Johnson', balance: 1200.75 },
  ]);

  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');

  const [showRecordTransactionModal, setShowRecordTransactionModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'credit' | 'debit'>('debit'); // 'debit' means customer bought (owes more), 'credit' means customer paid (owes less)
  const [transactionDescription, setTransactionDescription] = useState('');

  const handleAddContact = () => {
    if (newContactName.trim()) {
      const newContact: Contact = {
        id: `c${Date.now()}`, // Simple unique ID using timestamp
        name: newContactName.trim(),
        balance: 0,
      };
      setContacts((prev) => [...prev, newContact]);
      setNewContactName('');
      setShowAddContactModal(false);
    }
  };

  const handleRecordTransaction = () => {
    if (selectedContact && transactionAmount && !isNaN(parseFloat(transactionAmount))) {
      const amount = parseFloat(transactionAmount);
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === selectedContact.id) {
          let newBalance = contact.balance;
          if (transactionType === 'debit') { // Customer bought from us or we lent them money
            newBalance += amount;
          } else { // Customer paid us or we received money from them
            newBalance -= amount;
          }
          return { ...contact, balance: newBalance };
        }
        return contact;
      });
      setContacts(updatedContacts);

      // Reset transaction form
      setSelectedContact(null);
      setTransactionAmount('');
      setTransactionType('debit');
      setTransactionDescription('');
      setShowRecordTransactionModal(false);
    }
  };

  const openRecordTransactionForContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowRecordTransactionModal(true);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Khata - Customer Credit Manager</h1>

      <button
        onClick={() => setShowAddContactModal(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745', /* Green */
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '1em',
        }}
      >
        + Add New Contact
      </button>

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', padding: '10px', backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
          <div style={{ flex: 2 }}>Contact Name</div>
          <div style={{ flex: 1, textAlign: 'right' }}>Balance</div>
          <div style={{ flex: 1, textAlign: 'center' }}>Actions</div>
        </div>
        {contacts.length === 0 ? (
          <p style={{ padding: '15px', textAlign: 'center', color: '#666' }}>No contacts yet. Add one!</p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              style={{
                display: 'flex',
                padding: '10px',
                borderBottom: '1px solid #eee',
                backgroundColor: '#fff',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 2 }}>{contact.name}</div>
              <div
                style={{
                  flex: 1,
                  textAlign: 'right',
                  color: contact.balance > 0 ? '#dc3545' /* Red */ : contact.balance < 0 ? '#28a745' /* Green */ : '#6c757d' /* Gray */,
                  fontWeight: 'bold',
                }}
              >
                ₹ {contact.balance.toFixed(2)}
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <button
                  onClick={() => openRecordTransactionForContact(contact)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#007bff', /* Blue */
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '0.8em',
                  }}
                >
                  Record Txn
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddContactModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white', padding: '30px', borderRadius: '8px',
            width: '90%', maxWidth: '400px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Add New Contact</h2>
            <input
              type="text"
              placeholder="Contact Name"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              style={{
                width: '100%', padding: '10px', marginBottom: '15px',
                border: '1px solid #ddd', borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowAddContactModal(false)}
                style={{
                  padding: '8px 15px', backgroundColor: '#6c757d', color: 'white',
                  border: 'none', borderRadius: '4px', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                style={{
                  padding: '8px 15px', backgroundColor: '#28a745', color: 'white',
                  border: 'none', borderRadius: '4px', cursor: 'pointer',
                }}
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Transaction Modal */}
      {showRecordTransactionModal && selectedContact && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white', padding: '30px', borderRadius: '8px',
            width: '90%', maxWidth: '400px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Record Transaction for {selectedContact.name}</h2>
            <p style={{marginBottom: '15px'}}>Current Balance: <span style={{ fontWeight: 'bold', color: selectedContact.balance > 0 ? '#dc3545' : selectedContact.balance < 0 ? '#28a745' : '#6c757d' }}>
              ₹ {selectedContact.balance.toFixed(2)}
            </span></p>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Transaction Type:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{display: 'flex', alignItems: 'center'}}>
                  <input
                    type="radio"
                    value="debit"
                    checked={transactionType === 'debit'}
                    onChange={() => setTransactionType('debit')}
                    style={{ marginRight: '8px', transform: 'scale(1.2)' }}
                  />
                  Customer Bought (Increases their debt to you)
                </label>
                <label style={{display: 'flex', alignItems: 'center'}}>
                  <input
                    type="radio"
                    value="credit"
                    checked={transactionType === 'credit'}
                    onChange={() => setTransactionType('credit')}
                    style={{ marginRight: '8px', transform: 'scale(1.2)' }}
                  />
                  Customer Paid (Decreases their debt to you)
                </label>
              </div>
            </div>

            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              style={{
                width: '100%', padding: '10px', marginBottom: '15px',
                border: '1px solid #ddd', borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
             <textarea
              placeholder="Description (optional)"
              value={transactionDescription}
              onChange={(e) => setTransactionDescription(e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '10px', marginBottom: '15px',
                border: '1px solid #ddd', borderRadius: '4px',
                boxSizing: 'border-box', resize: 'vertical',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowRecordTransactionModal(false)}
                style={{
                  padding: '8px 15px', backgroundColor: '#6c757d', color: 'white',
                  border: 'none', borderRadius: '4px', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRecordTransaction}
                style={{
                  padding: '8px 15px', backgroundColor: '#007bff', color: 'white',
                  border: 'none', borderRadius: '4px', cursor: 'pointer',
                }}
              >
                Record Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KhataScreen;