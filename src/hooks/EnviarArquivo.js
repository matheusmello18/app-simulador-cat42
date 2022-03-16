import axios from 'utils/axios';

export const EnviarArquivo = async ( id_simul_etapa, file, id_empresa, id_usuario, dt_periodo, nr_cnpj, nm_method ) => {
  var formData = new FormData();

  formData.append('id_simul_etapa', id_simul_etapa);
  formData.append('id_empresa', id_empresa);
  formData.append('id_usuario', id_usuario);
  formData.append('dt_periodo', dt_periodo);
  formData.append('nr_cnpj', nr_cnpj);
  formData.append('nm_method', nm_method);
  formData.append('arquivo', file[0]);

  return await axios.post(
    '/api/v1/etapas/upload', 
    formData, 
    {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
      }
    }
  );
}