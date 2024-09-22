import * as React from 'react';
import ModalComponent from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Button } from '@mui/joy';
import { ModalProps } from '../../types';

export default function Modal(
  { open, setOpen, onConfirm, title, description }: ModalProps
) {
  const handleConfirm = () => {
    setOpen(false)
    onConfirm()
  }

  return (
    <ModalComponent
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: 'lg', mb: 1 }}
        >
          {title}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          {description}
        </Typography>
        <Button onClick={handleConfirm} className="mt-4">Submit</Button>
      </Sheet>
    </ModalComponent>
  );
}
