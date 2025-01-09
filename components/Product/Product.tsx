import {ForwardedRef, forwardRef, JSX, KeyboardEvent, useRef, useState} from 'react';
import {ProductProps} from './Product.props';
import styles from './Product.module.css'
import cn from 'classnames';
import {Button, Card, Divider, Rating, Review, ReviewForm, Tag} from "@/components";
import {declOfNum, priceRu} from "@/helpers/helpers";
import Image from 'next/image';
import {motion} from "framer-motion";

export const Product = motion(forwardRef(({product}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);
    const variants = {
        hidden: {opacity: 0, height: 0},
        visible: {opacity: 1, height: 'auto'},
    }
    const scrollToReviewKey = (key: KeyboardEvent) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault();
            scrollToReview()
        }
    }
    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        reviewRef.current?.focus()
    }

    return (
        <>
            <Card className={styles.product} ref={ref}>
                <div className={styles.logo}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>

                <div className={styles.title}>{product.title}</div>

                <div className={styles.price}>
                    <span><span className={styles.visuallyHidden}>цена</span>{priceRu(product.price)}</span>
                    {product.oldPrice && <Tag
                        className={styles.oldPrice}
                        color="green">
                        <span className={styles.visuallyHidden}>скидка</span>
                        {priceRu(product.price - product.oldPrice)}
                    </Tag>}
                </div>

                <div className={styles.credit}>
                    <span className={styles.visuallyHidden}>кредит</span>
                    {priceRu(product.credit)}/<span className={styles.month}>мес</span>
                </div>

                <div className={styles.rating}>
                    <span className={styles.visuallyHidden}>
                        {'рейтинг ' + (product.reviewAvg ?? product.initialRating)}
                    </span>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>

                <div className={styles.tags}>{product.categories.map(c => <Tag key={c} className={styles.category}
                                                                               color='ghost'>{c}</Tag>)}</div>
                <div className={styles.priceTitle} aria-hidden={true}>цена</div>
                <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
                <div className={styles.rateTitle}>
                    <a href="#ref" onClick={scrollToReview} onKeyDown={scrollToReviewKey}>
                        {product.reviewCount} {declOfNum(product.reviewCount)}
                    </a>
                </div>
                <Divider className={styles.hr}/>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div className={styles.characteristics} key={c.name}>
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && <div className={styles.advantages}>
                        <div className={styles.advTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>
                <Divider className={cn(styles.hr, styles.hr2)}/>
                <div className={styles.actions}>
                    <Button appearance='primary'>Узнать подробнее</Button>
                    <Button appearance='ghost'
                            arrow={isReviewOpened ? 'down' : 'right'} className={styles.reviewButton}
                            onClick={() => setIsReviewOpened(!isReviewOpened)}>Читать отзывы</Button>
                </div>
            </Card>
            <motion.div
                animate={isReviewOpened ? 'visible' : 'hidden'}
                variants={variants}
                initial="hidden"
                style={{pointerEvents: isReviewOpened ? 'auto' : 'none'}}
            >
                <Card ref={reviewRef} color="grey" className={styles.review} tabIndex={isReviewOpened ? 0 : -1}>
                    {product.reviews.map(r => (
                        <div key={r._id}>
                            <Review review={r}/>
                            <Divider/>
                        </div>
                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
                </Card>
            </motion.div>
        </>
    )
}))