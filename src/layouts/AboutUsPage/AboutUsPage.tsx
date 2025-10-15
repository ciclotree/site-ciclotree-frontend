import './AboutUsPage.css';
import image1 from '../../Images/heros-1.jpeg';
import image2 from '../../Images/heros-2.jpeg';

export const AboutUsPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return (
        <section className="about-us-hero">
            <div className="about-us-container">
                <div className="about-us-content">
                    <h2>Sobre Nós</h2>
                    <p>
                        A Ciclo Tree Consultoria Ambiental é sua parceira em Sustentabilidade e Governança. Oferecemos serviços de licenciamento ambiental, estudos ambientais e consultoria ESG, focados em resultados mensuráveis.
                        Nossa missão é ajudar sua empresa a mitigar e reduzir impactos socioambientais negativos, alinhando inovações aos seus objetivos estratégicos.

                        Cada projeto é uma oportunidade de gerar impactos positivos para a sociedade e o meio ambiente. Junte-se a nós nessa missão!
                    </p>
                    <p>
                        Ao longo dos anos, temos aprimorado nossos serviços, investido em novas tecnologias
                        e expandido nossa presença no mercado. Acreditamos que o sucesso só é alcançado
                        com integridade, transparência e comprometimento com a excelência.
                    </p>
                </div>
                <div className="about-us-images">
                    <img src={image1} alt="" />
                    <img src={image2} alt="" />
                </div>
            </div>
        </section>
    );
}
