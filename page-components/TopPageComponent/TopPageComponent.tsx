import {JSX, useEffect, useReducer} from 'react';
import {TopPageComponentProps} from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import {Advantages, HhData, Htag, Product, Sort, Tag} from '@/components';
import {TopLevelCategory} from '@/interfaces/page.interface';
import parse from 'html-react-parser';
import {SortEnum} from '@/components/Sort/Sort.props';
import {sortReducer} from '@/components/Sort/sort.reducer';

export const TopPageComponent = ({
                                     page,
                                     products,
                                     firstCategory,
                                     ...props
                                 }: TopPageComponentProps): JSX.Element => {
    const [{products: sortedProducts, sort}, dispatch] = useReducer(sortReducer, {
        products,
        sort: SortEnum.Rating
    });

    useEffect(() => {
        dispatch({type: 'reset', initialState: products})
    }, [products])

    const setSort = (sort: SortEnum) => {
        dispatch({type: sort});
    };
    return (
        <>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && (
                    <Tag color='grey' size='m' aria-label={products.length + ' элементов'}>
                        {products.length}
                    </Tag>
                )}
                <Sort sort={sort} setSort={setSort}/>
            </div>

            <div>{sortedProducts && sortedProducts.map(p => <Product layout key={p._id} product={p}/>)}</div>

            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'>
                    hh.ru
                </Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 && <Advantages advantages={page.advantages}/>}
            {page.seoText && <div className={styles.seo}>{parse(page.seoText)}</div>}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map(t => (
                <Tag key={t} color='primary'>
                    {t}
                </Tag>
            ))}
        </>
    );
};
