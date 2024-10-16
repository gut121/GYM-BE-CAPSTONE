const { Reviews } = require("../models");

class ReviewsController {
    async getReviewsAll(req, res) {
        try {
            const reviews = await Reviews.findAll();
            res.status(200).json({ success: true, data: reviews });

        } catch (error) {
            console.error("error getting reviews", error);
            res.status(500).json({ success: false, data: error.message });

        }
    }
}
module.exports = ReviewsController;
