 import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]

})
export class ProductsComponent implements OnInit {
pageTitle: string =" Products-List";

products: any= [];
filterBy: string;

showHideImg : boolean= true;

  constructor(private _productService: ProductsService ) { }


  ngOnInit() {
this._productService.getProducts().subscribe((data)=>{
  this.products=data;
});

}

toggleImage(){

this.showHideImg= !this.showHideImg;
}
ratingFnParent(data:string){
  this.pageTitle=data;

}
}