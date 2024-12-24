import { Button, Htag, P, Rating, Tag } from '@/components';
import { MenuItem } from '@/interfaces/menu.interface';
import { withLayout } from '@/Layout/Layout';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { JSX, useState } from 'react';

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);
	return (
		<>
			<Htag tag='h1'>Заголовок 1 уровня</Htag>
			<Button appearance='primary' className='' arrow='down'>
				Добавить
			</Button>
			<Button appearance='ghost' arrow='right'>
				Заказать
			</Button>

			<P size='large'>
				Выше указаны программы Adobe InDesign, Adobe Illustrator, Corel Draw и ими можно успешно
				пользоваться дома или в дороге. Современные ноутбуки хорошо справляются с нагрузкой, так
				зачем загонять специалиста в душный офис. В этой профессии важным считается вдохновение,
				поэтому дизайнеры ищут его в разных местах.
			</P>
			<P size='medium'>
				Студенты освоят не только hard skills, необходимые для работы веб-дизайнером, но и soft
				skills — навыки, которые позволят эффективно взаимодействовать в команде с менеджерами,
				разработчиками и маркетологами. Выпускники факультета могут успешно конкурировать с
				веб-дизайнерами уровня middle.
			</P>
			<P size='small'>
				Напишу сразу в двух курсах, так как проходил оба. Java будет многим непросвещённым
				сложновата в изучении, но здесь перевес из-за лидирующего положения языка как самого
				популярного в программировании. Выбор мой пал на эту профессию еще и потому, что
				Java-разработчики получают самую большую зарплату. Хотя Python начинает догонять Java по
				многим моментам, но вот в крупном екоме разработке Джава все-таки остается главенствующей
				сейчас. Скажу так – полнота программы и интенсивность присуща обоим курсам GeekBrains. Хочу
				отметить, что с первого дня занятий вы приступаете к практике и получаете опыт коммерческой
				разработки уже в свое резюме. Скажу вам как прошедший это – реально помогло в
				трудоустройстве!
			</P>
			<Tag color='primary' size='m'>
				Test 1
			</Tag>
			<Tag color='ghost' size='m'>
				Test 2
			</Tag>
			<Tag color='red' size='m'>
				Test 3
			</Tag>
			<Tag color='grey' size='s'>
				Test 4
			</Tag>
			<Tag color='green' size='m'>
				Test 5
			</Tag>
			<Tag href='#' color='green' size='m'>
				link
			</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
			<ul>
				{menu.map(m => (
					<li key={m._id.secondCategory}>{m._id.secondCategory}</li>
				))}
			</ul>
		</>
	);
}
export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{
			firstCategory
		}
	);
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
