const {Router} = require('express')
const router = Router()

const {getCxC, insertCxC, updateCxC, deleteCxC} = require('../controllers/cxc.controllers')

router.get('/CxC', getCxC)
router.post('/CxCs', insertCxC)
router.put('/CxCu', updateCxC)
router.delete('/CxCd', deleteCxC)



module.exports = router;