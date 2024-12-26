import { firstLevelMenu } from '@/helpers/helpers';
import { MenuItem } from '@/interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '@/interfaces/page.interface';
import { ProductModule } from '@/interfaces/product.interface';
import { withLayout } from '@/Layout/Layout';
import axios from 'axios';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { notFound } from 'next/navigation';
import { ParsedUrlQuery } from 'querystring';
import { JSX } from 'react';

function Course({ menu, page, products }: CourseProps): JSX.Element {
	return (
		<>
			123
			<br />
			{products && products.length}
		</>
	);
}
export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const firstMenu of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(
			process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
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

export const getStaticProps: GetStaticProps<CourseProps> = async ({
	params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) return { notFound: true };

	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) return { notFound: true };
	try {
		const { data: menu } = await axios.post<MenuItem[]>(
			process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
			{
				firstCategory: firstCategoryItem.id
			}
		);

		if (menu.length === 0) {
			return { notFound: true };
		}
		const { data: page } = await axios.get<TopPageModel>(
			process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias
		);

		const { data: products } = await axios.post<ProductModule[]>(
			process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
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
		return { notFound: true };
	}
};

interface CourseProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModule[];
}
