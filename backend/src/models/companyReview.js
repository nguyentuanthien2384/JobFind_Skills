'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompanyReview extends Model {
        static associate(models) {
            CompanyReview.belongsTo(models.Company, { foreignKey: 'companyId', targetKey: 'id', as: 'companyReviewData' })
            CompanyReview.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userReviewData' })
            if (models.Cv) {
                CompanyReview.belongsTo(models.Cv, { foreignKey: 'relatedCvId', targetKey: 'id', as: 'relatedCvData' })
            }
        }
    };
    CompanyReview.init({
        companyId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        star: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        verificationType: {
            type: DataTypes.ENUM('PUBLIC', 'APPLICANT', 'INTERVIEWED_CANDIDATE'),
            defaultValue: 'PUBLIC'
        },
        relatedCvId: DataTypes.INTEGER,
        interviewExperienceRating: DataTypes.TINYINT
    },
    {
        sequelize,
        modelName: 'CompanyReview',
    });
    return CompanyReview;
};
