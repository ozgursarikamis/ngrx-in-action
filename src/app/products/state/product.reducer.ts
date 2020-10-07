import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';

import * as AppState from '../../state/app.state';

import * as ProductActions from './product.actions';

export interface State extends AppState.State {
	products: IProductState;
}

export interface IProductState {
	showProductCode: boolean;
	currentProduct: Product;
	products: Product[]
}

const initialState: IProductState = {
	showProductCode: true,
	currentProduct: null,
	products: []
};

const getProductFeatureState  = createFeatureSelector<IProductState>('products'); 
// 'products' comes from ProductsModule
// StoreModule.forFeature('products', productReducer)

export const getShowProductCode = createSelector(
	getProductFeatureState,
	state => state.showProductCode
);

export const getCurrentProduct = createSelector(
	getProductFeatureState,
	state => state.currentProduct
);

export const getProducts = createSelector(
	getProductFeatureState,
	state => state.products
);

export const productReducer = createReducer<IProductState>(
	initialState,
	on(ProductActions.toggleProductCode, (state): IProductState => {
		console.log('original state :>> ', JSON.stringify(state));
		return {
			// showProductCode: !state.showProductCode // Not correct
			...state,
			showProductCode: !state.showProductCode
		}
	})
);