import { Input } from "../components/Input";

export const Login = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">
                            E-mail
                        </label>
                        <Input type="email" placeholder="Digite seu e-mail" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">
                            Senha
                        </label>
                        <Input type="password" placeholder="Digite sua senha" />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white mt-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Entrar
                    </button>
                </form>

                <div className="text-center mt-3 text-[13px]">
                    Não tem uma conta <a className="text-blue-500" href="/register">cadastre-se aqui</a>
                </div>
            </div>
        </div>
    );
};
