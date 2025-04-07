import React, { useState } from 'react';
import { Input } from '../components/Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../database/firebase';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user, ' User registered with success!');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="absolute top-[50%] left-[50%] w-[90vw] translate-x-[-50%] translate-y-[-50%] p-1">
                <h2 className="title">Cadastre-se aqui</h2>
            </div>
        </div>

        // <div className="flex h-screen items-center justify-center bg-gray-100">
        //     <div className="w-full max-w-md py-6 px-8 bg-white rounded-2xl shadow-lg">
        //         <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>

        //         <form onSubmit={handleRegister}>
        //             <div className="mb-4">
        //                 <label className="block text-gray-700 font-medium">
        //                     E-mail
        //                 </label>
        //                 <Input type="email" placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.target.value)}/>
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-gray-700 font-medium">
        //                     Senha
        //                 </label>
        //                 <Input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
        //             </div>

        //             <button
        //                 type="submit"
        //                 className="w-full bg-blue-600 text-white mt-5 py-2 rounded-lg hover:bg-blue-700 transition"
        //             >
        //                 Registrar-se
        //             </button>
        //         </form>

        //         <div className="text-center mt-3 text-[13px]">
        //             Já tem uma conta <a className="text-blue-500" href="/login">entre aqui</a>
        //         </div>
        //     </div>
        // </div>
    );
};
