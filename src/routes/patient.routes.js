import {Router} from '../controllers/patient.controller.js'
import { PatientController } from '../controllers/patient.controller.js'
import { JwtAuthGuard } from '../middleware/jwt-auth.guard.js';
import { SelfGuard } from '../middleware/self-admin.guard.js';
import {doctorGuard} from '../middleware/doctor.guard.js';
import {AdminGuard} from '../middleware/admin.guard.js';


const router = Router()
const controller = new PatientController();

router
    .post('/signup', controller.signupPatient)
    .post('/signin', controller.signinPatient)
    .post('/token', controller.accessTokenPatient)
    .post('/signout', controller.signoutPatient)
    .get('/', JwtAuthGuard, doctorGuard, controller.getAllPatient)
    .get('/:id', JwtAuthGuard, doctorGuard, controller.getPatientById)
    .patch('/:id', JwtAuthGuard, SelfGuard, controller.updatePatentById)
    .delete('/:id', JwtAuthGuard, AdminGuard, controller.deletePatientById)


export default router
