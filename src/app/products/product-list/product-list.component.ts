import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';

import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  products: Product[];
  products$: Observable<Product[]>;

  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
	//? BEFORE EFFECTS:
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
	// });

	//? AFTER EFFECTS:
	this.products$ = this.store.select(getProducts);

	this.errorMessage$ = this.store.select(getError);
	
	this.store.dispatch(ProductActions.loadProducts());
	
	//* TODO Unsubscribe done:
	this.selectedProduct$ = this.store.select(getCurrentProduct);
	
	//* TODO Unsubscribe done:
	this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
	this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
	// this.productService.changeSelectedProduct(this.productService.newProduct());
	this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
	// this.productService.changeSelectedProduct(product);
	this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
