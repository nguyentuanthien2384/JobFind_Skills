'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MockInterviewSession extends Model {
    static associate(models) {
      MockInterviewSession.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'candidateData' });
      MockInterviewSession.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id', as: 'postData' });
    }
  }
  MockInterviewSession.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    questions: DataTypes.JSON,
    transcript: DataTypes.JSON,
    overallScore: DataTypes.FLOAT,
    feedback: DataTypes.JSON,
    status: {
      type: DataTypes.ENUM('IN_PROGRESS', 'COMPLETED'),
      defaultValue: 'IN_PROGRESS'
    }
  }, {
    sequelize,
    modelName: 'MockInterviewSession',
    tableName: 'MockInterviewSessions'
  });
  return MockInterviewSession;
};
