import {ForwardedRef, forwardRef, JSX} from 'react';
import TextareaProps from './Textarea.props';
import styles from './Textarea.module.css';
import cn from 'classnames';

export const Textarea = forwardRef(({className, ...props}: TextareaProps, ref:ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (<textarea className={cn(styles.textarea, className)} ref={ref} {...props} />);
});
