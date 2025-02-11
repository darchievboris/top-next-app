import { Htag } from '@/components';
import { JSX } from 'react';
import { withLayout } from '@/Layout/Layout';

export function Error500(): JSX.Element {
	return (
		<>
			<Htag tag="h1">Ошибка 500</Htag>
		</>
	);
}

export default withLayout(Error500);