import {firstLevelMenu} from '@/helpers/helpers';
import {MenuItem} from '@/interfaces/menu.interface';
import {TopLevelCategory, TopPageModel} from '@/interfaces/page.interface';
import {ProductModule} from '@/interfaces/product.interface';
import {withLayout} from '@/Layout/Layout';
import {TopPageComponent} from '@/page-components';
import axios from 'axios';
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {JSX} from 'react';
import {API} from "@/helpers/api";
import Head from "next/head";

function TopPage({firstCategory, page, products}: TopPageProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{page.metaTitle}</title>
                <meta name="description" content={page.metaDescription}/>
                <meta property="og:title" content={page.metaTitle}/>
                <meta property="og:description" content={page.metaDescription}/>
                <meta property="og:type" content="article"/>
            </Head>
            <TopPageComponent
                firstCategory={firstCategory}
                page={page}
                products={products}/>
        </>
    );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const firstMenu of firstLevelMenu) {
        const {data: menu} = await axios.post<MenuItem[]>(
            API.topPage.find,
            {
                firstCategory: firstMenu.id
            }
        );
        paths = paths.concat(
            menu.flatMap(m => m.pages.map(page => `/${firstMenu.route}/${page.alias}`))
        );
    }
    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
                                                                       params
                                                                   }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) return {notFound: true};

    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
    if (!firstCategoryItem) return {notFound: true};
    try {
        const {data: menu} = await axios.post<MenuItem[]>(
            API.topPage.find,
            {
                firstCategory: firstCategoryItem.id
            }
        );

        if (menu.length === 0) {
            return {notFound: true};
        }
        const {data: page} = await axios.get<TopPageModel>(
            API.topPage.byAlias + params.alias
        );

        const {data: products} = await axios.post<ProductModule[]>(
            API.product.find,
            {
                category: page.category,
                limit: 10
            }
        );
        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products
            }
        };
    } catch (error) {
        return {notFound: true};
    }
};

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModule[];
}
