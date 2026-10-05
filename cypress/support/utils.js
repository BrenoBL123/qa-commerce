export function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("-", "").trim().toLowerCase();
}