import {JSX, useState} from 'react';
import {ReviewFormProps} from './ReviewForm.props';
import styles from './ReviewForm.module.css'
import cn from 'classnames';
import {Button, Input, Rating, Textarea} from "@/components";
import CloseIcon from './close.svg'
import {IReviewForm, IReviewResponse} from "@/components/ReviewForm/ReviewForm.interface";
import {Controller, useForm} from "react-hook-form";
import {API} from "@/helpers/api";
import axios, {AxiosError} from "axios";

export const ReviewForm = ({productId, className, isOpened, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<IReviewForm>()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewResponse>(API.review.createDemo, {...formData, productId})
            if (data.message) {
                setIsSuccess(true)
                reset()
            } else {
                setError(`Error: ${data.message}`)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(`Error: ${e.message} || что-то пошло не так, обновите страницу`)
            }
        }
    }
    return (<form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn(styles.reviewForm, className)}
             {...props}
        >
            <Input {...register('name', {required: {value: true, message: 'Заполните имя'}})}
                   placeholder='Имя'
                   error={errors.name}
                   tabIndex={isOpened ? 0 : -1}
                   aria-invalid={errors.name ? true : false}/>

            <Input {...register('title', {required: {value: true, message: 'Зполните заголовок'}})}
                   error={errors.title}
                   placeholder='Заголовок отзыва' className={styles.title}
                   tabIndex={isOpened ? 0 : -1}
                   aria-invalid={errors.title ? true : false}/>

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
                      className={styles.description}
                      tabIndex={isOpened ? 0 : -1}
                      aria-label='Текст отзыва'
                      aria-invalid={errors.description ? true : false}/>

            <div className={styles.submit}>
                <Button appearance="primary" tabIndex={isOpened ? 0 : -1}
                        onClick={() => clearErrors()}>Отправить</Button>
                <span
                    className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
        </div>
        {isSuccess && <div
            className={cn(styles.success, styles.panel)}
            role="alert">
            <div className={styles.successTitle}>
                Ваш отзыв отправлен
            </div>
            <div>
                Спасибо, ваш отзыв будет опубликован после проверки.
            </div>
            <button
                onClick={() => setIsSuccess(false)}
                className={styles.close}
                aria-label="Закрыть оповещение">
                <CloseIcon/>
            </button>
        </div>}
        {error && <div
            className={cn(styles.error, styles.panel)}
            role="alert">

            Что-то пошло не так, попробуйте обновить страницу

            <button
                onClick={() => setError(undefined)}
                className={styles.close}
                aria-label="Закрыть оповещение">
                <CloseIcon/>
            </button>
        </div>}
    </form>)
}