import React, { ChangeEvent, useState } from 'react'
import BitField from './BitField';
import { BitTable } from './BitTable';
import { FieldTable } from './FieldTable';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

interface BitVisualizerProps {
  initialValue?: bigint,
  initialBitFields?: BitField[]
  initialLittleEndian?: boolean
}

export const BitVisualizer = ({
  initialValue = BigInt(0),
  initialBitFields = [],
  initialLittleEndian = false
}: BitVisualizerProps) => {

  let [value, setValue] = useState<bigint>(initialValue);
  let [bitFields, setBitFields] = useState<BitField[]>(initialBitFields);

  const parseValue = (text: string) => {
    try {
      return BigInt(text);
    }
    catch (err) {
      return undefined;
    }
  }

  const changeValue = (ev: ChangeEvent<HTMLInputElement>) => {
    let nval = parseValue(ev.target.value);
    if (nval !== undefined) {
      setValue(nval);
    }
  }

  const addBitField = (bitField: BitField) => {
    setBitFields(bitFields.concat(bitField));
  }

  const removeBitField = (bitField: BitField) => {
    setBitFields(bitFields.filter(item => item !== bitField));
  }

  const classes = useStyles();

  return (
    <Container className={classes.main}>
      <TextField
        type="text"
        inputProps={{
          style: {
            textAlign: "center",
            fontFamily: "monospace"
          }
        }}
        placeholder="Enter value here.."
        defaultValue={value.toString()}
        onChange={changeValue} />

      <BitTable
        value={value}
        bitFields={bitFields} />

      <FieldTable
        value={value}
        bitFields={bitFields}
        addBitField={addBitField}
        removeBitField={removeBitField} />
    </Container>
  );
}