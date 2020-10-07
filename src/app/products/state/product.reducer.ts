import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductApiActions, ProductPageActions } from './actions';

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

export const productReducer = createReducer<IProductState>(
	initialState,
	on(ProductPageActions.toggleProductCode, (state): IProductState => {
		console.log('original state :>> ', JSON.stringify(state));
		return {
			// showProductCode: !state.showProductCode // Not correct
			...state,
			showProductCode: !state.showProductCode
		}
	}),
	on(ProductPageActions.setCurrentProduct, (state, action): IProductState => {
		return {
			...state, currentProductId: action.currentProductId
		}
	}),
	on(ProductPageActions.clearCurrentProduct, (state): IProductState => {
		return {
			...state, currentProductId: null
		}
	}),
	on(ProductPageActions.initializeCurrentProduct, (state): IProductState => {
		return {
			...state,
			currentProductId: 0
		}
	}),
	on(ProductApiActions.loadProductsSuccess, (state, action): IProductState => {
		return {
			...state,
			products: action.products,
			error: ''
		}
	}),
	on(ProductApiActions.loadProductsFailure, (state, action): IProductState => {
		return {
			...state,
			products: [],
			error: action.error
		}
	}),
	on(ProductApiActions.updateProductSuccess, (state, action): IProductState => {
		const updatedProducts = state.products.map(
			item => action.product.id === item.id ? action.product : item
		);

		return {
			...state,
			products: updatedProducts,
			currentProductId: action.product.id,
			error: ''
		}
	}),
	on(ProductApiActions.updateProductFailure, (state, action): IProductState => {
		return {
			...state,
			error: action.error
		}
	})
);