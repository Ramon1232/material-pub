'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
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
import { Beneficiario } from '@/app/Pages/Interfaces/interfaces';
import Navbar from '../Components-dif/Navbar';

const Carga = () => {
    const { data: session, status } = useSession();
    const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sebien-pub`, {
                headers: {
                    Authorization: `Bearer ${session?.user?.token}`,
                },
            });
            setBeneficiarios(response.data);
            console.log(response)
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setError('Error al obtener datos de la API.');
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
        return <CircularProgress />;
    }

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
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
                        Visualiza tus Beneficiarios
                    </h1>
                    <Container
                        maxWidth="xl"
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
                        <Button
                            onClick={fetchData}
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
                            }}>
                            visualizar beneficiarios
                        </Button>
                        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                        {beneficiarios.length > 0 ? (
                            <>
                                <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
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
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_dependencia).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_institucion).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_programa).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_intra_programa).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_ent_fed).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_municipio).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_localidad).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.fecha_beneficio).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_tipo_beneficiario).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cve_tipo_beneficio).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.beneficios?.map(beneficio => beneficio.cantidad_apoyo).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.tipo_vial).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.nom_vial).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.num_int_num).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.num_int_alf).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.nom_loc).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.cve_loc).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.nom_mun).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.cve_mun).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.nom_ent).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.cve_ent).join(', ')}</TableCell>
                                                        <TableCell sx={styles.tableCell2}>{beneficiario.domicilios?.map(domicilio => domicilio.observaciones).join(', ')}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Container>
                                    <TablePagination
                                        component="div"
                                        count={beneficiarios.length}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelDisplayedRows={({ from, to, count }) =>
                                            `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
                                        }
                                        labelRowsPerPage="Filas por página:"
                                    />
                                </Container>
                            </>
                        ) : (
                            <Typography variant="h6" style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
                                
                            </Typography>
                        )}
                        <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
                            <DialogTitle>¡Éxito!</DialogTitle>
                            <DialogContent>Los datos se han cargado correctamente.</DialogContent>
                            <DialogActions>
                                <Button onClick={() => setSuccessDialogOpen(false)}>Cerrar</Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Carga;

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
  
