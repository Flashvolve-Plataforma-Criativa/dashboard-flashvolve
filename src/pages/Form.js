import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import 'dayjs/locale/pt-br';

export default function AddressForm() {

  const [initialValue, setInitialValue] = React.useState(null);
  const [finalValue, setFinalValue] = React.useState(null);

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Formulario de atualizacão de dados
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel
          id="demo-simple-select-autowidth-label"
          required
        >
          Empresa
        </InputLabel>
        <Select
          required
          id="company"
          name="company"
          fullWidth
          autoComplete="given-name"
          variant="standard"
        // value={filter}
        // onChange={async ({ target }) =>
        //     target && (await handleSetFilter(target.value))
        // }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel
          id="demo-simple-select-autowidth-label"
          required
        >
          Campanha
        </InputLabel>
        <Select
          required
          id="campaign"
          name="campaign"
          fullWidth
          autoComplete="family-name"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel
          id="demo-simple-select-autowidth-label"
          required
        >
          Tipo
        </InputLabel>
        <Select
          required
          id="type"
          name="type"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel
          id="demo-simple-select-autowidth-label"
          required
        >
          Produto
        </InputLabel>
        <Select
          required
          id="product"
          name="product"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="value"
          name="value"
          label="Valor"
          fullWidth
          autoComplete="shipping address-line1"
          variant="standard"
          type='number'
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="quantity"
          name="quantity"
          label="Quantidade"
          fullWidth
          autoComplete="shipping address-line2"
          variant="standard"
          type='number'
        />
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
        <Grid item xs={12} container spacing={5}>
          <Grid item xs={12}>
            <DatePicker
              required
              id="openingDate"
              name="openingDate"
              label="Data de abertura"
              fullWidth
              variant="standard"
              value={initialValue}
              onChange={(event) => {
                setInitialValue(event)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              required
              id="closingDate"
              name="closingDate"
              label="Data de fechamento"
              fullWidth
              variant="standard"
              value={finalValue}
              onChange={(event) => {
                setFinalValue(event)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid
            item
            xs={11}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button type="submit" variant="outlined">
              Submeter formulário
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
}