'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserSkill extends Model {
        static associate(models) {
            UserSkill.belongsTo(models.User);
            UserSkill.belongsTo(models.Skill);
        }
    };
    UserSkill.init({
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        verificationSource: DataTypes.STRING(64),
        verifiedMetadata: DataTypes.JSON,
        verifiedAt: DataTypes.DATE
    },
    {
        sequelize,
        modelName: 'UserSkill',
        timestamps: false
    });
    return UserSkill;
};
