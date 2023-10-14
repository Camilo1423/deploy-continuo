import mongoose, {Schema} from "mongoose";

const DeploySchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true,
        },
        projectDeploy: {
            type: String,
            required: true,
        },
        timeDeploy: {
            type: String,
            required: true,
        },
        commitDeploy: {
            type: String,
            required: true,
        },
        branchDeploy: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const DeployModel = mongoose.model('deploys', DeploySchema)

export {DeployModel}