import {ProductModule} from '@/interfaces/product.interface';
import {SortEnum} from './Sort.props';

export type SortAction = { type: SortEnum.Price } | { type: SortEnum.Rating } | {
    type: 'reset',
    initialState: ProductModule[]
};

export interface SortReducerState {
    sort: SortEnum;
    products: ProductModule[];
}

export const sortReducer = (state: SortReducerState, action: SortAction): SortReducerState => {
    switch (action.type) {
        case SortEnum.Rating:
            return {
                sort: SortEnum.Rating,
                products: state.products.sort((a, b) => (a.initialRating > b.initialRating ? -1 : 1))
            };
        case SortEnum.Price:
            return {
                sort: SortEnum.Price,
                products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1))
            };
        case 'reset':
            return {
                sort: SortEnum.Rating,
                products: action.initialState
            }
        default:
            throw new Error('Неверный тип сортировки ');
    }
};
