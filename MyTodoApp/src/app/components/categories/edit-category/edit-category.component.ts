import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Color } from 'src/app/models/color.model';
import { CategoryService } from 'src/app/services/category.service';
import { COLORS } from 'src/color-data';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  colors: Color[] = COLORS;

  category:any = new Category();
categorySub !: Subscription;


  constructor(private categoryService: CategoryService ,
              private router: Router,
              private routeId: ActivatedRoute) { }

  ngOnInit() {
    this.categorySub = this.categoryService.categorySubject
                      .subscribe(
                        (value:any )=>{
                          this.category = value
                        },
                        (error)=>{
                          console.log("une erreur: "+error)},
                        ()=>{
                          console.log('observable complété!')})

      const idGet = this.routeId.snapshot.params['id']


this.categoryService.getCategoryByIdToServer(idGet);
    }



  onUpdateCatgToServer(i:string, category:Category){
    this.categoryService.onUpdateCatgToServer(i,category);
    this.router.navigate(["categories"])
  }
}
