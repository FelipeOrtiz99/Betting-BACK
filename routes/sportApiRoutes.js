// routes/externalApiRoutes.js
const express = require("express");
const router = express.Router();
const { fetchData, fetchOdds, fetchOddsTeamsNPlayers } = require("../controllers/sportApiController");

// Ruta para obtener datos de la API externa
router.get("/data", fetchData);

router.get("/:sport/:league/:matchId/odds", fetchOdds);


   /**
    * @swagger
    * components:
    *   schemas:
    *     TeamsNPlayers:
    *       type: object
    *       properties:
    *          teams:
    *           type: object
    *           properties:
    *            goalsLinears:
    *              type: object
    *              $ref: '#/components/schemas/Linear'
    *          players:
    *           type: object
    *           $ref: '#/components/schemas/Player'
    *           
    *     Linear:
    *      type: object
    *      properties:
    *       handicap:
    *        type: string
    *       under:
    *        type: number
    *       over:
    *        type: number
    *       
    *     Player:
    *      type: object
    *      properties:
    *       playerOddsFirstGoal:
    *        type: object
    *        properties:
    *          player:
    *          type: string
    *        probability:
    *         type: number
    *       playerOddsGoal:
    *        type: object
    *        properties:
    *          player:
    *          type: string
    *        probability:
    *         type: number
    */

   
   /**
    * @swagger
    * api/odds/teamsnplayers:
    *   get:
    *       parameters:
    *        - name: sport 
    *          type: string
    *          in: path
    * 
    *        - name: league
    *          type: string
    *          in: path
    *      
    *        - name: matchId
    *          type: number
    *          in: path
    * 
    *       responses:
    *        200:
    *          content:
    *            application/json:
    *              schema:
    *                $ref: '#/components/schemas/TeamsNPlayers'
    *        500:
    *         description: Some server error
    */


router.get("/:sport/:league/:matchId/odds/teamsnplayers", fetchOddsTeamsNPlayers);

module.exports = router;
