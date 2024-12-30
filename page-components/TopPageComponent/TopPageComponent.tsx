import { JSX } from 'react';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { Advantages, HhData, Htag, P, Tag } from '@/components';
import { TopLevelCategory } from '@/interfaces/page.interface';
import parse from 'html-react-parser';

export const TopPageComponent = ({
	page,
	products,
	firstCategory,
	...props
}: TopPageComponentProps): JSX.Element => {
	return (
		<>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && (
					<Tag color='grey' size='m'>
						{products.length}
					</Tag>
				)}
				<span>Sort</span>
			</div>

			<div>{products && products.map(p => <div key={p._id}>{p.title}</div>)}</div>

			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>
					hh.ru
				</Tag>
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && <Advantages advantages={page.advantages} />}
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
