import { Button, Htag } from '@/components';
import { JSX } from 'react';

export default function Home(): JSX.Element {
	return (
		<div>
			<Htag tag='h1'>Загаловок 1 уровня</Htag>
			<Button appearance='primary' className='1231' disabled>Добавить</Button>
			<Button appearance='ghost'>Заказать</Button>
		</div>
	);
}
