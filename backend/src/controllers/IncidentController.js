const connection = require("../database/connection");

module.exports = {
  //Lista todos e retorna numero total e paginação de 5 itens por page
  async index(request, response) {
    const { page = 1 } = request.query;
    const [count] = await connection("incidents").count();

    const IncidentsList = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);

    response.header("total-incidents", parseInt(count["count(*)"]));
    return response.json(IncidentsList);
  },

  //Retorna os detalhes envolvendo o incident
  async detail(request, response) {
    const { id } = request.params;
    function Detail(incident, ong) {
      this.incident = incident;
      this.ong = ong;
    }

    const incident = await connection("incidents")
      .where("id", id)
      .select("*")
      .first();

    const ong = await connection("ongs")
      .where("id", incident.ong_id)
      .select("*")
      .first();

    const incidentDetail = new Detail(incident, ong);
    return response.json({ incidentDetail });
  },

  //Cria novo caso
  async create(request, response) {
    const { title, description, value } = request.body;

    const ong_id = request.headers.authorization;
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  },

  //Deleta caso de id x
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: "Operação não permitida." });
    }

    await connection("incidents").where("id", id).delete();
    return response.status(204).send();
  },
};
