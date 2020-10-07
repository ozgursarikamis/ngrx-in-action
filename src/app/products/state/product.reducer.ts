import { createAction, createReducer, on } from '@ngrx/store';
import { Product } from '../product';

import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
	products: IProductState;
}

export interface IProductState {
	showProductCode: boolean;
	currentProduct: Product;
	products: Product[]
}

export const productReducer = createReducer<IProductState>(
	{ showProductCode: true } as IProductState, 
	on(createAction('[Product] Toggle Product Code'), (state): IProductState => {
		console.log('original state :>> ', JSON.stringify(state));
		return {
			// showProductCode: !state.showProductCode // Not correct
			...state,
			showProductCode: !state.showProductCode
		}
	})
);