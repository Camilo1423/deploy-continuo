import mongoose, {Schema} from "mongoose";

const ProjectSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true,
        },
        pathProyect: {
            type: String,
            required: true,
        },
        nameImage: {
            type: String,
            required: true,
        },
        nameContainer: {
            type: String,
            required: true,
        },
        publishContainer: {
            type: String,
            required: true,
        },
        repoProvider: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        proyecto: {
            type: String,
            required: false,
            default: ""
        },
        repository: {
            type: String,
            required: true,
        },
        tokenAuthentication: {
            type: String,
            required: true,
        },
        isNewProject: {
            type: Boolean,
            required: true,
        },
        latestCommit: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ProjectModel = mongoose.model('projects', ProjectSchema)

export {ProjectModel}