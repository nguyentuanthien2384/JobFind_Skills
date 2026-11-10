'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetailPost extends Model {
        static associate(models) {
            DetailPost.belongsTo(models.Allcode, { foreignKey: 'categoryJobCode', targetKey: 'code', as: 'jobTypePostData' })
            DetailPost.belongsTo(models.Allcode, { foreignKey: 'categoryWorktypeCode', targetKey: 'code', as: 'workTypePostData' })
            DetailPost.belongsTo(models.Allcode, { foreignKey: 'salaryJobCode', targetKey: 'code', as: 'salaryTypePostData' })
            DetailPost.belongsTo(models.Allcode, { foreignKey: 'categoryJoblevelCode', targetKey: 'code', as: 'jobLevelPostData' })
            DetailPost.belongsTo(models.Allcode, { foreignKey: 'experienceJobCode', targetKey: 'code', as: 'expTypePostData' })
            DetailPost.belongsTo(models.Allcode, { foreignKey: 'genderPostCode', targetKey: 'code', as: 'genderPostData' })
            DetailPost.belongsTo(models.Allcode, { foreignKey: 'addressCode', targetKey: 'code', as: 'provincePostData' })

            DetailPost.hasMany(models.Post, { foreignKey: 'detailPostId', as: 'postDetailData' })
            DetailPost.hasMany(models.Cv, { foreignKey: 'postId', as: 'postCvData' })
        }
    };
    DetailPost.init({
        name: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        categoryJobCode: DataTypes.STRING,
        addressCode: DataTypes.STRING,
        salaryJobCode: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        categoryJoblevelCode: DataTypes.STRING,
        categoryWorktypeCode: DataTypes.STRING,
        experienceJobCode: DataTypes.STRING,
        genderPostCode: DataTypes.STRING,
        hasMicroTest: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        microTestPrompt: DataTypes.TEXT,
        microTestTimeLimit: {
            type: DataTypes.INTEGER,
            defaultValue: 300
        }
    },
    {
        sequelize,
        modelName: 'DetailPost',
        timestamps: false
    });
    return DetailPost;
};
