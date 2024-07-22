// interfaces.ts

export interface Beneficiario {
    id_beneficiario_cecan: number,
    curp: string;
    primer_apellido: string;
    segundo_apellido: string;
    nombre: string;
    fecha_nacimiento: string;
    cve_ent_nac: string;
    sexo: string;
    discapacidad: string;
    indigena: string;
    cve_civil: string;
    beneficios?: Beneficio[]; 
    domicilios?: Domicilio[]; 
  }
  
  export interface Beneficio {
    id_beneficio: number;
    cve_dependencia: string;
    cve_institucion: string;
    cve_programa: string;
    cve_intra_programa: string;
    cve_ent_fed: string;
    cve_municipio: string;
    cve_localidad: string;
    fecha_beneficio: string;
    cve_tipo_beneficiario: string;
    cve_tipo_beneficio: string;
    cantidad_apoyo: string;
  }
  
  export interface Domicilio {
    id: number;
    tipo_vial: string;
    nom_vial: string;
    num_int_num: string;
    num_int_alf: string;
    nom_loc: string;
    cve_loc: string;
    nom_mun: string;
    cve_mun: string;
    nom_ent: string;
    cve_ent: string;
    observaciones: string;
  }