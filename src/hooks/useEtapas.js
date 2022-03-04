import axios from 'utils/axios';

export const useEtapas = async ( id_empresa, dt_periodo ) => {
  const response = await axios.post('/api/v1/etapas/show', { id_empresa: id_empresa, dt_periodo: dt_periodo });
  const { success, rows } = response.data;
  if (success === "true")
    return rows;
  return null;
}