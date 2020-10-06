import React from 'react'
import BitField from './BitField'
import { 
  Table, 
  TableBody,
  TableRow,
  TableCell,
  Checkbox 
} from '@material-ui/core';

// Check if this bit is part of a bitfield and return it's color, 
// otherwise return the default color.
function getColor(bitFields: BitField[], bitOffset: number) {
  for (const field of bitFields) {
    if (bitOffset >= field.start && bitOffset <= field.end) {
      return field.color;
    }
  }
  return undefined;
}

interface BitTableProps {
  value: bigint
  bitFields: BitField[]
}

export function BitTable(props: BitTableProps) {
  const bytes = [];
  const bitCount: number = 64;
  let byteCount = bitCount / 8;

  for (let byteOffset = 0; byteOffset < byteCount; byteOffset++) {
    const indexes = [];
    const values = [];

    for (let bit = 0; bit < 8; bit++) {
      let bitOffset;
      let isSet = false;

      // if (props.littleEndian) {
      //   bitOffset = (byteOffset * 8) + (7 - bit);
      //   isSet = !!((props.value >> BigInt(bitOffset)) & BigInt(1));
      // } else {
      //   bitOffset = ((byteCount - 1 - byteOffset) * 8) + (7 - bit);
      //   isSet = !!((props.value >> BigInt(bitOffset)) & BigInt(1));
      // }
      
      bitOffset = ((byteCount - 1 - byteOffset) * 8) + (7 - bit);
      isSet = !!((props.value >> BigInt(bitOffset)) & BigInt(1));
      let color = getColor(props.bitFields, bitOffset);

      indexes.push(
        <TableCell align="center">
          <label>{bitOffset}</label>
        </TableCell>
      );

      values.push(
        <TableCell align="center" style={{ backgroundColor: color }}>
          <Checkbox checked={isSet} color="primary" />
        </TableCell>
      );
    }

    bytes.push(
      <TableBody>
        <TableRow>
          {indexes}
        </TableRow>
        <TableRow>
          {values}
        </TableRow>
      </TableBody>
    );
  }

  return (
    <Table padding="none" style={{minWidth: 650, padding:0}} size="small">
      {bytes}
    </Table>
  );
}