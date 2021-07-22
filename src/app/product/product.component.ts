import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
category: any;
productsArr: any = [];
url: string = 'http://localhost:3000/productArr';
quantity: any = [
  {'qun':0}
]
selectedQun: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.quantity.qun = 0;
    this.route.params.subscribe((data: any)=> {
      if (data && data.id) {
        this.category = data.id;
        console.log('cat',this.category);
        this.http.get(this.url)
        .subscribe((data: any)=> {
          this.productsArr = data;
          this.productsArr = this.productsArr.filter(item => item.p_category == this.category)
        console.log(this.productsArr);
        });
      }
    })

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

  fnDecrease(item, i) {
    // this.quantity.qun = item.p_availability
    this.quantity[i].qun -= 1;
    this.selectedQun = this.quantity.qun;
  }

  fnIncrease(item, i) {
    console.log('abc',i)
    // this.quantity.qun = item.p_availability
    this.quantity.qun += 1;
    console.log('abc1',this.quantity.qun)
    this.selectedQun = this.quantity.qun;
  }

}
