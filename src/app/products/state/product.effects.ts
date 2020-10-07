import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
	constructor(private actions$: Actions, private service: ProductService) {}

	loadProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.loadProducts),
			mergeMap(() => this.service.getProducts().pipe(
				map(products => ProductActions.loadProductsSuccess({ products }))
			))
		);
	});
}