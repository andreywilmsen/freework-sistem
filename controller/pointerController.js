require("dotenv").config();
let Pointer = require("../model/Pointer");
let validation = require('./validation');

let pointerController = {
  get: async function (req, res) {
    res.send('Hello from get');
  },
  post: async function (req, res) {
    let name = req.body.name;
    let pointer = req.body.pointer;

    // Criado para manipulação das datas.

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const dia = dataAtual.getDate();
    let actualMonth = mes;

    let user = await Pointer.findOne({ name: req.body.name });

    if (user) {

      // Procura no banco de dados a coleção do dia em que está sendo registrado.

      let findedUser = await Pointer.findOne({ "pointers.data": `${dia}-${mes}-${ano}` });

      // Se encontrado, será atualizado a coleção do dia, inserindo mais um registro ponto

      if (findedUser) {

        // PROVAVELMENTE O ERRO TA AQUI, NÃO ESTÁ CRIANDO UMA ARRAY COM TODOS OS REGISTROS PONTOS DO MES

        let updatedPointer = await Pointer.updateOne({ _id: findedUser._id }, { $push: { pointer: { data: `${dia}-${mes}-${ano}`, pointer: pointer } } }
        );
        res.status(200).json({ status: 'success', data: 'Registro atualizado.' });
      }
    }

    // Caso contrário, se não achar, será criado uma nova coleção com um novo registro ponto

    else {
      let register = [{ mes: actualMonth, pointers: { data: `${dia}-${mes}-${ano}`, pointer } }];
      let response = await Pointer.create({ name, register });

      res.status(200).json({ status: 'success', data: 'Registrado com sucesso.' });
    }
  },
  update: async function (req, res) {
    res.send('Hello from update');
  },
};

module.exports = pointerController;