import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	size?: 's' | 'm';
	href?: string;
	color?: 'ghost' | 'red' | 'green' | 'primary' | 'grey';
}
