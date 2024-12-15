import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement> {
	appearance: 'primary' | 'ghost';
	children: ReactElement;
}