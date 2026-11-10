'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserSetting extends Model {
        static associate(models) {
            UserSetting.belongsTo(models.Allcode, { foreignKey: 'categoryJobCode', targetKey: 'code', as: 'jobTypeSettingData' })
            UserSetting.belongsTo(models.Allcode, { foreignKey: 'salaryJobCode', targetKey: 'code', as: 'salaryTypeSettingData' })
            UserSetting.belongsTo(models.Allcode, { foreignKey: 'experienceJobCode', targetKey: 'code', as: 'expTypeSettingData' })
            UserSetting.belongsTo(models.Allcode, { foreignKey: 'addressCode', targetKey: 'code', as: 'provinceSettingData' })

            UserSetting.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userSettingData' })
        }
    };
    UserSetting.init({
        categoryJobCode: DataTypes.STRING,
        addressCode: DataTypes.STRING,
        salaryJobCode: DataTypes.STRING,
        experienceJobCode: DataTypes.STRING,
        isTakeMail: DataTypes.TINYINT,
        isFindJob: DataTypes.TINYINT,
        file: DataTypes.BLOB('long'),
        userId: DataTypes.INTEGER,
        isBlindProfile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        minExpectedSalary: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        blockedCompanyIds: {
            type: DataTypes.JSON,
            defaultValue: []
        }
    },
    {
        sequelize,
        modelName: 'UserSetting',
        timestamps: false
    });
    return UserSetting;
};
