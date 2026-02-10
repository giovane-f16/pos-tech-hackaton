export const formatarData = (data: Date | string) => {
    let dateString: string;

    if (typeof data === "string") {
        dateString = data.split("T")[0];
    } else {
        dateString = data.toISOString().split("T")[0];
    }

    const [ano, mes, dia] = dateString.split("-").map(Number);
    const date = new Date(ano, mes - 1, dia);
    return date.toLocaleDateString("pt-BR");
};