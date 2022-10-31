import express from "express";

import { createTour, deleteTour, getAllTours, getTour, getTourBySearch, getToursByUser, updateTour } from "../controllers/tour.js";

const router = express.Router();

// had to move search route to top for it to work - info in 3rd answer here: https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
router.get("/search", getTourBySearch)
router.post("/", createTour);
router.get("/", getAllTours);
router.get("/:id", getTour);
router.get("/userTours/:id", getToursByUser);
router.delete("/:id", deleteTour);
router.patch("/:id", updateTour);


export default router;
