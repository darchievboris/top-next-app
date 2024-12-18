import { Button, Htag, P, Rating, Tag } from '@/components';
import { JSX, useState } from 'react';

export default function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4)
	return (
		<div>
			<Htag tag='h1'>Заголовок 1 уровня</Htag>
			<Button appearance='primary' className='1231' disabled arrow='down'>
				Добавить
			</Button>
			<Button appearance='ghost' arrow='right'>
				Заказать
			</Button>
			export * from './UI/Button/Button'
			<P size='large'>
				Выше указаны программы Adobe InDesign, Adobe Illustrator, Corel Draw и
				ими можно успешно пользоваться дома или в дороге. Современные ноутбуки
				хорошо справляются с нагрузкой, так зачем загонять специалиста в душный
				офис. В этой профессии важным считается вдохновение, поэтому дизайнеры
				ищут его в разных местах.
			</P>
			<P size='medium'>
				Студенты освоят не только hard skills, необходимые для работы
				веб-дизайнером, но и soft skills — навыки, которые позволят эффективно
				взаимодействовать в команде с менеджерами, разработчиками и
				маркетологами. Выпускники факультета могут успешно конкурировать с
				веб-дизайнерами уровня middle.
			</P>
			<P size='small'>
				Напишу сразу в двух курсах, так как проходил оба. Java будет многим
				непросвещённым сложновата в изучении, но здесь перевес из-за лидирующего
				положения языка как самого популярного в программировании. Выбор мой пал
				на эту профессию еще и потому, что Java-разработчики получают самую
				большую зарплату. Хотя Python начинает догонять Java по многим моментам,
				но вот в крупном екоме разработке Джава все-таки остается главенствующей
				сейчас. Скажу так – полнота программы и интенсивность присуща обоим
				курсам GeekBrains. Хочу отметить, что с первого дня занятий вы
				приступаете к практике и получаете опыт коммерческой разработки уже в
				свое резюме. Скажу вам как прошедший это – реально помогло в
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
			<Rating rating={rating} isEditable setRating={setRating}/>

		</div>
	);
}
