'use client'
import { Button, Layout, Table, Input, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Beneficiario, Beneficio } from '../../Interfaces/interfaces';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { Container } from '@mui/material';

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const FiltroBeneficiarios: React.FC = () => {
    const [data, setData] = useState<Beneficiario[]>([]);
    const [filteredData, setFilteredData] = useState<Beneficiario[]>([]);
    const [searchPrimerApellido, setSearchPrimerApellido] = useState<string>('');
    const [searchSegundoApellido, setSearchSegundoApellido] = useState<string>('');
    const [searchNombre, setSearchNombre] = useState<string>('');
    const [selectedMunicipio, setSelectedMunicipio] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<Beneficiario[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/beneficiario-general/all`);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = () => {
        const normalizedPrimerApellido = searchPrimerApellido.toLowerCase();
        const normalizedSegundoApellido = searchSegundoApellido.toLowerCase();
        const normalizedNombre = searchNombre.toLowerCase();

        const filtered = data.filter((item) =>
            item.primer_apellido.toLowerCase().includes(normalizedPrimerApellido) &&
            item.segundo_apellido.toLowerCase().includes(normalizedSegundoApellido) &&
            item.nombre.toLowerCase().includes(normalizedNombre) &&
            (selectedMunicipio ? item.beneficios?.some((beneficio) => beneficio.cve_municipio === selectedMunicipio) : true)
        );

        setFilteredData(filtered);
    };

    const handleDownload = () => {
        const dataToExport = filteredData.map(item => {
            const beneficios = item.beneficios?.map(beneficio => ({
                cve_dependencia: beneficio.cve_dependencia,
                cve_institucion: beneficio.cve_institucion,
                cve_programa: beneficio.cve_programa,
                cve_intra_programa: beneficio.cve_intra_programa,
                cve_ent_fed: beneficio.cve_ent_fed,
                cve_municipio: beneficio.cve_municipio,
                cve_localidad: beneficio.cve_localidad,
                fecha_beneficio: beneficio.fecha_beneficio,
                cve_tipo_beneficiario: beneficio.cve_tipo_beneficiario,
                cve_tipo_beneficio: beneficio.cve_tipo_beneficio,
                cantidad_apoyo: beneficio.cantidad_apoyo,
            })) || [];

            return {
                primer_apellido: item.primer_apellido,
                segundo_apellido: item.segundo_apellido,
                nombre: item.nombre,
                sexo: item.sexo,
                beneficios,
            };
        });

        const flattenedData = dataToExport.map(item => ({
            primer_apellido: item.primer_apellido,
            segundo_apellido: item.segundo_apellido,
            nombre: item.nombre,
            sexo: item.sexo,
            ...item.beneficios.reduce((acc, beneficio, index) => ({
                ...acc,
                ...Object.fromEntries(Object.entries(beneficio).map(([key, value]) => [`${key}_${index + 1}`, value])),
            }), {}),
        }));

        const headers = Object.keys(flattenedData[0]);

        const worksheet = XLSX.utils.json_to_sheet([headers, ...flattenedData], { header: headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Beneficiarios');
        XLSX.writeFile(workbook, 'datos-beneficiarios.xlsx');
    };

    const handleClearFilters = () => {
        setSearchPrimerApellido('');
        setSearchSegundoApellido('');
        setSearchNombre('');
        setSelectedMunicipio(undefined);
        setFilteredData(data);
    };

    const canDownload = filteredData.length > 0;
    const columns = [
        {
            title: 'Primer Apellido',
            dataIndex: 'primer_apellido',
            key: 'primer_apellido',
        },
        {
            title: 'Segundo Apellido',
            dataIndex: 'segundo_apellido',
            key: 'segundo_apellido',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Sexo',
            dataIndex: 'sexo',
            key: 'sexo',
        },
        {
            title: 'Cve Dependencia',
            dataIndex: 'beneficios',
            key: 'cve_dependencia',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_dependencia}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Institución',
            dataIndex: 'beneficios',
            key: 'cve_institucion',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_institucion}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Programa',
            dataIndex: 'beneficios',
            key: 'cve_programa',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_programa}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Intra programa',
            dataIndex: 'beneficios',
            key: 'cve_intra_programa',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_intra_programa}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Entidad federativa',
            dataIndex: 'beneficios',
            key: 'cve_ent_fed',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_ent_fed}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Municipio',
            dataIndex: 'beneficios',
            key: 'cve_municipio',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_municipio}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Localidad',
            dataIndex: 'beneficios',
            key: 'cve_localidad',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_localidad}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Fecha de beneficio',
            dataIndex: 'beneficios',
            key: 'fecha_beneficio',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.fecha_beneficio}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Tipo de beneficiario',
            dataIndex: 'beneficios',
            key: 'cve_tipo_beneficiario',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_tipo_beneficiario}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Tipo de beneficio',
            dataIndex: 'beneficios',
            key: 'cve_tipo_beneficio',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cve_tipo_beneficio}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Cantidad de apoyo',
            dataIndex: 'beneficios',
            key: 'cantidad_apoyo',
            render: (beneficios: Beneficio[] | undefined) => (
                <ul>
                    {beneficios?.map(beneficio => (
                        <li key={beneficio.id_beneficio}>{beneficio.cantidad_apoyo}</li>
                    ))}
                </ul>
            ),
        },
    ];

    return (
        <div>
            <Navbar />
            <Content style={{ padding: '0 50px', marginTop: 64, textAlign: 'center' }}>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={handleDownload} disabled={!filteredData.length} loading={loading}>
                        Descargar
                    </Button>
                    <Button onClick={handleSearch} style={{ marginLeft: 8}}>
                        Buscar
                    </Button>
                    <Button onClick={handleClearFilters} style={{ marginLeft: 8 }}>
                        Limpiar filtros
                    </Button>
                </div>
                <Container sx={{mb: 2}}>
                <Search
                    placeholder="Buscar por primer apellido"
                    value={searchPrimerApellido}
                    onChange={(e) => setSearchPrimerApellido(e.target.value)}
                    style={{ width: 200, marginRight: 8 }}
                />
                <Search
                    placeholder="Buscar por segundo apellido"
                    value={searchSegundoApellido}
                    onChange={(e) => setSearchSegundoApellido(e.target.value)}
                    style={{ width: 200, marginRight: 8 }}
                />
                <Search
                    placeholder="Buscar por nombre"
                    value={searchNombre}
                    onChange={(e) => setSearchNombre(e.target.value)}
                    style={{ width: 200, marginRight: 8 }}
                />
                <Select
                    placeholder="Selecciona municipio"
                    allowClear
                    style={{ width: 200, marginRight: 8 }}
                    onChange={(value) => setSelectedMunicipio(value)}
                    value={selectedMunicipio}
                >
                    <Option value="001">Acaponeta</Option>
                    <Option value="002">Ahuacatlán</Option>
                    <Option value="003">Amatlán de Cañas</Option>
                    <Option value="004">Compostela</Option>
                    <Option value="005">Huajicori</Option>
                    <Option value="006">Ixtlán del Rio</Option>
                    <Option value="007">Jala</Option>
                    <Option value="008">Xalisco</Option>
                    <Option value="009">Del Nayar</Option>
                    <Option value="010">Rosamorada</Option>
                    <Option value="011">Ruíz</Option>
                    <Option value="012">San Blas</Option>
                    <Option value="013">San Pedro Lagunillas</Option>
                    <Option value="014">Santa María del Oro</Option>
                    <Option value="015">Santigo Ixcuintla</Option>
                    <Option value="016">Tecuala</Option>
                    <Option value="017">Tepic</Option>
                    <Option value="018">Tuxpan</Option>
                    <Option value="019">La Yesca</Option>
                    <Option value="020">Bahía de Banderas</Option>
                </Select>
                </Container>
                <Table
                    columns={columns}
                    dataSource={filteredData.map(item => ({
                        ...item,
                        key: item.id_beneficiario_cecan,
                    }))}
                    scroll={{ x: 'max-content' }}
                />
            </Content>
            <Footer />
        </div>
    );
};

export default FiltroBeneficiarios;
