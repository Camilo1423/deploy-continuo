export interface IDockerMethods {
    pullRepository(pathRepo: string): Promise<boolean>;
    deleteImage(imageName: string): Promise<boolean>;
    existImage(imageName: string): Promise<boolean>;
    createImage(imageName: string, pathBuild: string): Promise<boolean>;
    deleteContainer(containerName: string): Promise<boolean>;
    existContainer(containerName: string): Promise<boolean>;
    createContainer(commandBuild: string): Promise<boolean>;
};