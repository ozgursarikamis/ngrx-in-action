import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

import { ProductApiActions, ProductPageActions } from './actions';

@Injectable()
export class ProductEffects {
	constructor(private actions$: Actions, private service: ProductService) {}

	loadProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductPageActions.loadProducts),
			mergeMap(() => this.service.getProducts().pipe(
				map(products => ProductApiActions.loadProductsSuccess({ products })),
				catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
			))
		);
	});

	updateProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductPageActions.updateProduct),
			concatMap(action => 
				this.service.updateProduct(action.product).pipe(
					map(product => ProductApiActions.updateProductSuccess({ product })),
					catchError(error => of(ProductApiActions.updateProductFailure({ error })))
				))
		);
	});
}