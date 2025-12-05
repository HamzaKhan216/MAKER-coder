import React, { useState, useMemo, ChangeEvent, KeyboardEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  Box,
  Collapse,
  IconButton,
}
from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Define a basic Contact interface
export interface Contact {
  id: string;
  name: string;
  phone: string;
  // Add any other relevant contact fields here
}

interface ContactSelectDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectContact: (contact: Contact) => void;
  existingContacts: Contact[];
  // Optional: Loading state if contacts are fetched asynchronously
  loading?: boolean;
  // Optional: Error state
  error?: string;
}

const ContactSelectDialog: React.FC<ContactSelectDialogProps> = ({
  open,
  onClose,
  onSelectContact,
  existingContacts,
  loading = false,
  error,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactNameError, setNewContactNameError] = useState('');
  const [newContactPhoneError, setNewContactPhoneError] = useState('');

  const filteredContacts = useMemo(() => {
    if (!searchTerm) {
      return existingContacts;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return existingContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        contact.phone.includes(lowerCaseSearchTerm) // Simple phone match, can be improved
    );
  }, [searchTerm, existingContacts]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleContactSelect = (contact: Contact) => {
    onSelectContact(contact);
    handleCloseDialog();
  };

  const handleCreateNewContact = () => {
    let hasError = false;
    if (!newContactName.trim()) {
      setNewContactNameError('Name is required');
      hasError = true;
    } else {
      setNewContactNameError('');
    }
    if (!newContactPhone.trim()) {
      setNewContactPhoneError('Phone is required');
      hasError = true;
    } else if (!/^[0-9]{10}$/.test(newContactPhone.trim())) { // Basic 10-digit phone validation
      setNewContactPhoneError('Invalid phone number (10 digits)');
      hasError = true;
    } else {
      setNewContactPhoneError('');
    }

    if (hasError) {
      return;
    }

    // Generate a temporary ID for the new contact. In a real app, this would come from the backend.
    const newContact: Contact = {
      id: `new-${Date.now()}`,
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
    };
    onSelectContact(newContact);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setSearchTerm('');
    setShowNewContactForm(false);
    setNewContactName('');
    setNewContactPhone('');
    setNewContactNameError('');
    setNewContactPhoneError('');
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (showNewContactForm) {
        handleCreateNewContact();
      } else if (filteredContacts.length > 0) {
        // Select the first filtered contact if Enter is pressed and search results exist
        handleContactSelect(filteredContacts[0]);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Select Customer for Khata Sale</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="search-contact"
          label="Search by Name or Phone"
          type="text"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          sx={{ mb: 2 }}
        />

        {loading && <Typography align="center" color="textSecondary">Loading contacts...</Typography>}
        {error && <Typography align="center" color="error">Error: {error}</Typography>}

        {!loading && !error && (
          <List sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
            {filteredContacts.length === 0 ? (
              <ListItemText sx={{ p: 2 }} primary="No matching contacts found." />
            ) : (
              filteredContacts.map((contact) => (
                <ListItemButton key={contact.id} onClick={() => handleContactSelect(contact)}>
                  <ListItemText primary={contact.name} secondary={contact.phone} />
                </ListItemButton>
              ))
            )}
          </List>
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">New Customer</Typography>
          <IconButton onClick={() => setShowNewContactForm(!showNewContactForm)} size="small">
            {showNewContactForm ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Box>

        <Collapse in={showNewContactForm}>
          <Box sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              id="new-contact-name"
              label="Customer Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              error={!!newContactNameError}
              helperText={newContactNameError}
              sx={{ mb: 1 }}
            />
            <TextField
              margin="dense"
              id="new-contact-phone"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={newContactPhone}
              onChange={(e) => setNewContactPhone(e.target.value)}
              onKeyDown={handleKeyDown}
              error={!!newContactPhoneError}
              helperText={newContactPhoneError}
              inputProps={{ maxLength: 10 }}
            />
            <Button
              onClick={handleCreateNewContact}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add New Customer
            </Button>
          </Box>
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactSelectDialog;
