'use client';
import React, { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import * as XLSX from 'xlsx';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [previewData, setPreviewData] = useState<any[][] | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const binaryStr = event.target?.result;
                if (typeof binaryStr === 'string') {
                    const wb = XLSX.read(binaryStr, { type: 'binary' });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
                    setPreviewData(data);
                }
            };
            reader.readAsBinaryString(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setProgress(0);

        // Simular un proceso de subida
        const fakeUpload = new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        resolve();
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
        });

        await fakeUpload;

        setUploading(false);
        alert('Archivo subido con éxito');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" minHeight="100vh" p={2} >
            <Box mb={2}>
                <input
                    accept=".xlsx, .xls"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                    <Button variant="contained" component="span">
                        Seleccionar Archivo
                    </Button>
                </label>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    style={{ marginLeft: '10px' }}
                >
                    {uploading ? <CircularProgress size={24} /> : 'Subir Archivo'}
                </Button>
            </Box>
            {uploading && (
                <Box width="100%" mb={2}>
                    <LinearProgress variant="determinate" value={progress} />
                    <Box display="flex" justifyContent="center" mt={1}>
                        <span>{progress}%</span>
                    </Box>
                </Box>
            )}
            {previewData && (
                <TableContainer component={Paper} style={{ maxHeight: '100vh', maxWidth:'10000vh', overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {previewData[0].map((col, index) => (
                                    <TableCell key={index}>{col}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {previewData.slice(1).map((row, index) => (
                                <TableRow key={index}>
                                    {row.map((cell, cellIndex) => (
                                        <TableCell key={cellIndex}>{cell}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default FileUpload;
