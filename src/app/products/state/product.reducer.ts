import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import * as ProductActions from './product.actions';

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
	}),
	on(ProductActions.updateProductSuccess, (state, action): IProductState => {
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
	on(ProductActions.updateProductFailure, (state, action): IProductState => {
		return {
			...state,
			error: action.error
		}
	})
);