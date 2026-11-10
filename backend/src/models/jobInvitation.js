'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobInvitation extends Model {
    static associate(models) {
      JobInvitation.belongsTo(models.Company, { foreignKey: 'companyId', targetKey: 'id', as: 'companyData' });
      JobInvitation.belongsTo(models.User, { foreignKey: 'recruiterId', targetKey: 'id', as: 'recruiterData' });
      JobInvitation.belongsTo(models.User, { foreignKey: 'candidateId', targetKey: 'id', as: 'candidateData' });
      JobInvitation.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id', as: 'postData' });
    }
  }
  JobInvitation.init({
    companyId: DataTypes.INTEGER,
    recruiterId: DataTypes.INTEGER,
    candidateId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    offeredSalaryMin: DataTypes.INTEGER,
    offeredSalaryMax: DataTypes.INTEGER,
    pitchMessage: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED'),
      defaultValue: 'PENDING'
    },
    respondedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'JobInvitation',
    tableName: 'JobInvitations'
  });
  return JobInvitation;
};
