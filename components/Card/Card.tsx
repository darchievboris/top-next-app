import {ForwardedRef, forwardRef, JSX} from 'react';
import {CardProps} from './Card.props';
import styles from './Card.module.css'
import cn from 'classnames';

export const Card = forwardRef(({
                                    color = 'white',
                                    children,
                                    className,
                                    ...props
                                }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (<div ref={ref} className={cn(styles.card, className,
        {[styles.gray]: color == 'grey'}
    )}
                 {...props}>
        {children}
    </div>);
});