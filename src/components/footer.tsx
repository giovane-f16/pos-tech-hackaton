const Footer = () => {
    const data = new Date();
    const year = data.getFullYear();

    return (
        <footer className="w-full px-2.5 py-4 bg-white-200 text-center dark:bg-gray-800 mt-auto border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-900 dark:text-gray-100 font-medium text-[14px]">
                © {year} Giovane Ferreira. Todos os direitos reservados.
            </p>
        </footer>
    );
}
export default Footer;