function validarCPF(req, res, next) {
    const cpf = req.body.cpf?.replace(/\D/g, "");

    if (!cpf) {
        return res.status(400).json({ erro: "CPF é obrigatório." });
    }

    if (cpf.length !== 11) {
        return res.status(400).json({ erro: "CPF inválido." });
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return res.status(400).json({ erro: "CPF inválido." });
    }

    function calcularDigito(cpfParcial, pesoInicial) {
        let soma = 0;

        for (let i = 0; i < cpfParcial.length; i++) {
            soma += Number(cpfParcial[i]) * (pesoInicial - i);
        }

        const resto = soma % 11;

        return resto < 2 ? 0 : 11 - resto;
    }

    const primeiroDigito = calcularDigito(cpf.slice(0, 9), 10);
    const segundoDigito = calcularDigito(cpf.slice(0, 10), 11);

    if (
        primeiroDigito !== Number(cpf[9]) ||
        segundoDigito !== Number(cpf[10])
    ) {
        return res.status(400).json({ erro: "CPF inválido." });
    }

    next();
}

module.exports = validarCPF;