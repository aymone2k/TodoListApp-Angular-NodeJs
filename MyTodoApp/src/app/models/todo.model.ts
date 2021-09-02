export class Todo {

  constructor(//public _id: string,
              //public date = Date , date de création sera reccup par le back
              public todoName: string,
              public todoStatus: boolean= false,
              public todoDescription: string,
              public category: string,//a voir pr les relations
              public author: string,//a voir pr les relations
    ){}

}
