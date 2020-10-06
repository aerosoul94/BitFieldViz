import React, { useRef } from 'react'
import BitField from './BitField';
import { randomColor } from '../utils/Utilities'
import { 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  TextField,
  Grid,
  Button
} from '@material-ui/core';

function Field(field: BitField, value: bigint,
  removeBitField: (bitField: BitField) => void) {
  let len = (field.end + 1) - field.start;
  let mask = BigInt(1 << len) - BigInt(1) << BigInt(field.start);
  let extract = (value & mask) >> BigInt(field.start);
  return (
    <TableRow style={{backgroundColor: field.color}}>
      <TableCell>{field.name}</TableCell>
      <TableCell>{field.start}</TableCell>
      <TableCell>{field.end}</TableCell>
      <TableCell>{len}</TableCell>
      <TableCell>{extract.toString()}</TableCell>
      <TableCell>{mask.toString(16)}</TableCell>
      <TableCell>
        <Button 
          variant="outlined"
          onClick={e => removeBitField(field)}>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

interface FieldTableProps {
  value: bigint
  bitFields: BitField[]
  addBitField: (bitField: BitField) => void
  removeBitField: (bitField: BitField) => void
}

export const FieldTable = (props: FieldTableProps) => {
  const nameRef = useRef<HTMLInputElement>(null!);
  const startRef = useRef<HTMLInputElement>(null!);
  const endRef = useRef<HTMLInputElement>(null!);
  const lenRef = useRef<HTMLInputElement>(null!);

  const onAddBitField = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const name = nameRef.current.value;
    const start = parseInt(startRef.current.value);
    const end = parseInt(endRef.current.value);
    const color = randomColor();
    if (props.bitFields.some(value =>
      start >= value.start && start <= value.end)) {
      alert("Invalid bitfield: Must not intersect with other bit fields.");
      return;
    }
    props.addBitField({
      name: name,
      start: start,
      end: end,
      color: color
    });
  }

  const changeStart = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const textbox = ev.currentTarget;
    if (textbox.value) {
      let start = parseInt(textbox.value);
      let endVal = endRef.current.value;
      let lenVal = lenRef.current.value;
      if (endVal) {
        let end = parseInt(endVal);
        lenRef.current.value = ((end - start) + 1).toString();
      }
      else if (lenVal) {
        let len = parseInt(lenVal);
        endRef.current.value = (start + len).toString();
      }
    }
  }

  const changeEnd = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const textbox = ev.currentTarget;
    if (textbox.value) {
      let end = parseInt(textbox.value);
      let startVal = startRef.current.value;
      let lenVal = lenRef.current.value;
      if (startVal) {
        let start = parseInt(startVal);
        lenRef.current.value = ((end - start) + 1).toString();
      }
      else if (lenVal) {
        let len = parseInt(lenVal);
        startRef.current.value = (end - len).toString();
      }
    }
  }

  const changeLen = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const textbox = ev.currentTarget;
    if (textbox.value) {
      let len = parseInt(textbox.value);
      let startVal = startRef.current.value;
      let endVal = endRef.current.value;
      if (startVal) {
        let start = parseInt(startVal);
        endRef.current.value = (start + len).toString();
      }
      else if (endVal) {
        let end = parseInt(endRef.current.value);
        startRef.current.value = (end - len).toString();
      }
    }
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            inputRef={nameRef}
            fullWidth
            type="text"
            variant="outlined"
            placeholder="name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            inputRef={startRef}
            fullWidth
            variant="outlined"
            placeholder="start"
            onChange={changeStart} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputRef={endRef}
            fullWidth
            type="text"
            variant="outlined"
            placeholder="end"
            onChange={changeEnd} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputRef={lenRef}
            fullWidth
            type="text"
            variant="outlined"
            placeholder="len"
            onChange={changeLen} />
        </Grid>
      
        <Button 
          color="primary" 
          variant="outlined"
          onClick={onAddBitField}>
          Add Field
        </Button>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Mask</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.bitFields.map(
            field => Field(field, props.value, props.removeBitField))}
        </TableBody>
      </Table>
    </div>
  );
}