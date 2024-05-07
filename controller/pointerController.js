require("dotenv").config();
let Pointer = require("../model/Pointer");
let validation = require('./validation');

let pointerController = {
  get: async function (req, res) {
    let name = req.body.name
    let month = Number(req.body.month);
    try {
      let response = await Pointer.findOne({ name: name, "register.mes": month });
      let registrosDoMesAtual = response.register.filter(registro => registro.mes === month);

      // res.send(registrosDoMesAtual);
      res.status(200).json({ registros: registrosDoMesAtual });
    } catch (err) {
      res.status(500).json({ error: 'Registros não encontrado' });
    }
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

    // Verifica se o usuário existe pelo nome

    let user = await Pointer.findOne({ name: req.body.name });

    if (user) {
      // Caso exista, procura se o usuário possui o mês atual cadastrado

      let findedUser = user.register.find(item => item.mes === actualMonth);

      // Se o mês já existir no register, adiciona o day ao array days do mês atual.
      if (findedUser) {

        // For para varrer os dias do register para avaliar os dias já registrados
        for (i = 0; i < findedUser.days.length; i++) {
          // LÓGICA DE INSERIR O POINTER NO DIA ATUAL

          if (findedUser.days[i].data === `${dia}-${mes}-${ano}`) {
            console.log('entrou no hoje')
            let updatedPointer = await Pointer.updateOne(
              {
                _id: user._id,
                "register.mes": actualMonth,
                "register.days.data": `${dia}-${mes}-${ano}`
              },
              {
                $push: { "register.$[month].days.$[day].pointers": pointer }
              },
              {
                arrayFilters: [
                  { "month.mes": actualMonth },
                  { "day.data": `${dia}-${mes}-${ano}` }
                ],
                new: true
              }
            );
          }

          // LÓGICA DE INSERIR OUTROS DIA NO DAYS
          else {
            // Verifica se o dia já existe em days
            let dayExists = findedUser.days.some(day => day.data === `${dia}-${mes}-${ano}`);

            if (!dayExists) {
              // Adiciona o dia apenas se ele não existir
              let updatedPointer = await Pointer.updateOne(
                {
                  _id: user._id,
                  "register.mes": actualMonth,
                },
                {
                  $push: { "register.$[month].days": { data: `${dia}-${mes}-${ano}`, pointers: pointer } }
                },
                {
                  arrayFilters: [
                    { "month.mes": actualMonth },
                  ],
                  new: true
                }
              );
            }

          }
        }
      } else {
        // CRIA UM MÊS NOVO
        // Se o mês não existir no register, crie um novo objeto no array register com o novo mês e o novo objeto pointers
        let updatedPointer = await Pointer.findOneAndUpdate(
          { _id: user._id },
          {
            $push: {
              register: {
                mes: actualMonth,
                days: [{ data: `${dia}-${mes}-${ano}`, pointers: pointer }]
              }
            }
          }
        );
      }

      res.status(200).json({ status: 'success', data: 'Registro atualizado.' });
    }
    // Caso contrário, se não achar, será criado uma nova coleção com um novo registro ponto

    // CRIA UM NOVO USUÁRIO
    else {
      let register = [{ mes: actualMonth, days: [{ data: `${dia}-${mes}-${ano}`, pointers: pointer }] }];
      let response = await Pointer.create({ name, register });

      res.status(200).json({ status: 'success', data: 'Registrado com sucesso.' });
    }
  },
  update: async function (req, res) {
    res.send('Hello from update');
  },
};

module.exports = pointerController;