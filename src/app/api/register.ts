// pages/api/register.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface FormData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  number: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, lastname, email, password, number }: FormData = req.body;

      // Aquí puedes hacer la lógica para registrar el usuario
      // Ejemplo de solicitud a una API externa (descomentar si es necesario)
     const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, { name, lastname, email, password, number });

      // Simulando una respuesta exitosa
      res.status(200).json({ message: 'Registro exitoso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el registro' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
