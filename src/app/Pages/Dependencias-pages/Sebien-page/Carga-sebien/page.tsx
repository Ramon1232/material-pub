'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { Beneficiario } from '../../../Interfaces/beneficiarioTable'; // Asegúrate de que Beneficiario esté importado correctamente
import Navbar from '../Components/Navbar';
import Footer from '../../../Components/Footer';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const Carga = () => {
  const { data: session, status } = useSession();
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Cantidad de filas por página
  const [totalRows, setTotalRows] = useState(0); // Total de filas en la tabla

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const cargaDeDatos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: ['curp', 'primer_apellido', 'segundo_apellido', 'nombre', 'fecha_nacimiento',
            'cve_ent_nac', 'sexo', 'discapacidad', 'indigena', 'cve_civil', 'cve_dependencia', 'cve_institucion',
            'cve_programa', 'cve_intra_programa', 'cve_ent_fed', 'cve_municipio', 'cve_localidad', 'fecha_beneficio',
            'cve_tipo_beneficiario', 'cve_tipo_beneficio', 'cantidad_apoyo', 'tipo_vial', 'nom_vial', 'num_int_num',
            'num_int_alf', 'nom_loc', 'cve_loc', 'nom_mun', 'cve_mun', 'nom_ent', 'cve_ent', 'observaciones'],
          range: 1,
          raw: false,
        }) as Beneficiario[]; // Convertir jsonData a Beneficiario[]

        jsonData.forEach((row: any) => {
          if (typeof row.cve_ent_fed === 'string') {
            row.cve_ent_fed = parseInt(row.cve_ent_fed, 10);
          }
          if (typeof row.cantidad_apoyo === 'string') {
            const cantidad = parseFloat(row.cantidad_apoyo.replace(',', '.'));
            row.cantidad_apoyo = cantidad.toFixed(2);
          }
        });
        setBeneficiarios(jsonData); // Actualizar el estado con el arreglo de Beneficiario[]
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const registroDatos = async () => {
    try {
      if (!beneficiarios || beneficiarios.length === 0) {
        throw new Error('No hay datos de beneficiarios para enviar');
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sebien-pub/post-excel`,
        beneficiarios,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      console.log(response.data);
      alert('Datos enviados exitosamente');
      setError(null);
      generatePDF(response.data);
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setError('Error al enviar datos al servidor');
    }
  };

  const generatePDF = (result: any) => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    const numBeneficiarios = result.length;

    // Título y detalles del documento
    doc.setFontSize(16);
    doc.text('Acuse de Registro de Beneficiarios', 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha de Registro: ${date}`, 10, 20);
    doc.text(`Hora de Registro: ${time}`, 10, 30);
    doc.text(`Número de Beneficiarios Registrados: ${numBeneficiarios}`, 10, 40);

    doc.save('acuse_de_registro.pdf');
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Volver a la primera página al cambiar la cantidad de filas por página
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedBeneficiarios = beneficiarios.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <div style={{ padding: '1rem', maxWidth: 'calc(100vw - 2rem)', width: '100%', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Importar Beneficiarios desde Excel</h1>
          <input type="file" accept=".xlsx, .xls" onChange={cargaDeDatos} style={{ marginBottom: '1rem', width: '100%' }} />
          <Button onClick={registroDatos} variant="contained" color="primary" style={{ display: 'block', margin: 'auto', marginBottom: '1rem' }}>
            Registrar beneficiarios
          </Button>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          {beneficiarios.length > 0 && (
            <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
              <Table>
                <TableHead>
                <TableCell>N°</TableCell>
                     <TableCell>Curp</TableCell>
                     <TableCell>Primer Apellido</TableCell>
                     <TableCell>Segundo Apellido</TableCell>
                     <TableCell>Nombre</TableCell>
                     <TableCell>Fecha de Nacimiento</TableCell>
                     <TableCell>Entidad de Nacimiento</TableCell>
                     <TableCell>Sexo</TableCell>
                     <TableCell>Discapacidad</TableCell>
                     <TableCell>Indígena</TableCell>
                     <TableCell>Estado Civil</TableCell>
                     <TableCell>Dependencia</TableCell>
                     <TableCell>Institución</TableCell>
                     <TableCell>Programa</TableCell>
                     <TableCell>Intra-Programa</TableCell>
                     <TableCell>Entidad Federativa</TableCell>
                     <TableCell>Municipio</TableCell>
                     <TableCell>Localidad</TableCell>
                     <TableCell>Fecha de Beneficio</TableCell>
                     <TableCell>Tipo de Beneficiario</TableCell>
                     <TableCell>Tipo de Beneficio</TableCell>
                     <TableCell>Cantidad de Apoyo</TableCell>
                     <TableCell>Tipo de Vial</TableCell>
                     <TableCell>Nombre de Vialidad</TableCell>
                     <TableCell>Número Interior/Número</TableCell>
                     <TableCell>Número Interior/Alfanumérico</TableCell>
                     <TableCell>Localidad</TableCell>
                     <TableCell>Clave de Localidad</TableCell>
                     <TableCell>Municipio</TableCell>
                     <TableCell>Clave de Municipio</TableCell>
                     <TableCell>Entidad Federativa</TableCell>
                     <TableCell>Clave de Entidad Federativa</TableCell>
                     <TableCell>Observaciones</TableCell>
                </TableHead>
                <TableBody>
                  {paginatedBeneficiarios.map((beneficiario, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{beneficiario.curp}</TableCell>
                      <TableCell>{beneficiario.primer_apellido}</TableCell>
                      <TableCell>{beneficiario.segundo_apellido}</TableCell>
                      <TableCell>{beneficiario.nombre}</TableCell>
                      <TableCell>{beneficiario.fecha_nacimiento}</TableCell>
                      <TableCell>{beneficiario.cve_ent_nac}</TableCell>
                      <TableCell>{beneficiario.sexo}</TableCell>
                      <TableCell>{beneficiario.discapacidad}</TableCell>
                      <TableCell>{beneficiario.indigena}</TableCell>
                      <TableCell>{beneficiario.cve_civil}</TableCell>
                      <TableCell>{beneficiario.cve_dependencia}</TableCell>
                      <TableCell>{beneficiario.cve_institucion}</TableCell>
                      <TableCell>{beneficiario.cve_programa}</TableCell>
                      <TableCell>{beneficiario.cve_intra_programa}</TableCell>
                      <TableCell>{beneficiario.cve_ent_fed}</TableCell>
                      <TableCell>{beneficiario.cve_municipio}</TableCell>
                      <TableCell>{beneficiario.cve_localidad}</TableCell>
                      <TableCell>{beneficiario.fecha_beneficio}</TableCell>
                      <TableCell>{beneficiario.cve_tipo_beneficiario}</TableCell>
                      <TableCell>{beneficiario.cve_tipo_beneficio}</TableCell>
                      <TableCell>{beneficiario.cantidad_apoyo}</TableCell>
                      <TableCell>{beneficiario.tipo_vial}</TableCell>
                      <TableCell>{beneficiario.nom_vial}</TableCell>
                      <TableCell>{beneficiario.num_int_num}</TableCell>
                      <TableCell>{beneficiario.num_int_alf}</TableCell>
                      <TableCell>{beneficiario.nom_loc}</TableCell>
                      <TableCell>{beneficiario.cve_loc}</TableCell>
                      <TableCell>{beneficiario.nom_mun}</TableCell>
                      <TableCell>{beneficiario.cve_mun}</TableCell>
                      <TableCell>{beneficiario.nom_ent}</TableCell>
                      <TableCell>{beneficiario.cve_ent}</TableCell>
                      <TableCell>{beneficiario.observaciones}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </div>
      </div>
      <Footer />
    </div>
  //   <div>
  //     <Navbar />
  //     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
  //       <div style={{ padding: '1rem', maxWidth: 'calc(100vw - 2rem)', width: '100%', margin: '0 auto' }}>
  //         <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Importar Beneficiarios desde Excel</h1>
  //         <input type="file" accept=".xlsx, .xls" onChange={cargaDeDatos} style={{ marginBottom: '1rem', width: '100%' }} />
  //         <Button onClick={registroDatos} variant="contained" color="primary" style={{ display: 'block', margin: 'auto', marginBottom: '1rem' }}>
  //           Registrar beneficiarios
  //         </Button>
  //         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
  //         {beneficiarios.length > 0 && (
  //           <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
  //             <Table>
  //               <TableHead>
  //                 <TableRow>
  //                   <TableCell>N°</TableCell>
  //                   <TableCell>Curp</TableCell>
  //                   <TableCell>Primer Apellido</TableCell>
  //                   <TableCell>Segundo Apellido</TableCell>
  //                   <TableCell>Nombre</TableCell>
  //                   <TableCell>Fecha de Nacimiento</TableCell>
  //                   <TableCell>Entidad de Nacimiento</TableCell>
  //                   <TableCell>Sexo</TableCell>
  //                   <TableCell>Discapacidad</TableCell>
  //                   <TableCell>Indígena</TableCell>
  //                   <TableCell>Estado Civil</TableCell>
  //                   <TableCell>Dependencia</TableCell>
  //                   <TableCell>Institución</TableCell>
  //                   <TableCell>Programa</TableCell>
  //                   <TableCell>Intra-Programa</TableCell>
  //                   <TableCell>Entidad Federativa</TableCell>
  //                   <TableCell>Municipio</TableCell>
  //                   <TableCell>Localidad</TableCell>
  //                   <TableCell>Fecha de Beneficio</TableCell>
  //                   <TableCell>Tipo de Beneficiario</TableCell>
  //                   <TableCell>Tipo de Beneficio</TableCell>
  //                   <TableCell>Cantidad de Apoyo</TableCell>
  //                   <TableCell>Tipo de Vial</TableCell>
  //                   <TableCell>Nombre de Vialidad</TableCell>
  //                   <TableCell>Número Interior/Número</TableCell>
  //                   <TableCell>Número Interior/Alfanumérico</TableCell>
  //                   <TableCell>Localidad</TableCell>
  //                   <TableCell>Clave de Localidad</TableCell>
  //                   <TableCell>Municipio</TableCell>
  //                   <TableCell>Clave de Municipio</TableCell>
  //                   <TableCell>Entidad Federativa</TableCell>
  //                   <TableCell>Clave de Entidad Federativa</TableCell>
  //                   <TableCell>Observaciones</TableCell>
  //                 </TableRow>
  //               </TableHead>
  //               <TableBody>
  //                 {beneficiarios.map((beneficiario, index) => (
  //                   <TableRow key={index}>
  //                     <TableCell>{index + 1}</TableCell>
  //                     <TableCell>{beneficiario.curp}</TableCell>
  //                     <TableCell>{beneficiario.primer_apellido}</TableCell>
  //                     <TableCell>{beneficiario.segundo_apellido}</TableCell>
  //                     <TableCell>{beneficiario.nombre}</TableCell>
  //                     <TableCell>{beneficiario.fecha_nacimiento}</TableCell>
  //                     <TableCell>{beneficiario.cve_ent_nac}</TableCell>
  //                     <TableCell>{beneficiario.sexo}</TableCell>
  //                     <TableCell>{beneficiario.discapacidad}</TableCell>
  //                     <TableCell>{beneficiario.indigena}</TableCell>
  //                     <TableCell>{beneficiario.cve_civil}</TableCell>
  //                     <TableCell>{beneficiario.cve_dependencia}</TableCell>
  //                     <TableCell>{beneficiario.cve_institucion}</TableCell>
  //                     <TableCell>{beneficiario.cve_programa}</TableCell>
  //                     <TableCell>{beneficiario.cve_intra_programa}</TableCell>
  //                     <TableCell>{beneficiario.cve_ent_fed}</TableCell>
  //                     <TableCell>{beneficiario.cve_municipio}</TableCell>
  //                     <TableCell>{beneficiario.cve_localidad}</TableCell>
  //                     <TableCell>{beneficiario.fecha_beneficio}</TableCell>
  //                     <TableCell>{beneficiario.cve_tipo_beneficiario}</TableCell>
  //                     <TableCell>{beneficiario.cve_tipo_beneficio}</TableCell>
  //                     <TableCell>{beneficiario.cantidad_apoyo}</TableCell>
  //                     <TableCell>{beneficiario.tipo_vial}</TableCell>
  //                     <TableCell>{beneficiario.nom_vial}</TableCell>
  //                     <TableCell>{beneficiario.num_int_num}</TableCell>
  //                     <TableCell>{beneficiario.num_int_alf}</TableCell>
  //                     <TableCell>{beneficiario.nom_loc}</TableCell>
  //                     <TableCell>{beneficiario.cve_loc}</TableCell>
  //                     <TableCell>{beneficiario.nom_mun}</TableCell>
  //                     <TableCell>{beneficiario.cve_mun}</TableCell>
  //                     <TableCell>{beneficiario.nom_ent}</TableCell>
  //                     <TableCell>{beneficiario.cve_ent}</TableCell>
  //                     <TableCell>{beneficiario.observaciones}</TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </TableContainer>
  //         )}
  //       </div>
  //     </div>
  //     <Footer />
  //   </div>
  // );
)};

export default Carga;
