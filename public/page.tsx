"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';

// Interfaces para tipar los datos
interface Beneficiario {
  id_beneficiario: number;
  curp: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: string;
}

interface Beneficio {
  id_beneficio: number;
  cve_tipo_beneficio: number;
  // Otras propiedades de beneficio
}

interface Domicilio {
  id_dom_geografico: number;
  tipo_vial: string;
  nom_vial: string;
  num_int_num: number;
  num_int_alf: string;
  // Otras propiedades de domicilio
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<{
    beneficiarios: Beneficiario[];
    beneficios: Beneficio[];
    domicilios: Domicilio[];
  }>({
    beneficiarios: [],
    beneficios: [],
    domicilios: [],
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const getBeneficiarios = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sebien`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const { beneficiarios, beneficios, domicilios } = response.data;

      setData({ beneficiarios, beneficios, domicilios });
      console.log(beneficiarios)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={getBeneficiarios} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">
          Mostrar beneficiarios
        </button>
        {/* Link importado */}
        <Link href="/cargar">
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500">
            Cargar beneficiarios
          </button>
        </Link>
      </div>
      {data.beneficiarios.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">CURP</th>
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Fecha de Nacimiento</th>
                <th className="px-4 py-2 border-b">Tipo de Beneficio</th>
                <th className="px-4 py-2 border-b">Dirección</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeo de beneficiarios */}
              {data.beneficiarios.map((beneficiario) => (
                <tr key={beneficiario.id_beneficiario} className="text-center">
                  <td className="px-4 py-2 border-b">{beneficiario.curp}</td>
                  <td className="px-4 py-2 border-b">{`${beneficiario.nombre} ${beneficiario.primer_apellido} ${beneficiario.segundo_apellido}`}</td>
                  <td className="px-4 py-2 border-b">{beneficiario.fecha_nacimiento}</td>
                  <td className="px-4 py-2 border-b">
                    {/* Acceder al tipo de beneficio a través de beneficios */}
                    {data.beneficios.find(b => b.id_beneficio === beneficiario.id_beneficiario)?.cve_tipo_beneficio}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {/* Acceder a la dirección a través de domicilios */}
                    {data.domicilios.find(d => d.id_dom_geografico === beneficiario.id_beneficiario)?.tipo_vial} {data.domicilios.find(d => d.id_dom_geografico === beneficiario.id_beneficiario)?.nom_vial} {data.domicilios.find(d => d.id_dom_geografico === beneficiario.id_beneficiario)?.num_int_num} {data.domicilios.find(d => d.id_dom_geografico === beneficiario.id_beneficiario)?.num_int_alf}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  );
};

export default Dashboard;

