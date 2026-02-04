'use client'

import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { postComment } from '@/api'
import { CustomButton, CustomInput, CustomTextArea, Paragraph } from '@/components'

import type { FormInputs } from './Form.interfaces'
import styles from './Form.module.scss'

function Form() {
	const {
		register,
		reset,
		handleSubmit,
		clearErrors,

		formState: { errors, isSubmitSuccessful, isSubmitted, isValidating },
	} = useForm<FormInputs>({ defaultValues: { comment: '', name: '' } })

	const [serverMessage, setServerMessage] = useState('')

	const onSubmit = async (formData: FormInputs) => {
		const resp = await postComment(formData)
		reset()

		setServerMessage(resp.message)
	}

	useEffect(() => {
		if (isValidating) setServerMessage('')
	}, [isValidating])

	useEffect(() => {
		const timer = setTimeout(() => clearErrors(), 3000)

		return () => clearTimeout(timer)
	}, [clearErrors])

	return (
		<form
			className={styles['form']}
			onSubmit={handleSubmit(onSubmit)}>
			{isSubmitted && Boolean(serverMessage) && (
				<div className={cn(styles.panel, isSubmitSuccessful ? styles.panel__success : styles.panel__error)}>
					<Paragraph appearance="l">{serverMessage}</Paragraph>
					<CustomButton
						className={styles['panel__btn']}
						onClick={() => {
							reset()
						}}>
						reset form
					</CustomButton>
				</div>
			)}
			<CustomInput
				{...register('name', { required: { message: 'You forget type your name', value: true } })}
				placeholder="Имя"
				style={{ backgroundColor: errors.name ? 'var(--accent)' : 'white' }}
			/>
			{errors.name && <Paragraph appearance="s">{errors.name.message}</Paragraph>}
			<CustomTextArea
				{...register('comment', {
					required: { message: 'Please add comment', value: true },
					minLength: { value: 15, message: 'At least 15 symbols' },
					maxLength: { value: 200, message: 'max comment length are 200 symbols' },
				})}
				style={{ backgroundColor: errors.comment ? 'var(--accent)' : 'white' }}
				placeholder="Комментарии"
			/>
			{errors.comment && <Paragraph appearance="s">{errors.comment.message}</Paragraph>}

			<CustomButton className={styles['btn']}>Отправить</CustomButton>
		</form>
	)
}

export { Form }
