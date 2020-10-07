import { Product } from './../product';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage: string;
  @Input() products: Product[];
  @Input() displayCode: boolean;
  @Input() selectedProduct: Product;

  @Output() displayChanged = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() productWasSelected = new EventEmitter<Product>();

  checkChanged(): void {
	  this.displayChanged.emit();
  }

  newProduct(): void {
	  this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
	  this.productWasSelected.emit(product);
  }
}
