export const formatarData = (data: string) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
};