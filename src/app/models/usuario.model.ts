
export class Usuario{

    constructor(
        public nombre:string,
        public email:string,
        public password:string,
        public  image?:string, //despues ded un opcional todos deben ser opcionales
        public role?:string,
        public google?:boolean,
        public _id?:string


    ){

    }
}