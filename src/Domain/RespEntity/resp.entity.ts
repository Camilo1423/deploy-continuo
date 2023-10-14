export interface RespEntity<T> {
    msg: string;
    data: T;
    status: number;
}