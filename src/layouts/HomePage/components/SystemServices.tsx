import { Link } from "react-router-dom";

export const SystemServices = () => {
    return(
        <div className="container my-5">
            <div className="row p-4 align-items-center shadow-lg custom-final-home">
                <div className="col-lg-7 p-3">
                    <h1 className="display-4 fw-bold">
                        Não encontrou o que procurava?
                    </h1>
                    <p className="lead">
                        Se você não encontrou o que procurava,
                        envie uma mensagem pessoal ao nosso time!
                    </p>
                    <div className="d-grid gap2 justify-content-md-start mb-4 mb-lg-3">
                        <Link className="btn main-color btn-lg text-white btn-outline" to="/contact">
                            Entrar em contato
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 lost-image"></div>
            </div>
        </div>
    );
}