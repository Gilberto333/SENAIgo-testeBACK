function validarSchema(schema) {
    return function (req, res, next) {
        const erros = []

        for (const campo in schema) {
            const regras = schema[campo]
            const valor = req.body[campo]
            const ausente = valor === undefined || valor === '' || valor === null

        
            if (regras.obrigatorio && ausente) {
                erros.push(`O campo '${campo}' é obrigatório.`)
                continue
            }

          
            if (!ausente && regras.tipo && typeof valor !== regras.tipo) {
                erros.push(`O campo '${campo}' precisa ser do tipo '${regras.tipo}'.`)
            }

           
            if (!ausente && regras.min && valor.length < regras.min) {
                erros.push(`O campo '${campo}' deve conter no mínimo ${regras.min} caracteres.`)
            }

            if (!ausente && regras.max && valor.length > regras.max) {
                erros.push(`O campo '${campo}' deve conter no máximo ${regras.max} caracteres.`)
            }

            if (!ausente && typeof valor === 'number') {
                if (regras.inteiro && !Number.isInteger(valor)) {
                    erros.push(`O campo '${campo}' deve ser um número inteiro.`)
                }

                if (regras.minValor !== undefined && valor < regras.minValor) {
                    erros.push(`O campo '${campo}' deve ser no mínimo ${regras.minValor}.`)
                }

                if (regras.maxValor !== undefined && valor > regras.maxValor) {
                    erros.push(`O campo '${campo}' deve ser no máximo ${regras.maxValor}.`)
                }
            }

          
            if (
                !ausente &&
                regras.email &&
                (!valor.includes("@") || !valor.includes("."))
            ) {
                erros.push(`O campo '${campo}' deve ser um e-mail válido.`)
            }
        }

        if (erros.length > 0) {
            return res.status(400).json({ erros })
        }

        next()
    }
}

module.exports = validarSchema