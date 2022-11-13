const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  //Lista todas as ONGs do banco
  async index(request, response) {
    const OngsList = await connection("ongs").select("*");
    return response.json(OngsList);
  },

  //Cria novas ONG
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString("hex");

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },
};
