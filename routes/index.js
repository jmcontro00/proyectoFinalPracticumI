const { Router } = require('express');
const router = Router();

const { getUsers, getMunicipios, getPartidos,  getElecciones, getBoleta,getBoletaGober, postVote, getBoletaPresRep, getEleccion, getVotos, getVotos2, getVotos3 } = require('../controller/indexConfig')

router.get('/elecciones', getUsers);
router.get('/municipios',getMunicipios);
router.get('/partidos',getPartidos);

router.get('/eleccion',getElecciones);


router.get('/boletaGober',getBoletaGober)
router.get('/boletaPresRep',getBoletaPresRep)

router.post('/boleta',postVote);
router.get('/resultados',getVotos);
router.get('/resultados2',getVotos2);
router.get('/resultados3',getVotos3);


router.post('/abrir',getEleccion);

module.exports = router;