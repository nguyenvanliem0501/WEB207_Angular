import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productDetail: any;
  id: any;
  constructor(
    private activRoute: ActivatedRoute,
    private router: Router,
    private ps: ProductService
   
  ) { }

  ngOnInit(): void {
    this.id = this.activRoute.snapshot.params['id'];
    // nếu có id đang chỉnh sửa thì mới call API lấy chi tiết, không thì thôi
    if(this.id !== undefined) {
        this.ps.getProduct(this.id).subscribe(data => {
            this.productDetail = data;
          })
    } else {
        this.productDetail = {
            name: '',
            desc: '',
            price: 0
        }
    }
  }

  onUpdate(obj: any) {
      //nhận dữ liệu từ form, tiến hành call api
      if(obj.id !== undefined) {
        this.ps.updateProduct(this.id, obj).subscribe();
      } else {
          this.ps.createProduct(obj).subscribe();
      }
   
    // tiến hành điều hướng về trang danh sách
        this.router.navigate(['/product']);
  }


}
