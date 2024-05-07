import React, { useState } from 'react'
import '../styles/Login.css'

// Components
import Input from '../components/Input'
import Button from '../components/Button';

// Requisição HTTP
import axios from 'axios'

// Actions
import { LoginAction } from '../actions/userAction';

// Métodos de Routes
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    // Eventos
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Métodos de routes    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // gerenciamento de estados dos valores variaveis dos inputs
    function setValue(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'senha':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    // FAZ LOGIN NA API
    async function loginUser() {
        const data = {
            email: email,
            password: password,
        };
        try {
            // Faz o post para a url de login
            const res = await axios.post('http://localhost:8080/login', data);
            const token = res.data.data;
            // Acessa o reducer de login, setando o token no local Storage e mudando o valor de state para true
            dispatch(LoginAction(token, res.data.name));
            // Limpa os valores dos inputs
            setEmail("");
            setPassword("");
            // Faz o get para a url de autenticação
            const authRes = await axios.get("http://localhost:8080/auth", {
                headers: { 'authorization-token': token }
            });
            // Caso seja um token valido, redireciona para a home do painel administrativo
            if (authRes.data = 'success') {
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="loginContainerInputField">
            <>
                <Input change={setValue} span="Email" value={email} name="email" size="inputMedium" inputType="" placeholder="" />
                <Input change={setValue} span="Senha" value={password} name="senha" size="inputMedium" inputType="password" placeholder="" />
                <Button click={loginUser} buttonType="buttonSuccess" name="Fazer login" />
            </>
        </div>
    )
}

export default LoginForm;