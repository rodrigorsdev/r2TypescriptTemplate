export class Response {
    constructor(
        public message: string,
        public success: boolean,
        public data: any,
        public error: any
    ) { }
}