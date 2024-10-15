const { User, ClientDetails } = require("../models");

class ClientController {
  async getClientProfileById(req, res) {
    try {
      const clientId = req.params.id;
      const client = await User.findOne({
        where: { id: clientId, role: 'client' },
        attributes: ["id", "username", "email", "role", "phone", "bio"],
        include: [
          {
            model: ClientDetails,
            as: "clientDetails",
            attributes: [
              "height",
              "weight",
            ],
            required: true,
          },
        ],
      });

      if (!client) {
        return res.status(404).json({ error: "Client not found or invalid role" });
      }

      res.status(200).json({ client });
    } catch (error) {
      console.error("Error fetching client profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getAllClient(req, res) {
    try {
      const clients = await User.findAll({
        attributes: ["id", "username", "email", "role", "phone", "bio"],
        include: [
          {
            model: ClientDetails,
            as: "clientDetails",
            attributes: [
              "height",
              "weight",
              "media_url",
              "physical_condition",   
            ],
            required: true,
          },
        ],
      });
      res.status(200).json({ clients });
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ error: "Failed to retrieve clients" });
    }
  }
}

module.exports = new ClientController();
