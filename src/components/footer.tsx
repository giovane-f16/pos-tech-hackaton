const Footer = () => {
    const data = new Date();
    const year = data.getFullYear();

    return (
        <footer className="w-full py-4 bg-gray-200 text-center dark:bg-gray-800">
            <p className="text-gray-900 dark:text-gray-100">
                © {year} Giovane Ferreira. Todos os direitos reservados.
            </p>
        </footer>
    );
}
export default Footer;