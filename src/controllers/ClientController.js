const { User, ClientDetails } = require("../models");

class ClientController {
  async getClientProfile(req, res) {
    try {
      const clientId = req.params.id;
      const client = await User.findOne({
        where: { id: clientId, role: 'client' }, 
        attributes: ["id", "name", "email", "role", "phone", "bio"],
        include: [
          {
            model: ClientDetails,
            as: "ClientDetails",
            attributes: [
              "height",
              "weight",
              "body_image_url",
              "physical_condition",
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
}

module.exports = new ClientController();
