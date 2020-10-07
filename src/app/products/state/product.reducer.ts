import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';

import * as AppState from '../../state/app.state';

import * as ProductActions from './product.actions';

export interface State extends AppState.State {
	products: IProductState;
}

export interface IProductState {
	showProductCode: boolean;
	currentProductId: number | null;
	products: Product[],
	error: string;
}

const initialState: IProductState = {
	showProductCode: true,
	currentProductId: null,
	products: [],
	error: ''
};

const getProductFeatureState  = createFeatureSelector<IProductState>('products'); 
// 'products' comes from ProductsModule
// StoreModule.forFeature('products', productReducer)

export const getShowProductCode = createSelector(
	getProductFeatureState,
	state => state.showProductCode
);

export const getCurrentProductId = createSelector(
	getProductFeatureState,
	state => state.currentProductId
);

export const getCurrentProduct = createSelector(
	getProductFeatureState,
	getCurrentProductId,
	(state, currentProductId) => {
		if (currentProductId === 0) { // new product is being defined
			return {
				id: 0, productName: '', productCode: 'New',
				description: '', starRating: 0
			}
		} else {
			return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
		}
	}
);

export const getProducts = createSelector(
	getProductFeatureState,
	state => state.products
);

export const getError = createSelector(
	getProductFeatureState,
	state => state.error
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
	}),
	on(ProductActions.setCurrentProduct, (state, action): IProductState => {
		return {
			...state, currentProductId: action.currentProductId
		}
	}),
	on(ProductActions.clearCurrentProduct, (state): IProductState => {
		return {
			...state, currentProductId: null
		}
	}),
	on(ProductActions.initializeCurrentProduct, (state): IProductState => {
		return {
			...state,
			currentProductId: 0
		}
	}),
	on(ProductActions.loadProductsSuccess, (state, action): IProductState => {
		return {
			...state,
			products: action.products,
			error: ''
		}
	}),
	on(ProductActions.loadProductsFailure, (state, action): IProductState => {
		return {
			...state,
			products: [],
			error: action.error
		}
	})
);