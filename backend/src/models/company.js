'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        static associate(models) {
            Company.belongsTo(models.Allcode, { foreignKey: 'statusCode', targetKey: 'code', as: 'statusCompanyData' })
            Company.belongsTo(models.Allcode, { foreignKey: 'censorCode', targetKey: 'code', as: 'censorData' })

            Company.hasMany(models.User, { foreignKey: 'companyId', as: 'userCompanyData' })
            Company.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'companyUserData' })
            Company.hasMany(models.CandidateView, { foreignKey: 'companyId', as: 'candidateViewCompanyData' })
            if (models.JobInvitation) {
                Company.hasMany(models.JobInvitation, { foreignKey: 'companyId', as: 'companyInvitationData' })
            }
        }
    };
    Company.init({
        name: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        coverimage: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        website: DataTypes.STRING,
        address: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        amountEmployer: DataTypes.INTEGER,
        taxnumber: DataTypes.STRING,
        statusCode: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        censorCode: DataTypes.STRING,
        file: DataTypes.BLOB('long'),
        allowPost: DataTypes.INTEGER,
        allowHotPost: DataTypes.INTEGER,
        allowCvFree: DataTypes.INTEGER,
        allowCv: DataTypes.INTEGER,
        avgResponseHours: {
            type: DataTypes.FLOAT,
            defaultValue: null
        },
        responseRate: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: 'Company',
    });
    return Company;
};
