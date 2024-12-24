import { JSX } from 'react';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.css'
import cn from 'classnames';
import { format } from 'date-fns';


export const Footer = ({className,...props}: FooterProps) : JSX.Element  => {
  return (
		<footer {...props} className={cn(className, styles.footer)}>
			<div>OwlTop © 2024 - {format(new Date(),'yyyy')} Все права защищены</div>
			<a href='#'>Пользовательское соглашение</a>
			<a href='#'>Политика конфиденциальности</a>
		</footer>
	);
}; 