import {ForwardedRef, forwardRef, JSX, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {RatingProps} from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './Star.svg';

export const Rating = forwardRef(({
                                      isEditable = false,
                                      rating,
                                      setRating,
                                      error,
                                      tabIndex,
                                      ...props
                                  }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [arrayRating, setArrayRating] = useState(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    const constructRating = (currentRating: number) => {
        function changeDisplay(i: number) {
            if (!isEditable) return;
            constructRating(i);
        }

        function handleClick(i: number) {
            if (!isEditable || !setRating) return;
            setRating(i);
        }

        function handleKey(e: KeyboardEvent) {
            if (!isEditable || !setRating) return;
            if (!rating) {
                e.preventDefault();
                setRating(1)
            } else {
                if (e.code == "ArrowUp" || e.code == "ArrowRight") {
                    e.preventDefault();
                    setRating(rating < 5 ? rating + 1 : 5)
                    ratingArrayRef.current[rating]?.focus();
                }
                if (e.code == "ArrowDown" || e.code == "ArrowLeft") {
                    e.preventDefault();
                    setRating(rating > 1 ? rating - 1 : 1)
                    ratingArrayRef.current[rating - 2]?.focus();
                }
            }
        }

        const computeFocus = (r: number, i: number): number => {
            if (!isEditable) return -1;
            if (!rating && i == 0) return tabIndex ?? 0;
            if (r == i + 1) return tabIndex ?? 0;
            return -1;
        };

        const updatedArray = arrayRating.map((r: JSX.Element, i: number) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => handleClick(i + 1)}
                    tabIndex={computeFocus(rating, i)}
                    onKeyDown={handleKey}
                    ref={(r): void => {
                        ratingArrayRef.current?.push(r)
                    }}

                    role={isEditable ? 'slider' : ''}
                    aria-invalid={error ? true : false}
                    aria-valuenow={rating}
                    aria-valuemax={5}
                    aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
                    aria-valuemin={1}
                >
					<StarIcon/>
				</span>
            );
        });
        setArrayRating(updatedArray);
    };

    useEffect(() => {
        constructRating(rating);
    }, [rating, tabIndex]);


    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {arrayRating.map((r: JSX.Element, i: number) => (
                <span key={i}>{r}</span>
            ))}
            {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});
