import { Router } from "express";
import container from "../container";
import { LisenCtrl } from "../controllers/lisen.ctrl";
const router: Router = Router();
/**
 * Api para la administracion de clientes
 */
const lisenCtrl: LisenCtrl = container.get("lisen.ctrl");

router.get('/', lisenCtrl.getProjects)
router.get('/deploys', lisenCtrl.getDeploys)
router.post('/create', lisenCtrl.createProject)
router.post('/delete', lisenCtrl.deleteProject)

export { router };