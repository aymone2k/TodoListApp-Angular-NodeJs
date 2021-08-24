import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = environment.api;
  today = new Date();
  categories : Category[]=[];
  categoriesSubject = new Subject<Category[]>();
  categorySubject = new Subject<Category>();
  category:any = new Category();


  constructor(private httpClient: HttpClient) {//injection du service httpClient
    }

  emitCategories():void{//met les données dans notre observable à chaq changement de données
      this.categoriesSubject.next(this.categories);
      }



  addCategory(categoryName: string, categoryColor: string): void{
 /*   const category ={
        categoryName: "",
        categoryColor: "white",
        };
      category.categoryName = categoryName;
      category.categoryColor = categoryColor;
      this.categories.push(category);
      this.emitCategories(); */
   }

  addCategoryToServer(categoryName: string, categoryColor:string):void{
    const category ={
       categoryName: "",
       categoryColor: "white",
       };
    category.categoryName = categoryName;
    category.categoryColor = categoryColor;

    this.httpClient
      .put(this.api+'/categoryTodo/', category)
      .subscribe(
        ()=>{
          console.log("enregistrement terminé")},
        (error)=>{
          console.log('Erreur:'+error)}
      )
    this.emitCategories();
    }

  getCategoriesToServer():void{
    this.httpClient
      .get<Category[]>(this.api+'/categoryTodo/')
      .subscribe(
        (categoriesReccup: Category[])=>{
          this.categories = categoriesReccup;
          this.emitCategories();},
        (error)=>{
          console.log("erreur:"+ error);},
        ()=>{
          console.log("reccupération des données terminée")})
   }


  getCategoryByIdToServer(id: string){
     this.httpClient
     .get(this.api+'/categoryTodo/'+id)
     .subscribe(
        (catReccup: any)=>{

         this.category = catReccup,
         this.categorySubject.next(this.category);;

        },
         (error)=>{
           console.log(error)
         },
         ()=>{
          console.log("reccupération des données terminée")
         }

     )

  }

  onUpdateCatgToServer(i: string, category:Category):void{
    this.httpClient
    .put(this.api+'/categoryTodo/'+i, category)
    .subscribe(
      ()=>{
        console.log("enregistrement terminé")
        this.categorySubject.next(this.category)},
      (error)=>{
        console.log('Erreur:'+error)}
    )
  //this.emitCategories();
  }

}
