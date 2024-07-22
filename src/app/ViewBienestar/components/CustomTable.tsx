'use client';
import React, { useState } from 'react';
import { Table, Form, Button, Pagination } from 'react-bootstrap';
import { faker } from '@faker-js/faker';
import './DataTable.css';  // Importar el archivo CSS

const generateData = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    curp: faker.datatype.string(18),
    primer_apellido: faker.name.lastName(),
    segundo_apellido: faker.name.lastName(),
    nombre: faker.name.firstName(),
    fecha_nacimiento: faker.date.past(30).toISOString().split('T')[0],
    cve_ent_nac: faker.datatype.number({ min: 1, max: 32 }).toString().padStart(2, '0'),
    sexo: faker.helpers.arrayElement(['M', 'F']),
    discapacidad: faker.helpers.arrayElement(['Sí', 'No']),
    indigena: faker.helpers.arrayElement(['Sí', 'No']),
    cve_civil: faker.datatype.string(2),
    cve_dependencia: faker.datatype.string(5),
    cve_institucion: faker.datatype.string(5),
    cve_programa: faker.datatype.string(5),
    cve_intra_programa: faker.datatype.string(5),
    cve_ent_fed: faker.datatype.number({ min: 1, max: 32 }),
    cve_municipio: faker.datatype.string(5),
    cve_localidad: faker.datatype.string(5),
    fecha_beneficio: faker.date.past(2).toISOString().split('T')[0],
    cve_tipo_beneficiario: faker.datatype.string(5),
    cve_tipo_beneficio: faker.datatype.string(5),
    cantidad_apoyo: faker.datatype.number({ min: 100, max: 5000 }),
    tipo_vial: faker.helpers.arrayElement(['Calle', 'Avenida', 'Boulevard']),
    nom_vial: faker.address.streetName(),
    num_int_num: faker.datatype.number({ min: 1, max: 1000 }).toString(),
    num_int_alf: faker.datatype.string(1),
    nom_loc: faker.address.cityName(),
    cve_loc: faker.datatype.string(5),
    nom_mun: faker.address.city(),
    cve_mun: faker.datatype.string(5),
    nom_ent: faker.address.state(),
    cve_ent: faker.datatype.string(5),
    observaciones: faker.lorem.sentence()
  }));
};

const data = generateData(50);

const DataTable: React.FC = () => {
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [programFilter, setProgramFilter] = useState<string>('');
  const [dependenciaFilter, setDependenciaFilter] = useState<string>('');
  const [buttonColor, setButtonColor] = useState<string>('primary');

  const handleSearch = () => {
    setLoading(true);
    let filtered = data;
    if (nameFilter || programFilter || dependenciaFilter) {
      filtered = data.filter(item =>
        (nameFilter ? (item.nombre.toLowerCase().includes(nameFilter.toLowerCase())) : true) &&
        (programFilter ? (item.cve_programa.toLowerCase().includes(programFilter.toLowerCase())) : true) &&
        (dependenciaFilter ? (item.cve_dependencia.toLowerCase().includes(dependenciaFilter.toLowerCase())) : true)
      );
    }
    setFilteredData(filtered);
    setLoading(false);
  };

  const handleClearFilters = () => {
    setNameFilter('');
    setProgramFilter('');
    setDependenciaFilter('');
    setFilteredData(data);
    setCurrentPage(1);
  };

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleProgramFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgramFilter(e.target.value);
  };

  const handleDependenciaFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDependenciaFilter(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleButtonClick = () => {
    setButtonColor(buttonColor === 'primary' ? 'secondary' : 'primary');
  };

  const columns = [
    { title: 'CURP', dataIndex: 'curp' },
    { title: 'Primer Apellido', dataIndex: 'primer_apellido' },
    { title: 'Segundo Apellido', dataIndex: 'segundo_apellido' },
    { title: 'Nombre', dataIndex: 'nombre' },
    { title: 'Fecha de Nacimiento', dataIndex: 'fecha_nacimiento' },
    { title: 'CVE Entidad Nacimiento', dataIndex: 'cve_ent_nac' },
    { title: 'Sexo', dataIndex: 'sexo' },
    { title: 'Discapacidad', dataIndex: 'discapacidad' },
    { title: 'Indígena', dataIndex: 'indigena' },
    { title: 'CVE Estado Civil', dataIndex: 'cve_civil' },
    { title: 'CVE Dependencia', dataIndex: 'cve_dependencia' },
    { title: 'CVE Institución', dataIndex: 'cve_institucion' },
    { title: 'CVE Programa', dataIndex: 'cve_programa' },
    { title: 'CVE Intra-Programa', dataIndex: 'cve_intra_programa' },
    { title: 'CVE Entidad Federativa', dataIndex: 'cve_ent_fed' },
    { title: 'CVE Municipio', dataIndex: 'cve_municipio' },
    { title: 'CVE Localidad', dataIndex: 'cve_localidad' },
    { title: 'Fecha de Beneficio', dataIndex: 'fecha_beneficio' },
    { title: 'CVE Tipo Beneficiario', dataIndex: 'cve_tipo_beneficiario' },
    { title: 'CVE Tipo Beneficio', dataIndex: 'cve_tipo_beneficio' },
    { title: 'Cantidad de Apoyo', dataIndex: 'cantidad_apoyo' },
    { title: 'Tipo de Vialidad', dataIndex: 'tipo_vial' },
    { title: 'Nombre de Vialidad', dataIndex: 'nom_vial' },
    { title: 'Número Interior (Numérico)', dataIndex: 'num_int_num' },
    { title: 'Número Interior (Alfabético)', dataIndex: 'num_int_alf' },
    { title: 'Nombre de Localidad', dataIndex: 'nom_loc' },
    { title: 'CVE Localidad', dataIndex: 'cve_loc' },
    { title: 'Nombre de Municipio', dataIndex: 'nom_mun' },
    { title: 'CVE Municipio', dataIndex: 'cve_mun' },
    { title: 'Nombre de Entidad', dataIndex: 'nom_ent' },
    { title: 'CVE Entidad', dataIndex: 'cve_ent' },
    { title: 'Observaciones', dataIndex: 'observaciones' }
  ];

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div style={{ marginTop: '20px', padding: '0 15px' }}>
      <Form className="mb-3">
        <Form.Group className="form-group-small">
          <Form.Control
            type="text"
            placeholder="Buscar Nombre"
            value={nameFilter}
            onChange={handleNameFilterChange}
            className="form-control-small"
          />
        </Form.Group>

        <Form.Group className="form-group-small">
          <Form.Control
            type="text"
            placeholder="Buscar Programa"
            value={programFilter}
            onChange={handleProgramFilterChange}
            className="form-control-small"
          />
        </Form.Group>

        <Form.Group className="form-group-small">
          <Form.Control
            type="text"
            placeholder="Buscar Dependencia"
            value={dependenciaFilter}
            onChange={handleDependenciaFilterChange}
            className="form-control-small"
          />
        </Form.Group>

        <div className="button-container mt-3">
          <Button
            className={`btn-custom-${buttonColor}`}
            onClick={() => {
              handleSearch();
              handleButtonClick();
            }}
          >
            Buscar
          </Button>
          <Button
            className={`btn-custom-${buttonColor === 'primary' ? 'secondary' : 'primary'}`}
            onClick={() => {
              handleClearFilters();
              handleButtonClick();
            }}
          >
            Limpiar Filtros
          </Button>
        </div>
      </Form>
      <div className="table-container table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.dataIndex}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(item => (
              <tr key={item.id}>
                {columns.map(col => (
                  <td key={col.dataIndex}>{item[col.dataIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="pagination-container">
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default DataTable;
