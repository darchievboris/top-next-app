import { Htag } from '@/components';
import { JSX } from 'react';
import { withLayout } from '@/Layout/Layout';

export function Error404(): JSX.Element {
	return (
		<>
			<Htag tag="h1">Ошибка 404</Htag>
		</>
	);
}

export default withLayout(Error404);