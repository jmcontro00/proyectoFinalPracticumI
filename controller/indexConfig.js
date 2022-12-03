const { pool } = require('../dbConfig');

const getMunicipios = async(req, res) => {
    const response = await pool.query('SELECT municipio_nombre,municipio_id FROM schema2.municipios');
    res.send(response.rows);
};

const getPartidos = async(req, res) => {
    const response = await pool.query('SELECT partido_nombre, partido_id FROM schema2.partido');
    res.send(response.rows);
};

const getElecciones = async(req, res) => {
    const response = await pool.query('SELECT eleccion_nombre FROM schema2.elecciones');
    res.send(response.rows);
};

const getEleccion = async(req, res) => {
    const{name} = req.body;
    const{municipio} = req.body;
    state.municipio = municipio;
    console.log(state.municipio)
    const response = await pool.query('SELECT eleccion_id FROM schema2.elecciones WHERE eleccion_nombre = $1',[name])
    state.eleccion = response.rows
    res.send('Persona añadida');
}

const getBoleta = async(req, res) => {
    const {eleccion_id} = state.eleccion[0]
    const {municipio_id} = state.municipio
    console.log(eleccion_id)
    console.log(municipio_id)
    const response = await pool.query('SELECT candidato_id, municipio_id, candidato_nombre, partido_id, puesto_id FROM schema2.candidato WHERE puesto_id = $1 AND eleccion_id = $2',[1,eleccion_id])
    res.send(response.rows);
    console.log(response.rows)
}

const getBoletaGober = async(req, res) => {
    const {eleccion_id} = state.eleccion[0]
    const response = await pool.query('SELECT candidato_id, candidato_nombre, partido_id, puesto_id FROM schema2.candidato WHERE puesto_id = $1 AND eleccion_id = $2',[2,eleccion_id])
    res.send(response.rows);
    console.log(response.rows)
}
const getBoletaPresRep = async(req, res) => {
    const {eleccion_id} = state.eleccion[0]
    const response = await pool.query('SELECT candidato_id, candidato_nombre, partido_id, puesto_id FROM schema2.candidato WHERE puesto_id = $1 AND eleccion_id = $2',[3,eleccion_id])
    res.send(response.rows);
    console.log(response.rows)
}
const postVote = async(req, res) => {
    const{nombreCandidato, puestoId, eleccion_id} = req.body;
    const response = await pool.query('INSERT INTO schema3.votosmun (candidato_nombre, eleccion_id, puesto_id) VALUES ($1, $2, $3)',[nombreCandidato, eleccion_id, puestoId]);
    console.log(response.rows)
};

const getVotos = async(req, res) => {
    const {eleccion_id} = state.eleccion[0]
    const response = await pool.query('SELECT candidato_nombre,COUNT(candidato_nombre) as can FROM schema2.votos WHERE eleccion_id = $1 AND puesto_id = 1 GROUP BY candidato_nombre',[eleccion_id])
    res.send(response.rows);
    console.log(response.rows)
}

const getVotos2 = async(req, res) => {
    const {eleccion_id} = state.eleccion[0]
    const response = await pool.query('SELECT candidato_nombre,COUNT(candidato_nombre) as can FROM schema2.votos WHERE eleccion_id = $1 AND puesto_id = 2 GROUP BY candidato_nombre',[eleccion_id])
    res.send(response.rows);
    console.log(response.rows)
}

const getVotos3 = async(req, res) => {
    const {eleccion_id} = state.eleccion[0]
    const response = await pool.query('SELECT candidato_nombre,COUNT(candidato_nombre) as can FROM schema2.votos WHERE eleccion_id = $1 AND puesto_id = 3 GROUP BY candidato_nombre',[eleccion_id])
    res.send(response.rows);
    console.log(response.rows)
}

const getUsers = async(req, res) => {
    const response = await pool.query('SELECT eleccion_nombre,eleccion_fecha FROM schema2.elecciones');
    res.send(response.rows);
}

module.exports = {
    getMunicipios,
    getPartidos,
    getElecciones,
    getBoleta,
    getBoletaGober,
    postVote,
    getBoletaPresRep,
    getEleccion,
    getVotos,
    getVotos2,
    getVotos3,
    getUsers
}; 


