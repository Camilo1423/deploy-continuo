import { IDockerMethods } from "../../Domain/LisenExternal/Repositories/IDocker.repository";
import execa from "execa";
import ora from "ora";
import cliSpinners from "cli-spinners";
import chalk from "chalk";

export class DockerMethods implements IDockerMethods {
  async pullRepository(pathRepo: string): Promise<boolean> {
    console.log(pathRepo)
    const spinner = ora({
      text: chalk.yellowBright("Actualizando repositorio..."),
      spinner: cliSpinners.binary,
    }).start();
    try {
      const { stdout } = await execa(
        "git",
        ["pull", "origin", "main", "--rebase"],
        { cwd: pathRepo }
      );
      this.spacesPrint(stdout);
      spinner.succeed(chalk.green("Repositorio actualizado :D")); 
      return true;
    } catch (error) {
      console.log(error)
      spinner.fail(chalk.red("Error en el proceso x_x")); 
      return false;
    }
  }
  async deleteImage(imageName: string): Promise<boolean> {
    const spinner = ora({
      text: chalk.red("Borrando imagen docker..."),
      spinner: cliSpinners.binary,
    }).start();
    try {
      const { stdout } = await execa("docker", ["image", "rm", imageName]);
      this.spacesPrint(stdout);
      spinner.succeed(chalk.green("Imagen borrada :D")); 
      return true;
    } catch (error) {
      spinner.fail(chalk.red("Error en el proceso x_x")); 
      return false;
    }
  }
  async existImage(imageName: string): Promise<boolean> {
    const spinner = ora({
      text: chalk.yellowBright("Buscando imagen docker..."),
      spinner: cliSpinners.binary,
    }).start();
    try {
      const { stdout } = await execa("docker", ["images"]);
      this.spacesPrint(stdout);
      if (stdout.includes(imageName)) {
        spinner.succeed(chalk.green("Imagen encontrada :D")); 
        return true;
      }
      spinner.fail(chalk.red(`No existe la imagen ${imageName} :(`)); 
      return false;
    } catch (error) {
      spinner.fail(chalk.red("Error en el proceso x_x")); 
      return false;
    }
  }
  async createImage(imageName: string, pathBuild: string): Promise<boolean> {
    const spinner = ora({
      text: chalk.yellowBright("Creando imagen docker..."),
      spinner: cliSpinners.binary,
    }).start();
    try {
      const { stdout } = await execa(
        "docker",
        ["build", "-t", imageName, "."],
        { cwd: pathBuild }
      );
      this.spacesPrint(stdout);
      spinner.succeed(chalk.green("Imagen creada :D")); 
      return true;
    } catch (error) {
      spinner.fail(chalk.red("Error en el proceso x_x")); 
      return false;
    }
  }
  async deleteContainer(containerName: string): Promise<boolean> {
    const spinner = ora({
      text: chalk.red("Borrando contenedor docker..."),
      spinner: cliSpinners.binary,
    }).start();
    try {
      const { stdout } = await execa("docker", [
        "container",
        "rm",
        "-f",
        containerName,
      ]);
      this.spacesPrint(stdout);
      spinner.succeed(chalk.green("Contenedor borrado :D")); 
      return true;
    } catch (error) {
      spinner.fail(chalk.red("Error en el proceso x_x")); 
      return false;
    }
  }
  async existContainer(containerName: string): Promise<boolean> {
    const spinner = ora({
      text: chalk.yellowBright("Buscando contenedor docker..."),
      spinner: cliSpinners.binary,
    }).start();
    try {
      const { stdout } = await execa("docker", ["ps", "-a"]);
      if (stdout.includes(containerName)) {
        spinner.succeed(chalk.green("Contenedor encontrado :D")); 
        return true;
      }
      this.spacesPrint(stdout);
      spinner.fail(chalk.red(`No existe el contenedor ${containerName} :(`)); 
      return false;
    } catch (error) {
      spinner.fail(chalk.red("Error en el proceso x_x")); 
      return false;
    }
  }
  async createContainer(commandBuild: string): Promise<boolean> {
    const spinner = ora({
      text: chalk.yellowBright("Creando contenedor docker..."),
      spinner: cliSpinners.binary,
    }).start();
    const optionsBuild = commandBuild.split(" ");
    try {
      const { stdout } = await execa("docker", optionsBuild);
      this.spacesPrint(stdout);
      spinner.succeed(chalk.green("Contenedor creado :D")); 
      return true;
    } catch (error) {
      spinner.fail(chalk.red("Error en el proceso x_x")); 
      this.spacesPrint(error);
      return false;
    }
  }

  spacesPrint(stdout: any): void {
    console.log("")
    console.log("")
    console.log(stdout)
    console.log("")
  }
}
