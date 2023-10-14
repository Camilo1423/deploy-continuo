import { ContainerBuilder } from "node-dependency-injection";
import { LisenRepository } from "./repository/Lisen.repository";
import { DockerMethods } from "./repository/Docker.repository";
import { LisenCreate } from "../Application/UserApplication/lisen.create";
import { LisenCtrl } from "./controllers/lisen.ctrl";

const container = new ContainerBuilder();

/**
 * Inicamos servicio de WS
 */
container.register("docker.methods", DockerMethods);
const dockerDependency = container.get("docker.methods")

container.register("lisen.mongo", LisenRepository).addArgument(dockerDependency);
const lisenMongo = container.get("lisen.mongo");

container.register("lisen.creator", LisenCreate).addArgument(lisenMongo);
const lisenCreator = container.get("lisen.creator")

container.register("lisen.ctrl", LisenCtrl).addArgument(lisenCreator);

export default container;
