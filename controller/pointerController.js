require("dotenv").config();
let Pointer = require("../model/Pointer");
let validation = require('./validation');

let pointerController = {
  get: async function (req, res) {
    let name = req.body.name
    let month = req.body.month;

    let response = await Pointer.findOne({ name: name, "register.mes": month });
    let registrosDoMesAtual = response.register.filter(registro => registro.mes === month);

    res.send(registrosDoMesAtual);
  },
  post: async function (req, res) {
    let name = req.body.name;
    let pointer = req.body.pointer;

    // Criado para manipulação das datas.

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    // const mes = dataAtual.getMonth() + 1;
    const mes = 5;
    const dia = dataAtual.getDate();
    let actualMonth = mes;

    let user = await Pointer.findOne({ name: req.body.name });

    if (user) {
      // Procura no banco de dados a coleção do dia em que está sendo registrado.
      let findedUser = await Pointer.findOne({ "register.mes": actualMonth });

      if (findedUser) {
        // Se o mês já existir no register, adicione o novo objeto ao array pointers do objeto existente
        let updatedPointer = await Pointer.findOneAndUpdate(
          { _id: findedUser._id, "register.mes": actualMonth },
          {
            // Insere no primeiro elemento que corresponde o critério da busca (o $ é o indice
            // variavel)
            $push: { "register.$.pointers": { data: `${dia}-${mes}-${ano}`, pointer } }
          }
        );
      } else {
        // Se o mês não existir no register, crie um novo objeto no array register com o novo mês e o novo objeto pointers
        let updatedPointer = await Pointer.findOneAndUpdate(
          { _id: user._id },
          {
            $push: {
              register: {
                mes: actualMonth,
                pointers: [{ data: `${dia}-${mes}-${ano}`, pointer }]
              }
            }
          }
        );
      }

      res.status(200).json({ status: 'success', data: 'Registro atualizado.' });
    }
    // Caso contrário, se não achar, será criado uma nova coleção com um novo registro ponto

    else {
      let register = [{ mes: actualMonth, pointers: [{ data: `${dia}-${mes}-${ano}`, pointer }] }];
      let response = await Pointer.create({ name, register });

      res.status(200).json({ status: 'success', data: 'Registrado com sucesso.' });
    }
  },
  update: async function (req, res) {
    res.send('Hello from update');
  },
};

module.exports = pointerController;