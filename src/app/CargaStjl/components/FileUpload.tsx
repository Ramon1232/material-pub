'use client';
import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
} from '@mui/material';
import * as XLSX from 'xlsx';

interface ExcelData {
  [key: string]: any;
}

const UploadExcel: React.FC = () => {
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const simulateLoading = () => {
    setLoading(true);
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 500);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = excelData.length ? Object.keys(excelData[0]) : [];

  return (
    <Container
      maxWidth="lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '5px',
        marginTop: '25px'
      }}
    >

      <input
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        id="upload-excel"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="upload-excel">
        <Button variant="contained" component="span" style={{ marginBottom: '5px' }} sx={{
          backgroundColor: '#79142A',
          color: '#ffffff',
          fontFamily: 'gotham rounded medium',
          fontSize: '16px',
          '&:hover': {
            backgroundColor: '#79142A',
            color: '#ffffff',
            transform: 'scale(1.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          },
        }}>
          Seleccionar archivo
        </Button>
      </label>
      <Button
        variant="contained"
        onClick={simulateLoading}
        disabled={loading}
        sx={{backgroundColor: '#79142A',
          color: '#ffffff',
          fontFamily: 'gotham rounded medium',
          fontSize: '14px',
          '&:hover': {
            backgroundColor: '#79142A',
            color: '#ffffff',
            transform: 'scale(1.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          },}}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          'Carga de Archivos'
        )}
      </Button>
      {loading && (
        <Typography variant="body1" style={{ marginTop: '5px' }}>
          Cargando: {progress}%
        </Typography>
      )}
      {excelData.length > 0 && (
        <Box sx={{ width: '100%', marginTop: '5px' }}>
          <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column}
                      align="center"
                      sx={{
                        backgroundColor: '#60595D',
                        color: 'white'
                        , fontSize: '1rem',
                        fontFamily: 'gotham rounded medium',
                        borderRight: '1px solid #ffffff',
                        borderBottom: '2px solid #ffffff ',
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {excelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                  <TableRow key={rowIndex} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#dacec0' } }}>
                    {columns.map((column) => (
                      <TableCell key={column} align="center" sx={{ borderBottom: '1px outset #d3d3d3', borderRight: '1px outset #d3d3d3' }}>
                        {row[column]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'right' }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={excelData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default UploadExcel;
