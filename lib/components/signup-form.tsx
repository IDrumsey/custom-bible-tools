import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { supabase } from "@lib/supabaseClient"

interface Props {

}



const NewUserValidationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(10).max(30),
    firstName: yup.string().required(),
    lastName: yup.string().required()
})

type FormInputs = yup.InferType<typeof NewUserValidationSchema>

const SignUpForm = ({

}: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: yupResolver(NewUserValidationSchema)
    })



    // ----------------------------------- EVENT HANDLERS -----------------------------------


    async function attemptUserRegistration(validatedFormData: FormInputs) {
        console.log('test')
        // attempt to sign the user up
        const { data, error } = await supabase.auth.signUp({
            email: validatedFormData.email,
            password: validatedFormData.password,
            options: {
                data: {
                    first_name: validatedFormData.firstName,
                    last_name: validatedFormData.lastName
                }
            }
        })

        console.log(data, error)
    }

    function onFormValidationFail() {
        console.log(errors)
    }














    return (
        <>
            <input
                type="text"
                {...register('email')}
                placeholder="Email"
            />
            <input
                type="password"
                {...register('password')}
                placeholder="Password"
            />
            <input
                type="text"
                {...register('firstName')}
                placeholder="First Name"
            />
            <input
                type="text"
                {...register('lastName')}
                placeholder="Last Name"
            />

            <button onClick={handleSubmit(attemptUserRegistration, onFormValidationFail)}>Sign Up</button>
        </>
    )
}

export default SignUpForm