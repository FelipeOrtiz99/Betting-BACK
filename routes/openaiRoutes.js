const express = require("express");
const router = express.Router();
const { generateText } = require("../controllers/openaiController");

   /**
    * @swagger
    * components:
    *   schemas:
    *     Prediction:
    *       type: object
    *       properties:
    *          home:
    *           type: object
    *           properties:
    *            probability:
    *              type: number
    *            score:
    *              type: string
    *            firstScore:
    *              type: string
    *          draw:
    *           type: integer
    *          away:
    *           type: object
    *           properties:
    *            probability:
    *             type: number
    *            score:
    *             type: string
    *            firstScore:
    *             type: string
    *            
    *     BodyRequest:
    *      type: object
    *      properties:
    *       sport:
    *        type: string
    *       league:
    *        type: string
    *       matchId:
    *        type: number
    */

   /**
    * @swagger
    * predition/generate:
    *   post:
    *     summary: Generate a prediction
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/BodyRequest'
    *     responses:
    *       200:
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Prediction'
    *       500:
    *         description: Some server error
    */
router.post("/generate", generateText);

module.exports = router;
