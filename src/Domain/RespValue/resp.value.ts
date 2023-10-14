import { RespEntity } from '../RespEntity/resp.entity';
export class RespValues<T> implements RespEntity<T> {
    msg: string;
    data: T;
    status: number;

    constructor(msg: string, data: T, status: number) {
        this.msg = msg;
        this.data = data;
        this.status = status;
    }

}