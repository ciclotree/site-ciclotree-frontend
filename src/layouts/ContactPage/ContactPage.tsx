import React, { useState, ChangeEvent, FormEvent } from 'react';
import './ContactPage.css';
import imageLogo from '../../Images/logo-contato.png';
import { toast } from 'react-toastify';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export const ContactPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const cleanedValue = value.replace(/\D/g, '');
            let formattedValue = '';

            if (cleanedValue.length > 0) {
                formattedValue += '(' + cleanedValue.substring(0, 2);
            }
            if (cleanedValue.length > 2) {
                formattedValue += ') ' + cleanedValue.substring(2, 3);
            }
            if (cleanedValue.length >= 3) {
                formattedValue += cleanedValue.substring(3, 7);
            }
            if (cleanedValue.length >= 7) {
                formattedValue += '-' + cleanedValue.substring(7, 11);
            }

            setFormData({
                ...formData,
                [name]: formattedValue
            });
        } else if (name === 'name') {
            const namePattern = /^[a-zA-Z\s]*$/;
            if (namePattern.test(value) || value === '') {
                setFormData({
                    ...formData,
                    [name]: value
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://ciclotree.com.br/api/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Mensagem enviada com sucesso!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                const errorText = await response.text();
                toast.error(`Erro ao enviar mensagem: ${errorText}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            toast.error(`Erro ao enviar mensagem: ${errorMessage}`);
        } finally {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center mb-4">
                <div className="col-md-8">
                    <div className="contact-container justify-content-left">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Nossos Contatos</h5>
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-telephone-fill me-3 fs-4 text-primary"></i>
                                <div>
                                    <h6 className="mb-0">Telefone</h6>
                                    <p className="text-muted mb-0">(41) 9910-57199</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-envelope-fill me-3 fs-4 text-primary"></i>
                                <div>
                                    <h6 className="mb-0">Email</h6>
                                    <p className="text-muted mb-0">contato@ciclotree.com.br</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-geo-alt-fill me-3 fs-4 text-primary"></i>
                                <div>
                                    <h6 className="mb-0">Endereço</h6>
                                    <p className="text-muted mb-0">
                                        Rua Bruno Lobo, 123 - Loja 07
                                        <br/>
                                        Bairro Alto, Curitiba - PR
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="about-us-images">
                            <img src={imageLogo} alt="CicloTree" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="contact-container">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Entre em contato conosco!</h2>
                            <p className="text-center">Retornaremos o contato o mais breve possível!</p>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="formName" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formName"
                                        name="name"
                                        placeholder="Digite seu nome"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="formEmail" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="formEmail"
                                        name="email"
                                        placeholder="Digite seu email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="formPhone" className="form-label">Telefone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="formPhone"
                                        name="phone"
                                        placeholder="(XX) X XXXX-XXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formSubject" className="form-label">Assunto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formSubject"
                                        name="subject"
                                        placeholder="Informe o assunto"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formMessage" className="form-label">Mensagem</label>
                                    <textarea
                                        className="form-control"
                                        id="formMessage"
                                        name="message"
                                        rows={4}
                                        placeholder="Escreva sua mensagem aqui"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="main-color btn btn-primary" disabled={loading}>
                                        {loading ? 'Enviando...' : 'Enviar mensagem'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
