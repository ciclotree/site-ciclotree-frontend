export const WhatsAppButton = () => {
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '900' }}>
            <a 
                id="whatsapp-button"
                href="https://api.whatsapp.com/send?phone=41991057199&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20%0Ade%20consultoria%20ambiental%20da%20Ciclo%20Tree!"
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
            >
                <img 
                    src={require("./../../Images/WhatsAppButton.png")}
                    alt="WhatsApp" 
                    style={{ width: '50px', height: '50px', marginTop: '5px' }}
                />
            </a>
        </div>
    );
}
