import qs from 'qs';
import axios from 'utils/axios';

export const SolicitaGeracao = async ( id_simul_etapa, id_empresa, id_usuario, dt_periodo, nr_cnpj, nm_method, nm_procedure1, nm_procedure2, id_orgao, id_projeto, id_modulo ) => {
  var formData = {
    id_simul_etapa: id_simul_etapa,
    id_empresa: id_empresa,
    id_usuario: id_usuario,
    dt_periodo: dt_periodo,
    nr_cnpj: nr_cnpj,
    nm_method: nm_method,
    nm_procedure1: nm_procedure1,
    nm_procedure2: nm_procedure2,
    id_orgao: id_orgao,
    id_modulo: id_modulo,
    id_projeto: id_projeto,
  }

  return await axios.post(
    '/api/v1/gerar/cat', 
    qs.stringify(formData), 
    {
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`
      }
    }
  );
}