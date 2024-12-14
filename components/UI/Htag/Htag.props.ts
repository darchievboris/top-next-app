import { ReactElement } from "react";

export interface HtagProps{
	tag: 'h1' | 'h2' | 'h3',
	children: ReactElement
}