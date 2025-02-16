import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5174/api/auth/register', {email, password});
            navigate('/login');
        } catch (error) {
            console.error('Błąd rejestracji', error)
        }
    };

return (
    <form onSubmit={handleSubmit}>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        required
        />
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        required/>
        <button type="submit">Zarejestruj się</button>
    </form>
);
};

export default Register;