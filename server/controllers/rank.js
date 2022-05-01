const { user } =require("../models")

module.exports = {
    All : async (req, res) => {
    },

    phyRank : async (req, res) => {
        const phyRank =  user.findAll({
            order: sequelize.literal('max(status_phy) DESC'),
        }, {limit : 5})

        if (phyRank) {
            res.status(200).json({phyRank : phyRank})
        }
        else {
            res.status(404).json({message : "Not Found"})
        }
    },

    intRank : async (req, res) => {
        const intRank =  user.findAll({
            order: sequelize.literal('max(status_int) DESC'),
        }, {limit : 5})

        if (phyRank) {
            res.status(200).json({intRank : intRank})
        }
        else {
            res.status(404).json({message : "Not Found"})
        }
    },

    splRank : async (req, res) => {
        const splRank =  user.findAll({
            order: sequelize.literal('max(status_spl) DESC'),
        }, {limit : 5})

        if (splRank) {
            res.status(200).json({splRank : splRank})
        }
        else {
            res.status(404).json({message : "Not Found"})
        }
    },
}