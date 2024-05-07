require("dotenv").config();
let Pointer = require("../model/Pointer");
let validation = require('./validation');

let pointerController = {
  get: async function (req, res) {
    let name = req.body.name;
    let month = Number(req.body.month);

    try {
      let response = await Pointer.findOne({ name: name, "register.mes": month });
      let registrosDoMesAtual = response.register.filter(registro => registro.mes === month);

      // Ordena os dias em ordem crescente
      registrosDoMesAtual.forEach(registro => {
        registro.days.sort((a, b) => {
          const dateA = new Date(a.data);
          const dateB = new Date(b.data);
          return dateA - dateB;
        });
      });

      res.status(200).json({ registros: registrosDoMesAtual });
    } catch (err) {
      res.status(400).json({ error: 'Registros não encontrados' });
    }
  },
  post: async function (req, res) {
    try {
      let name = req.body.name;
      let pointer = req.body.pointer;

      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      const mes = dataAtual.getMonth() + 1;
      const dia = dataAtual.getDate();
      let actualMonth = mes;

      let user = await Pointer.findOne({ name: req.body.name });

      if (user) {
        let findedUser = user.register.find(item => item.mes === actualMonth);

        if (findedUser) {
          let foundDayIndex = findedUser.days.findIndex(day => day.data === `${dia}-${mes}-${ano}`);
          if (foundDayIndex !== -1) {
            let day = findedUser.days[foundDayIndex];
            if (day.pointers.length < 4) {
              console.log('entrou no hoje');
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
            } else {
              return res.status(400).json({ error: 'Limite máximo de registros atingido para este dia.' });
            }
          } else {
            let dayExists = findedUser.days.some(day => day.data === `${dia}-${mes}-${ano}`);
            if (!dayExists) {
              let updatedPointer = await Pointer.updateOne(
                {
                  _id: user._id,
                  "register.mes": actualMonth,
                },
                {
                  $push: { "register.$[month].days": { data: `${dia}-${mes}-${ano}`, pointers: [pointer] } }
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
        } else {
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

        return res.status(200).json({ status: 'success', data: 'Registro atualizado.' });
      } else {
        let register = [{ mes: actualMonth, days: [{ data: `${dia}-${mes}-${ano}`, pointers: pointer }] }];
        let response = await Pointer.create({ name, register });

        return res.status(200).json({ status: 'success', data: 'Registrado com sucesso.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação.' });
    }
  },
  update: async function (req, res) {
    res.send('Hello from update');
  },
};

module.exports = pointerController;