import { JSX } from 'react';
import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import CheckIcon from './check.svg';
import { Htag } from '..';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			<Htag tag="h2">Преимущества</Htag>

			{advantages.map(a => (
				<div key={a._id} className={styles.advantage}>
					<CheckIcon />
					<div className={styles.title}>{a.title}</div>
					<hr className={styles.vLine} />
					<div>{a.description}</div>
				</div>
			))}
		</>
	);
};
