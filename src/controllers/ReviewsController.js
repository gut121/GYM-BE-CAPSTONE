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
    async getReviewsByClientId(req, res) {
        try {
            const { client_id } = req.params;
            if (!client_id) {
                return res.status(400).json({ success: false, message: "Invalid client ID" });
            }
            const reviews = await Reviews.findAll({
                where: { clientId: client_id },
            });
            if (reviews.length === 0) {
                return res.status(404).json({ success: false, message: "No reviews found for this client" });
            }
            res.status(200).json({ success: true, data: reviews });
        } catch (error) {
            console.error("Error getting reviews by client ID", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
    async getReviewById(req, res) {
        try {
            const { Id } = req.params;
            if (!Id) {
                return res.status(400).json({ success: false, message: "Invalid review ID" });
            }
    
            const review = await Reviews.findOne({
                where: { id: reviewId },
            });
    
            if (!review) {
                return res.status(404).json({ success: false, message: "Review not found" });
            }
    
            res.status(200).json({ success: true, data: review });
        } catch (error) {
            console.error("Error getting review by ID", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
    async getReviewsByTrainerId(req, res) {
        try {
            const { trainer_Id } = req.params;
            if (!trainer_Id) {
                return res.status(400).json({ success: false, message: "Invalid trainer ID" });
            }
    
            const reviews = await Reviews.findAll({
                where: { trainerId: trainer_Id },
            });
    
            if (reviews.length === 0) {
                return res.status(404).json({ success: false, message: "No reviews found for this trainer" });
            }
    
            res.status(200).json({ success: true, data: reviews });
        } catch (error) {
            console.error("Error getting reviews by trainer ID", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
    async getReviewsByRating(req, res) {
        try {
            const { rating } = req.params;
            if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
                return res.status(400).json({ success: false, message: "Invalid rating" });
            }
    
            const reviews = await Reviews.findAll({
                where: { rating: rating },
            });
    
            if (reviews.length === 0) {
                return res.status(404).json({ success: false, message: "No reviews found for this rating" });
            }
    
            res.status(200).json({ success: true, data: reviews });
        } catch (error) {
            console.error("Error getting reviews by rating", error);
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
    
    
}
module.exports = new ReviewsController;
