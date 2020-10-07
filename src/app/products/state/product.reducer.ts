import { createAction, createReducer, on } from '@ngrx/store';

export const productReducer = createReducer(
	{ showProductCode: true }, 
	on(createAction('[Product] Toggle Product Code'), state => {
		console.log('original state :>> ', JSON.stringify(state));
		return {
			// showProductCode: !state.showProductCode // Not correct
			...state,
			showProductCode: !state.showProductCode
		}
	})
);