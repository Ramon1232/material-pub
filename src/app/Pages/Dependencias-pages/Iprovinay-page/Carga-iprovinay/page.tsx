'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import axios, { AxiosError } from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
  Container,
  TablePagination,
} from '@mui/material';
import Footer from '../../../Components/Footer';
import { Beneficiario } from '../../../Interfaces/beneficiarioTable';
import Navbar from '../Components-iprovinay/Navbar';
import { logo64, logopub64 } from '../../Sebien-page/Carga-sebien/imagenData';

const CargaIprovinay = () => {
  const { data: session, status } = useSession();
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const cargaDeDatos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.xlsx')) {
        setError('Archivo inválido. Por favor, seleccione un archivo .xlsx.');
        return;
      }

      //Validacion de excel

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: [
            'curp',
            'primer_apellido',
            'segundo_apellido',
            'nombre',
            'fecha_nacimiento',
            'cve_ent_nac',
            'sexo',
            'discapacidad',
            'indigena',
            'cve_civil',
            'cve_dependencia',
            'cve_institucion',
            'cve_programa',
            'cve_intra_programa',
            'cve_ent_fed',
            'cve_municipio',
            'cve_localidad',
            'fecha_beneficio',
            'cve_tipo_beneficiario',
            'cve_tipo_beneficio',
            'cantidad_apoyo',
            'tipo_vial',
            'nom_vial',
            'num_int_num',
            'num_int_alf',
            'nom_loc',
            'cve_loc',
            'nom_mun',
            'cve_mun',
            'nom_ent',
            'cve_ent',
            'observaciones',
          ],
          range: 1,
          raw: false,
        }) as Beneficiario[];

        jsonData.forEach((row: any) => {
          if (typeof row.cve_ent_fed === 'string') {
            row.cve_ent_fed = parseInt(row.cve_ent_fed, 10);
          }
          if (typeof row.cantidad_apoyo === 'string') {
            row.cantidad_apoyo = parseFloat(row.cantidad_apoyo.toString().replace(',', '.')).toFixed(2);
          }
        });
        setBeneficiarios(jsonData);
        setError(null);
        console.log('datos', jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const registroDatos = async () => {
    try {
      if (!beneficiarios || beneficiarios.length === 0) {
        throw new Error('No hay datos de beneficiarios para enviar');
      }

      if (!session?.user?.token) {
        setError('Autenticacion no encontrada, vuelve a iniciar sesión.');
        return;
      }

      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/iprovinay-pub/post-excel`,
        beneficiarios,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      console.log(response.data);
      setLoading(false);
      setSuccessDialogOpen(true);
      setError(null);
      generatePDF(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          const responseData = axiosError.response.data;
          if (typeof responseData === 'string') {
            setError(`Error del servidor: ${responseData}`);
          } else if (typeof responseData === 'object' && 'message' in responseData) {
            setError(`Error del servidor: ${responseData.message}`);
          } else {
            setError('Error del servidor desconocido.');
          }
        } else {
          setError('Error de conexión. Por favor, inténtelo de nuevo más tarde.');
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error al procesar la solicitud. Por favor, inténtelo de nuevo.');
      }

      setLoading(false);
    }
  };

  const generatePDF = (result: any) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'letter' });

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    const numBeneficiarios = result.length;

    const primerBeneficiario = result[0] || {};
    const claveDependencia = primerBeneficiario.cve_dependencia || 'No disponible';
    const clavePrograma = primerBeneficiario.cve_programa || 'No disponible';

    const margin = 1;
    const imgWidth = 2;
    const imgWidthPub = 1;
    const imgHeight = 0;
    const imgSpacing = 4;

    const logoX = margin;
    const logopubX = margin + imgWidthPub + imgSpacing;
    const titleY = margin + imgHeight + 0.5;
    const contentY = titleY + 0.5;
    const footerY = 7;
    const contMargin = 2.5;

    doc.addImage(logo64, 'PNG', logoX, margin, imgWidth, imgHeight);
    doc.addImage(logopub64, 'PNG', logopubX, margin, imgWidthPub, imgHeight);

    doc.setFontSize(20);
    doc.setTextColor(121, 20, 42);
    doc.text('Acuse de Registro de Beneficiarios', 2, 2.5);

    doc.setFontSize(12);
    doc.setTextColor(51, 50, 48);
    doc.text(`Fecha de Registro: ${date}`, contMargin, 3.5);
    doc.text('Dependencia: Instituto Promotor de la Vivienda de Nayarit.', contMargin, 4.0);
    doc.text(`Nombre del Archivo: ${claveDependencia}/${clavePrograma}/2024`, contMargin, 4.5);
    doc.text(`Hora de Registro: ${time}`, contMargin, 5.0);
    doc.text(`Número de Beneficiarios Registrados: ${numBeneficiarios}`, contMargin, 5.5);

    doc.setFontSize(12);
    doc.text('Revisa y Valida', 2.05, 7);
    doc.setFontSize(14);
    doc.setTextColor(121, 20, 42);
    doc.text('Enlace Responsable', 1.8, 7.5);
    doc.setFontSize(11);
    doc.setTextColor(51, 50, 48);
    doc.text('(Nombre, Firma, Cargo y' + '\n' + ' Dependencia, Entidad o' + '\n' + '        Ayuntamiento)', 1.8, 7.7);

    doc.setFontSize(12);
    doc.text('Revisa y Valida', margin + 4, 7);
    doc.setFontSize(14);
    doc.setTextColor(121, 20, 42);
    doc.text('Enlace Responsable', margin + 3.8, 7.5);
    doc.setFontSize(11);
    doc.setTextColor(51, 50, 48);
    doc.text('(Nombre, Firma, Cargo y' + '\n' + ' Dependencia, Entidad o' + '\n' + '        Ayuntamiento)', 4.8, 7.7); // Detalles del responsable

    doc.save('acuse_de_registro_IPROVINAY.pdf');
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <div style={{ padding: '1rem', maxWidth: 'calc(100vw - 2rem)', width: '100%', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', fontFamily: 'gothamrnd_bold' }}>
            Importar Beneficiarios desde Excel
          </h1>
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
            <label htmlFor="upload-excel">
              <input
                id="upload-excel"
                type="file"
                style={{ display: 'none' }}
                onChange={cargaDeDatos}
              />
              <Button
                variant="contained"
                component="span"
                style={{ marginBottom: '5px' }}
                sx={{
                  backgroundColor: '#79142A',
                  color: '#ffffff',
                  fontFamily: 'gothamrnd_medium',
                  fontSize: '16px',
                  '&:hover': {
                    backgroundColor: '#79142A',
                    color: '#ffffff',
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                  },
                }}
              >
                Seleccionar archivo
              </Button>
            </label>
            <Button
              variant="contained"
              onClick={registroDatos}
              disabled={loading}
              sx={{
                backgroundColor: '#79142A',
                color: '#ffffff',
                fontFamily: 'gothamrnd_medium',
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: '#79142A',
                  color: '#ffffff',
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                'Carga de Archivos'
              )}
            </Button>

            {error && <p style={{ color: 'red', textAlign: 'center', fontFamily: 'gothamrnd_medium' }}>{error}</p>}
            {beneficiarios.length > 0 && (
              <>
                <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
                  <Table>
                    <TableHead>
                      <TableRow >
                        <TableCell sx={styles.tableCell}>N°</TableCell>
                        <TableCell sx={styles.tableCell}>Curp</TableCell>
                        <TableCell sx={styles.tableCell}>Primer Apellido</TableCell>
                        <TableCell sx={styles.tableCell}>Segundo Apellido</TableCell>
                        <TableCell sx={styles.tableCell}>Nombre</TableCell>
                        <TableCell sx={styles.tableCell}>Fecha de Nacimiento</TableCell>
                        <TableCell sx={styles.tableCell}>Entidad de Nacimiento</TableCell>
                        <TableCell sx={styles.tableCell}>Sexo</TableCell>
                        <TableCell sx={styles.tableCell}>Discapacidad</TableCell>
                        <TableCell sx={styles.tableCell}>Indígena</TableCell>
                        <TableCell sx={styles.tableCell}>Estado Civil</TableCell>
                        <TableCell sx={styles.tableCell}>Dependencia</TableCell>
                        <TableCell sx={styles.tableCell}>Institución</TableCell>
                        <TableCell sx={styles.tableCell}>Programa</TableCell>
                        <TableCell sx={styles.tableCell}>Intra-Programa</TableCell>
                        <TableCell sx={styles.tableCell}>Entidad Federativa</TableCell>
                        <TableCell sx={styles.tableCell}>Municipio</TableCell>
                        <TableCell sx={styles.tableCell}>Localidad</TableCell>
                        <TableCell sx={styles.tableCell}>Fecha de Beneficio</TableCell>
                        <TableCell sx={styles.tableCell}>Tipo de Beneficiario</TableCell>
                        <TableCell sx={styles.tableCell}>Tipo de Beneficio</TableCell>
                        <TableCell sx={styles.tableCell}>Cantidad de Apoyo</TableCell>
                        <TableCell sx={styles.tableCell}>Tipo de Vial</TableCell>
                        <TableCell sx={styles.tableCell}>Nombre de Vialidad</TableCell>
                        <TableCell sx={styles.tableCell}>Número Interior/Número</TableCell>
                        <TableCell sx={styles.tableCell}>Número Interior/Alfanumérico</TableCell>
                        <TableCell sx={styles.tableCell}>Localidad</TableCell>
                        <TableCell sx={styles.tableCell}>Clave de Localidad</TableCell>
                        <TableCell sx={styles.tableCell}>Municipio</TableCell>
                        <TableCell sx={styles.tableCell}>Clave de Municipio</TableCell>
                        <TableCell sx={styles.tableCell}>Entidad Federativa</TableCell>
                        <TableCell sx={styles.tableCell}>Clave de Entidad Federativa</TableCell>
                        <TableCell sx={styles.tableCell}>Observaciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {beneficiarios
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((beneficiario, index) => (
                          <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#dacec0' } }}>
                            <TableCell sx={styles.tableCell2}>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.curp}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.primer_apellido}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.segundo_apellido}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.nombre}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.fecha_nacimiento}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_ent_nac}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.sexo}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.discapacidad}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.indigena}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_civil}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_dependencia}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_institucion}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_programa}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_intra_programa}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_ent_fed}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_municipio}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_localidad}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.fecha_beneficio}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_tipo_beneficiario}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_tipo_beneficio}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cantidad_apoyo}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.tipo_vial}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.nom_vial}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.num_int_num}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.num_int_alf}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.nom_loc}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_loc}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.nom_mun}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_mun}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.nom_ent}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.cve_ent}</TableCell>
                            <TableCell sx={styles.tableCell2}>{beneficiario.observaciones}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Container>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={beneficiarios.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Container>
              </>
            )}
          </Container>
        </div>
      </div>
      <Footer />
      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Carga Exitosa</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Los datos se han enviado correctamente.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CargaIprovinay;

const styles = {
  tableCell: {
    backgroundColor: '#60595D',
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'gothamrnd_medium',
    borderRight: '1px solid #ffffff',
    borderBottom: '2px solid #ffffff',
  },

  tableCell2: {
    borderBottom: '1px outset #d3d3d3',
    borderRight: '1px outset #d3d3d3',
    fontFamily: 'gothamrnd_medium'
  }
};
