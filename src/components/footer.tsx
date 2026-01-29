const Footer = () => {
    const data = new Date();
    const year = data.getFullYear();

    return (
        <footer className="w-full py-4 bg-blue-100 text-center dark:bg-gray-800 mt-auto">
            <p className="text-gray-900 dark:text-gray-100 font-medium">
                © {year} Giovane Ferreira. Todos os direitos reservados.
            </p>
        </footer>
    );
}
export default Footer;