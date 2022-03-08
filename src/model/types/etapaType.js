import PropTypes from "prop-types";

const statusType = PropTypes.shape({
  CD_STATUS: PropTypes.string,
  DS_STATUS: PropTypes.string,
  DT_PERIODO: PropTypes.string,
  ID_EMPRESA: PropTypes.number,
  ID_SIMUL_ETAPA: PropTypes.number,
  ID_SIMUL_STATUS: PropTypes.number,
  ID_SIMUL_TP_STATUS: PropTypes.number,
  ID_USUARIO: PropTypes.number,
  DS_STATUS_LOG: PropTypes.string,
});

const allEtapaType = PropTypes.arrayOf(
  PropTypes.shape({
    id_simul_status: PropTypes.string,
    dt_periodo: PropTypes.string,
    id_simul_tp_status: PropTypes.string,
    cd_status: PropTypes.string,
    ds_status: PropTypes.string,
    id_simul_etapa: PropTypes.string,
    cd_etapa: PropTypes.string,
    ds_etapa: PropTypes.string,
    nm_procedure1: PropTypes.string,
    nm_procedure2: PropTypes.string,
    dt_inicial: PropTypes.string,
    dt_final: PropTypes.string,
    id_orgao: PropTypes.string,
    dm_sequencia: PropTypes.string,
    dm_acao_arquivo: PropTypes.string,
    ds_acao: PropTypes.string,
    id_empresa: PropTypes.string,
    nm_method: PropTypes.string,
    status: PropTypes.arrayOf(statusType)
  })
)

export default allEtapaType;