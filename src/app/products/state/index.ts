import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { IProductState } from './product.reducer';

export interface State extends AppState.State {
	products: IProductState;
}

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