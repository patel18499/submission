import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url: string = 'http://localhost:3000/productArr';
  productsArr: any = [];
  quantity: any = [
    {'qun':0}
  ]
  cateArr:any = [];
  selectedQun: any;
  oneProduct: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fnGetProducts();
    this.quantity.qun = 0;
  }

  fnGetProducts() {
    this.http.get(this.url)
    .subscribe((data: any)=> {
      this.productsArr = data;
    console.log(this.productsArr)
    });
   }

   fnDecrease(item, i) {
    this.quantity.qun -= 1;
    this.selectedQun = this.quantity.qun;
  }

  fnIncrease(item, i) {
    this.quantity.qun += 1;
    this.selectedQun = this.quantity.qun;
  }

  /**
    * get local format number
    * @param val
    */
   public fnGetLocalFormat(val) {
    if (val) {
      const n = parseFloat(val);
      return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    else return null;
  }

  fnProduct(prod) {
    console.log('c',prod)
    this.router.navigate(['/product',prod])
  }

  fnAddProduct(prod) {
    this.oneProduct = prod;
  }

}
