import {ForwardedRef, forwardRef, JSX, KeyboardEvent, useEffect, useState} from 'react';
import {RatingProps} from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './Star.svg';

export const Rating = forwardRef(({
                                      isEditable = false,
                                      rating,
                                      setRating,
                                      error,
                                      ...props
                                  }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [arrayRating, setArrayRating] = useState(new Array(5).fill(<></>));
    const constructRating = (currentRating: number) => {
        function changeDisplay(i: number) {
            if (!isEditable) return;
            constructRating(i);
        }

        function handleClick(i: number) {
            if (!isEditable || !setRating) return;
            setRating(i);
        }

        function handleSpace(i: number, e: KeyboardEvent<SVGAElement>) {
            if (e.code != 'Space' || !setRating) return;
            setRating(i);
        }

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
                >
					<StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
                    />
				</span>
            );
        });
        setArrayRating(updatedArray);
    };

    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {arrayRating.map((r: JSX.Element, i: number) => (
                <span key={i}>{r}</span>
            ))}
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});
