import {JSX} from 'react';
import {ReviewFormProps} from './ReviewForm.props';
import styles from './ReviewForm.module.css'
import cn from 'classnames';
import {Button, Input, Rating, Textarea} from "@/components";
import CloseIcon from './close.svg'
import {IReviewForm} from "@/components/ReviewForm/ReviewForm.interface";
import {Controller, useForm} from "react-hook-form";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IReviewForm>()
    const onSubmit = (data: IReviewForm) => {
        console.log('submit', data)
    }
    return (<form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn(styles.reviewForm, className)}
             {...props}
        >
            <Input {...register('name', {required: {value: true, message: 'Заполните имя'}})}
                   placeholder='Имя'
                   error={errors.name}/>

            <Input {...register('title', {required: {value: true, message: 'Зполните заголовок'}})}
                   error={errors.title}
                   placeholder='Заголовок отзыва' className={styles.title}/>
            <div className={styles.rating}>
                <span>Оценка:</span>
                <Controller
                    control={control}
                    name="rating"
                    rules={{required: {value: true, message: 'Укажите рейтинг'}}}
                    render={({field}) => (
                        <Rating isEditable setRating={field.onChange} rating={field.value} error={errors.rating}/>)}/>
            </div>
            <Textarea {...register('description', {required: {value: true, message: 'Заполните описание'}})}
                      error={errors.description}
                      placeholder='Текст отзыва'
                      className={styles.description}/>
            <div className={styles.submit}>
                <Button appearance="primary">Отправить</Button>
                <span
                    className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
        </div>
        <div className={styles.success}>
            <div className={styles.successTitle}>Ваш отзыв отправлен</div>
            <div>
                Спасибо, ваш отзыв будет опубликован после проверки.
            </div>
            <CloseIcon className={styles.close}/>
        </div>
    </form>)
}