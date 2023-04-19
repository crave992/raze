import RegistrationForm
    from "@site/forms/registrationForm/RegistrationForm";
import VerifyTokenForm
    from "@site/forms/verifyTokenForm/VerifyTokenForm";
import Link
    from "next/link";
import {
    useEffect,
    useState
} from "react";
import useStore
    from "@store/store";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";


export default function RegisterWrapper(props) {

    const [showForm, setShowForm] = useState('register');
    const registeredEmail = useStore(state => state.registeredEmail);
    const emailVerified = useStore(state => state.emailVerified);

    useEffect(() => {
        if(registeredEmail && !emailVerified){
            setShowForm('token');
        }
        if(registeredEmail && emailVerified){
            setShowForm('login');
        }
    }, [registeredEmail, emailVerified]);

    return (
        <>
            {showForm === 'register' &&
            <RegistrationForm/>}
            {showForm === 'token' &&
            <VerifyTokenForm/>}
            {showForm === 'login' &&
            <div>
                <p>Your account has been created.</p>
                <br/><br/>
                <ButtonSecondary title={'Login'} href={`/login`}/>
            </div>
            }
        </>
    )
}
