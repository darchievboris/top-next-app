import {ForwardedRef, forwardRef, JSX} from 'react';
import {InputProps} from './Input.props';
import styles from './Input.module.css'
import cn from 'classnames';

export const Input = forwardRef(({
                                     className,
                                     error,
                                     ...props
                                 }: InputProps,
                                 ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={cn(styles.inputWrapper, className)}>
            <input className={cn(styles.input, {[styles.error]: error})} ref={ref} {...props}/>
            <span className={styles.errorMessage}>{error && error.message}</span>
        </div>
    )
});
