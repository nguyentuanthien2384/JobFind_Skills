'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cv extends Model {
        static associate(models) {
            Cv.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id', as: 'postCvData' })
            Cv.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userCvData' })
            if (models.CompanyReview) {
                Cv.hasMany(models.CompanyReview, { foreignKey: 'relatedCvId', as: 'verifiedReviewData' })
            }
        }
    };
    Cv.init({
        userId: DataTypes.INTEGER,
        file: DataTypes.BLOB('long'),
        postId: DataTypes.INTEGER,
        isChecked: DataTypes.TINYINT,
        description: DataTypes.STRING,
        microTestAnswer: DataTypes.TEXT,
        aiSituationalScore: DataTypes.FLOAT,
        aiEvaluationSummary: DataTypes.JSON,
        applicationStage: {
            type: DataTypes.ENUM(
                'SUBMITTED',
                'AI_SCREENED',
                'HR_VIEWED',
                'SHORTLISTED',
                'INTERVIEW_SCHEDULED',
                'OFFERED',
                'REJECTED'
            ),
            defaultValue: 'SUBMITTED'
        },
        stageUpdatedAt: DataTypes.DATE,
        hrViewedAt: DataTypes.DATE,
        aiFeedbackForCandidate: DataTypes.TEXT
    },
    {
        sequelize,
        modelName: 'Cv',
    });
    return Cv;
};
