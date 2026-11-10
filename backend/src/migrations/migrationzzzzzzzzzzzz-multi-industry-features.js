'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // 1. Mở rộng bảng DetailPosts (Situational Micro-Assessment Đa ngành)
      const detailPostsTable = await queryInterface.describeTable('DetailPosts');
      if (!detailPostsTable.hasMicroTest) {
        await queryInterface.addColumn('DetailPosts', 'hasMicroTest', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        }, { transaction });
      }
      if (!detailPostsTable.microTestPrompt) {
        await queryInterface.addColumn('DetailPosts', 'microTestPrompt', {
          type: Sequelize.TEXT,
          allowNull: true
        }, { transaction });
      }
      if (!detailPostsTable.microTestTimeLimit) {
        await queryInterface.addColumn('DetailPosts', 'microTestTimeLimit', {
          type: Sequelize.INTEGER,
          defaultValue: 300,
          allowNull: false
        }, { transaction });
      }

      // 2. Mở rộng bảng Cvs (Chấm điểm tình huống AI, Pizza-Tracker & Constructive AI Rejection)
      const cvsTable = await queryInterface.describeTable('Cvs');
      if (!cvsTable.microTestAnswer) {
        await queryInterface.addColumn('Cvs', 'microTestAnswer', {
          type: Sequelize.TEXT,
          allowNull: true
        }, { transaction });
      }
      if (!cvsTable.aiSituationalScore) {
        await queryInterface.addColumn('Cvs', 'aiSituationalScore', {
          type: Sequelize.FLOAT,
          allowNull: true
        }, { transaction });
      }
      if (!cvsTable.aiEvaluationSummary) {
        await queryInterface.addColumn('Cvs', 'aiEvaluationSummary', {
          type: Sequelize.JSON,
          allowNull: true
        }, { transaction });
      }
      if (!cvsTable.applicationStage) {
        await queryInterface.addColumn('Cvs', 'applicationStage', {
          type: Sequelize.ENUM(
            'SUBMITTED',
            'AI_SCREENED',
            'HR_VIEWED',
            'SHORTLISTED',
            'INTERVIEW_SCHEDULED',
            'OFFERED',
            'REJECTED'
          ),
          defaultValue: 'SUBMITTED',
          allowNull: false
        }, { transaction });
      }
      if (!cvsTable.stageUpdatedAt) {
        await queryInterface.addColumn('Cvs', 'stageUpdatedAt', {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: true
        }, { transaction });
      }
      if (!cvsTable.hrViewedAt) {
        await queryInterface.addColumn('Cvs', 'hrViewedAt', {
          type: Sequelize.DATE,
          allowNull: true
        }, { transaction });
      }
      if (!cvsTable.aiFeedbackForCandidate) {
        await queryInterface.addColumn('Cvs', 'aiFeedbackForCandidate', {
          type: Sequelize.TEXT,
          allowNull: true
        }, { transaction });
      }

      // 3. Mở rộng bảng Companies (Chỉ số SLA Phản hồi chống Ghosting)
      const companiesTable = await queryInterface.describeTable('Companies');
      if (!companiesTable.avgResponseHours) {
        await queryInterface.addColumn('Companies', 'avgResponseHours', {
          type: Sequelize.FLOAT,
          allowNull: true,
          defaultValue: null
        }, { transaction });
      }
      if (!companiesTable.responseRate) {
        await queryInterface.addColumn('Companies', 'responseRate', {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0
        }, { transaction });
      }

      // 4. Mở rộng bảng CompanyReviews (Verified Candidate Reviews & Chấm điểm trải nghiệm phỏng vấn)
      const reviewsTable = await queryInterface.describeTable('CompanyReviews');
      if (!reviewsTable.verificationType) {
        await queryInterface.addColumn('CompanyReviews', 'verificationType', {
          type: Sequelize.ENUM('PUBLIC', 'APPLICANT', 'INTERVIEWED_CANDIDATE'),
          defaultValue: 'PUBLIC',
          allowNull: false
        }, { transaction });
      }
      if (!reviewsTable.relatedCvId) {
        await queryInterface.addColumn('CompanyReviews', 'relatedCvId', {
          type: Sequelize.INTEGER,
          allowNull: true
        }, { transaction });
      }
      if (!reviewsTable.interviewExperienceRating) {
        await queryInterface.addColumn('CompanyReviews', 'interviewExperienceRating', {
          type: Sequelize.TINYINT,
          allowNull: true
        }, { transaction });
      }

      // 5. Mở rộng bảng UserSettings (Blind Profile - Tuyển dụng ngược ẩn danh)
      const userSettingsTable = await queryInterface.describeTable('UserSettings');
      if (!userSettingsTable.isBlindProfile) {
        await queryInterface.addColumn('UserSettings', 'isBlindProfile', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        }, { transaction });
      }
      if (!userSettingsTable.minExpectedSalary) {
        await queryInterface.addColumn('UserSettings', 'minExpectedSalary', {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false
        }, { transaction });
      }
      if (!userSettingsTable.blockedCompanyIds) {
        await queryInterface.addColumn('UserSettings', 'blockedCompanyIds', {
          type: Sequelize.JSON,
          allowNull: true
        }, { transaction });
      }

      // 6. Mở rộng bảng UserSkills (Proof-of-Skill qua GitHub API / Portfolio)
      const userSkillsTable = await queryInterface.describeTable('UserSkills').catch(() => null);
      if (userSkillsTable) {
        if (!userSkillsTable.isVerified) {
          await queryInterface.addColumn('UserSkills', 'isVerified', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          }, { transaction });
        }
        if (!userSkillsTable.verificationSource) {
          await queryInterface.addColumn('UserSkills', 'verificationSource', {
            type: Sequelize.STRING(64),
            allowNull: true
          }, { transaction });
        }
        if (!userSkillsTable.verifiedMetadata) {
          await queryInterface.addColumn('UserSkills', 'verifiedMetadata', {
            type: Sequelize.JSON,
            allowNull: true
          }, { transaction });
        }
        if (!userSkillsTable.verifiedAt) {
          await queryInterface.addColumn('UserSkills', 'verifiedAt', {
            type: Sequelize.DATE,
            allowNull: true
          }, { transaction });
        }
      }

      // 7. Tạo bảng mới MockInterviewSessions (AI Mock Interview sát JD đa ngành)
      const allTables = await queryInterface.showAllTables();
      const normalizedTables = allTables.map((t) => (typeof t === 'string' ? t : t.tableName || '')).map((t) => t.toLowerCase());

      if (!normalizedTables.includes('mockinterviewsessions')) {
        await queryInterface.createTable('MockInterviewSessions', {
          id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          userId: { type: Sequelize.INTEGER, allowNull: false },
          postId: { type: Sequelize.INTEGER, allowNull: false },
          questions: { type: Sequelize.JSON, allowNull: false },
          transcript: { type: Sequelize.JSON, allowNull: true },
          overallScore: { type: Sequelize.FLOAT, allowNull: true },
          feedback: { type: Sequelize.JSON, allowNull: true },
          status: { type: Sequelize.ENUM('IN_PROGRESS', 'COMPLETED'), defaultValue: 'IN_PROGRESS', allowNull: false },
          createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
          updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
        }, { transaction });

        await queryInterface.addIndex('MockInterviewSessions', ['userId', 'postId'], {
          name: 'mock_interview_sessions_user_post_idx',
          transaction
        });
      }

      // 8. Tạo bảng mới JobInvitations (Lời mời ứng tuyển / Đấu giá lương Offer-First)
      if (!normalizedTables.includes('jobinvitations')) {
        await queryInterface.createTable('JobInvitations', {
          id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
          companyId: { type: Sequelize.INTEGER, allowNull: false },
          recruiterId: { type: Sequelize.INTEGER, allowNull: false },
          candidateId: { type: Sequelize.INTEGER, allowNull: false },
          postId: { type: Sequelize.INTEGER, allowNull: true },
          offeredSalaryMin: { type: Sequelize.INTEGER, allowNull: false },
          offeredSalaryMax: { type: Sequelize.INTEGER, allowNull: false },
          pitchMessage: { type: Sequelize.TEXT, allowNull: false },
          status: {
            type: Sequelize.ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED'),
            defaultValue: 'PENDING',
            allowNull: false
          },
          respondedAt: { type: Sequelize.DATE, allowNull: true },
          createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
          updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
        }, { transaction });

        await queryInterface.addIndex('JobInvitations', ['candidateId', 'status'], {
          name: 'job_invitations_candidate_status_idx',
          transaction
        });
        await queryInterface.addIndex('JobInvitations', ['companyId', 'candidateId'], {
          name: 'job_invitations_company_candidate_idx',
          transaction
        });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('JobInvitations', { transaction });
      await queryInterface.dropTable('MockInterviewSessions', { transaction });

      const userSkillsTable = await queryInterface.describeTable('UserSkills').catch(() => null);
      if (userSkillsTable) {
        if (userSkillsTable.verifiedAt) await queryInterface.removeColumn('UserSkills', 'verifiedAt', { transaction });
        if (userSkillsTable.verifiedMetadata) await queryInterface.removeColumn('UserSkills', 'verifiedMetadata', { transaction });
        if (userSkillsTable.verificationSource) await queryInterface.removeColumn('UserSkills', 'verificationSource', { transaction });
        if (userSkillsTable.isVerified) await queryInterface.removeColumn('UserSkills', 'isVerified', { transaction });
      }

      await queryInterface.removeColumn('UserSettings', 'blockedCompanyIds', { transaction });
      await queryInterface.removeColumn('UserSettings', 'minExpectedSalary', { transaction });
      await queryInterface.removeColumn('UserSettings', 'isBlindProfile', { transaction });

      await queryInterface.removeColumn('CompanyReviews', 'interviewExperienceRating', { transaction });
      await queryInterface.removeColumn('CompanyReviews', 'relatedCvId', { transaction });
      await queryInterface.removeColumn('CompanyReviews', 'verificationType', { transaction });

      await queryInterface.removeColumn('Companies', 'responseRate', { transaction });
      await queryInterface.removeColumn('Companies', 'avgResponseHours', { transaction });

      await queryInterface.removeColumn('Cvs', 'aiFeedbackForCandidate', { transaction });
      await queryInterface.removeColumn('Cvs', 'hrViewedAt', { transaction });
      await queryInterface.removeColumn('Cvs', 'stageUpdatedAt', { transaction });
      await queryInterface.removeColumn('Cvs', 'applicationStage', { transaction });
      await queryInterface.removeColumn('Cvs', 'aiEvaluationSummary', { transaction });
      await queryInterface.removeColumn('Cvs', 'aiSituationalScore', { transaction });
      await queryInterface.removeColumn('Cvs', 'microTestAnswer', { transaction });

      await queryInterface.removeColumn('DetailPosts', 'microTestTimeLimit', { transaction });
      await queryInterface.removeColumn('DetailPosts', 'microTestPrompt', { transaction });
      await queryInterface.removeColumn('DetailPosts', 'hasMicroTest', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
