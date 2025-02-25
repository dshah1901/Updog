import React from 'react'
import {
  Button,
  TextField,
  Divider,
  Dialog,
  DialogContent,
  Grid,
  DialogTitle,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import classes from './bioEdit.module.scss'

export default function BioEditView({ opened, setOpen }) {
  return (
    <Dialog
      fullWidth
      open={opened}
      onClose={() => {
        setOpen(false)
      }}
    >
      <DialogTitle className={classes.title}>
        Edit Bio
        <CloseIcon
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
          }}
          onClick={() => {
            setOpen(false)
          }}
        />
      </DialogTitle>

      <DialogContent>
        <Divider className={classes.divider} variant="middle" />
        <TextField
          id="filled-multiline-static"
          fullWidth
          multiline
          rows={4}
          inputProps={{ maxLength: 150 }}
          variant="filled"
        />
      </DialogContent>
      <Grid item alignSelf="center">
        <Button
          className={classes.saveButton}
          variant="contained"
          onClick={() => {
            setOpen(false)
          }}
        >
          Save
        </Button>
      </Grid>
    </Dialog>
  )
}
