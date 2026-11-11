'use strict';

const assert = require('assert');
const differentiatorService = require('../src/services/differentiatorService');
const differentiatorController = require('../src/controllers/differentiatorController');

async function runTests() {
  const emittedEvents = [];
  const mockIo = {
    to(room) {
      return {
        emit(event, payload) {
          emittedEvents.push({ room, event, payload });
        }
      };
    }
  };

  // In-memory store mô phỏng các bảng Sequelize của DALN_JobFind
  const store = {
    cvs: [
      {
        id: 101,
        userId: 10,
        postId: 201,
        isChecked: 0,
        applicationStage: 'SUBMITTED',
        createdAt: new Date(Date.now() - 4 * 3600 * 1000),
        hrViewedAt: null,
        stageUpdatedAt: new Date(Date.now() - 4 * 3600 * 1000),
        postCvData: {
          id: 201,
          userId: 99,
          userPostData: { id: 99, companyId: 500 },
          postDetailData: {
            id: 301,
            name: 'Trưởng nhóm Kinh doanh B2B (Sales Manager)',
            categoryJobCode: 'SALES',
            microTestPrompt: 'Xử lý khách hàng B2B đòi giảm giá 20% trước hạn gia hạn hợp đồng.'
          }
        },
        async update(patch) {
          Object.assign(this, patch);
          return this;
        }
      }
    ],
    companies: [
      {
        id: 500,
        name: 'Công ty Cổ phần Công nghệ & Thương mại VNG',
        allowCvFree: 1,
        allowCv: 5,
        avgResponseHours: null,
        responseRate: 0,
        async update(patch) {
          Object.assign(this, patch);
          return this;
        }
      }
    ],
    users: [
      { id: 10, firstName: 'Nguyễn', lastName: 'Văn Bình', email: 'binh@example.com', phonenumber: '0901234567', address: 'Hà Nội', companyId: null },
      { id: 11, firstName: 'Trần', lastName: 'Thị Hương', email: 'huong@example.com', phonenumber: '0909998888', address: 'TP.HCM', companyId: null },
      { id: 99, firstName: 'Lê', lastName: 'HR', email: 'hr@vng.example.com', phonenumber: '0988777666', address: 'TP.HCM', companyId: 500 }
    ],
    userSettings: [
      {
        userId: 10,
        isFindJob: 1,
        isBlindProfile: true,
        minExpectedSalary: 25,
        blockedCompanyIds: [999], // Không chặn công ty 500
        categoryJobCode: 'SALES',
        experienceJobCode: '3_YEARS',
        addressCode: 'HN',
        userSettingData: {
          toJSON: () => ({ id: 10, firstName: 'Nguyễn', lastName: 'Văn Bình', email: 'binh@example.com', phonenumber: '0901234567', address: 'Hà Nội' })
        }
      },
      {
        userId: 11,
        isFindJob: 1,
        isBlindProfile: true,
        minExpectedSalary: 30,
        blockedCompanyIds: [500], // Đã chặn công ty hiện tại (companyId = 500)
        categoryJobCode: 'ACCOUNTING_HR',
        userSettingData: {
          toJSON: () => ({ id: 11, firstName: 'Trần', lastName: 'Thị Hương', email: 'huong@example.com', phonenumber: '0909998888', address: 'TP.HCM' })
        }
      }
    ],
    userSkills: [
      {
        UserId: 10,
        SkillId: 1,
        isVerified: 0,
        verificationSource: null,
        proofMetadata: null,
        async update(patch) {
          Object.assign(this, patch);
          return this;
        }
      }
    ],
    sessions: [],
    reviews: [],
    invitations: [],
    notifications: [],
    chatMessages: [],
    candidateViews: []
  };

  const mockDb = {
    Cv: {
      findByPk: async (id) => store.cvs.find((c) => c.id === Number(id)) || null,
      findAll: async () => store.cvs
    },
    Post: {
      findByPk: async (id) => ({
        id: Number(id),
        userId: 99,
        postDetailData: {
          name: 'Chuyên viên Digital Marketing',
          categoryJobCode: 'MARKETING',
          descriptionMarkdown: 'Quản lý chiến dịch quảng cáo đa kênh, tối ưu ROAS và конверсия.'
        }
      }),
      findAll: async () => [
        { id: 202, statusCode: 'PS1', postDetailData: { name: 'Chuyên viên Kinh doanh B2B (Fresher/Junior)', categoryJobCode: 'SALES' } },
        { id: 203, statusCode: 'PS1', postDetailData: { name: 'Chuyên viên Tư vấn Khách hàng Doanh nghiệp', categoryJobCode: 'SALES' } },
        { id: 204, statusCode: 'PS1', postDetailData: { name: 'Account Executive', categoryJobCode: 'SALES' } }
      ]
    },
    User: {
      findByPk: async (id) => store.users.find((u) => u.id === Number(id)) || null,
      findAll: async ({ where }) => store.users.filter((u) => !where?.companyId || u.companyId === Number(where.companyId))
    },
    Company: {
      findByPk: async (id) => store.companies.find((c) => c.id === Number(id)) || null,
      update: async (patch, { where }) => {
        const c = store.companies.find((item) => item.id === Number(where.id));
        if (c) Object.assign(c, patch);
        return [1];
      }
    },
    CompanyReview: {
      create: async (payload) => {
        const record = { id: store.reviews.length + 1, ...payload };
        store.reviews.push(record);
        return record;
      }
    },
    UserSetting: {
      findAll: async () => store.userSettings,
      findOne: async ({ where }) => store.userSettings.find((s) => s.userId === Number(where.userId)) || null
    },
    UserSkill: {
      findAll: async ({ where }) => store.userSkills.filter((s) => s.UserId === Number(where.UserId))
    },
    MockInterviewSession: {
      create: async (payload) => {
        const record = {
          id: store.sessions.length + 1,
          ...payload,
          async update(patch) {
            Object.assign(this, patch);
            return this;
          }
        };
        store.sessions.push(record);
        return record;
      },
      findOne: async ({ where }) => store.sessions.find((s) => s.id === Number(where.id)) || null,
      findAll: async ({ where }) => store.sessions.filter((s) => !where?.userId || s.userId === Number(where.userId))
    },
    JobInvitation: {
      create: async (payload) => {
        const record = {
          id: store.invitations.length + 1,
          ...payload,
          async update(patch) {
            Object.assign(this, patch);
            return this;
          }
        };
        store.invitations.push(record);
        return record;
      },
      findOne: async ({ where }) => store.invitations.find((inv) => inv.id === Number(where.id)) || null,
      findAll: async ({ where }) =>
        store.invitations.filter(
          (inv) =>
            (!where?.candidateId || inv.candidateId === Number(where.candidateId)) &&
            (!where?.companyId || inv.companyId === Number(where.companyId))
        )
    },
    Notification: {
      create: async (payload) => {
        store.notifications.push(payload);
        return payload;
      }
    },
    ChatMessage: {
      create: async (payload) => {
        const msg = { id: store.chatMessages.length + 1, ...payload };
        store.chatMessages.push(msg);
        return msg;
      }
    },
    CandidateView: {
      findOrCreate: async ({ defaults }) => {
        store.candidateViews.push(defaults);
        return [defaults, true];
      }
    }
  };

  differentiatorService.setDbOverride(mockDb);

  // Test 1: Generate Micro-Test Prompts cho đa ngành (Sales, Marketing, Kế toán/Nhân sự, IT)
  for (const [title, expectedIndustry] of [
    ['Trưởng phòng Kinh doanh B2B', 'SALES'],
    ['Chuyên viên Content Marketing', 'MARKETING'],
    ['Kế toán tổng hợp & Thuế', 'ACCOUNTING_HR'],
    ['Senior Backend NodeJS Engineer', 'IT']
  ]) {
    const res = await differentiatorService.generateMicroTestPrompts({ jobTitle: title });
    assert.strictEqual(res.errCode, 0);
    assert.strictEqual(res.data.industryKey, expectedIndustry);
    assert.strictEqual(res.data.prompts.length, 3, `Ngành ${expectedIndustry} phải trả về đủ 3 câu hỏi tình huống`);
  }

  // Test 2: Chấm điểm câu trả lời tình huống (evaluateSituationalAnswer) -> chuyển sang AI_SCREENED
  const evalRes = await differentiatorService.evaluateSituationalAnswer({
    cvId: 101,
    userId: 10,
    microTestAnswer: 'Tôi sẽ lắng nghe phản hồi của khách hàng B2B, phân tích ROI tổng thể của giải pháp, đề xuất gói dịch vụ hỗ trợ kỹ thuật ưu tiên và cam kết SLA thay vì giảm giá trực tiếp làm ảnh hưởng biên lợi nhuận.',
    timeSpentSeconds: 185
  });
  assert.strictEqual(evalRes.errCode, 0);
  assert.strictEqual(evalRes.data.applicationStage, 'AI_SCREENED');
  assert.ok(evalRes.data.aiSituationalScore >= 8.0);
  assert.ok(evalRes.data.aiEvaluationSummary.understanding);

  // Test 3: AI Mock Interview (startMockInterview & submitMockInterview & getMyMockInterviewSessions)
  const startMockRes = await differentiatorService.startMockInterview({ userId: 10, postId: 201 });
  assert.strictEqual(startMockRes.errCode, 0);
  assert.strictEqual(startMockRes.data.questions.length, 5, 'Phải tạo đủ 5 câu hỏi phỏng vấn thử theo JD');

  const submitMockRes = await differentiatorService.submitMockInterview({
    sessionId: startMockRes.data.id,
    userId: 10,
    answers: startMockRes.data.questions.map((q) => ({
      questionId: q.id,
      answer: 'Trình bày theo cấu trúc STAR với số liệu kết quả thực tế đạt 125% KPI.'
    }))
  });
  assert.strictEqual(submitMockRes.errCode, 0);
  assert.strictEqual(submitMockRes.data.status, 'COMPLETED');
  assert.ok(submitMockRes.data.overallScore >= 8.0);
  assert.ok(Array.isArray(submitMockRes.data.feedback.cvImprovementTips));

  const myMockSessionsRes = await differentiatorService.getMyMockInterviewSessions({ userId: 10 });
  assert.strictEqual(myMockSessionsRes.errCode, 0);
  assert.strictEqual(myMockSessionsRes.data.length, 1);

  // Test 4: Pizza-Tracker & SLA Phản hồi (HR_VIEWED -> INTERVIEW_SCHEDULED -> Verified Review)
  const stageViewRes = await differentiatorService.updateCvStageWithTracker({
    cvId: 101,
    newStage: 'HR_VIEWED',
    io: mockIo
  });
  assert.strictEqual(stageViewRes.errCode, 0);
  assert.strictEqual(store.cvs[0].applicationStage, 'HR_VIEWED');
  assert.ok(store.cvs[0].hrViewedAt instanceof Date);
  assert.strictEqual(store.companies[0].responseRate, 100);
  assert.ok(emittedEvents.some((e) => e.event === 'cv:stage_updated' && e.room === 'user:10'));

  // Chuyển sang INTERVIEW_SCHEDULED rồi kiểm tra cấp nhãn INTERVIEWED_CANDIDATE khi đánh giá công ty
  await differentiatorService.updateCvStageWithTracker({
    cvId: 101,
    newStage: 'INTERVIEW_SCHEDULED',
    io: mockIo
  });
  const reviewRes = await differentiatorService.createVerifiedReview({
    userId: 10,
    companyId: 500,
    star: 5,
    interviewExperienceRating: 5,
    content: 'Quy trình phỏng vấn minh bạch, HR phản hồi cực nhanh trong 4h.'
  });
  assert.strictEqual(reviewRes.errCode, 0);
  assert.strictEqual(reviewRes.data.verificationType, 'INTERVIEWED_CANDIDATE');
  assert.strictEqual(reviewRes.data.relatedCvId, 101);

  // Test 5: Constructive AI Rejection kèm 3 bài đăng gợi ý
  const rejectRes = await differentiatorService.updateCvStageWithTracker({
    cvId: 101,
    newStage: 'REJECTED',
    hrNote: 'Thiếu kinh nghiệm quản lý đội Sales B2B quy mô trên 20 người',
    io: mockIo
  });
  assert.strictEqual(rejectRes.errCode, 0);
  assert.ok(rejectRes.data.cv.aiFeedbackForCandidate.includes('Thiếu kinh nghiệm quản lý đội Sales B2B'));
  assert.strictEqual(rejectRes.data.suggestedPosts.length, 3);

  // Test 6: Blind Profile Search (Chặn công ty cũ blockedCompanyIds = [500] cho userId 11)
  const blindSearchRes = await differentiatorService.searchCandidatesWithBlindProtection({ companyId: 500 });
  assert.strictEqual(blindSearchRes.errCode, 0);
  assert.strictEqual(blindSearchRes.data.length, 1, 'Phải lọc bỏ ứng viên userId=11 vì đã chặn companyId=500');
  assert.strictEqual(blindSearchRes.data[0].userId, 10);
  assert.strictEqual(blindSearchRes.data[0].candidatePreview.email, '***@***.***');

  // Test 7: Salary Bidding (Offer-First) & Mở khóa 2 chiều khi ACCEPTED + getMyJobInvitations
  const lowBidRes = await differentiatorService.sendReverseJobInvitation({
    recruiterId: 99,
    companyId: 500,
    candidateId: 10,
    postId: 201,
    offeredSalaryMin: 15,
    offeredSalaryMax: 20, // Thấp hơn minExpectedSalary = 25 của ứng viên 10
    pitchMessage: 'Mời bạn ứng tuyển',
    io: mockIo
  });
  assert.strictEqual(lowBidRes.errCode, 2, 'Phải từ chối lời mời có khung lương tối đa thấp hơn kỳ vọng tối thiểu của ứng viên');

  const validBidRes = await differentiatorService.sendReverseJobInvitation({
    recruiterId: 99,
    companyId: 500,
    candidateId: 10,
    postId: 201,
    offeredSalaryMin: 28,
    offeredSalaryMax: 38,
    pitchMessage: 'Mời bạn đảm nhận vị trí Trưởng nhóm Kinh doanh B2B với gói đãi ngộ hấp dẫn.',
    io: mockIo
  });
  assert.strictEqual(validBidRes.errCode, 0);
  assert.strictEqual(store.companies[0].allowCvFree, 1, 'Chưa trừ lượt xem CV khi lời mời mới ở trạng thái PENDING');
  assert.ok(emittedEvents.some((e) => e.event === 'invitation:received' && e.room === 'user:10'));

  const myInvRes = await differentiatorService.getMyJobInvitations({ userId: 10, roleCode: 'CANDIDATE' });
  assert.strictEqual(myInvRes.errCode, 0);
  assert.strictEqual(myInvRes.data.length, 1);

  const acceptBidRes = await differentiatorService.respondToJobInvitation({
    candidateId: 10,
    invitationId: validBidRes.data.id,
    action: 'ACCEPTED',
    io: mockIo
  });
  assert.strictEqual(acceptBidRes.errCode, 0);
  assert.strictEqual(acceptBidRes.data.quotaDeducted, true, 'Phải trừ 1 lượt xem CV sau khi ứng viên bấm ACCEPTED');
  assert.strictEqual(store.companies[0].allowCvFree, 0);
  assert.strictEqual(store.chatMessages.length, 1, 'Phải tự động tạo tin nhắn mở phòng chat giữa HR và ứng viên');
  assert.strictEqual(acceptBidRes.data.unlockedCandidate.email, 'binh@example.com');

  // Test 8: Proof-of-Skill Multi-Industry Portfolio Sync -> updates UserSkill.isVerified = 1
  const proofRes = await differentiatorService.syncGithubPortfolioSkills({
    userId: 10,
    portfolioUrl: 'https://www.behance.net/gallery/sales-b2b-case-study'
  });
  assert.strictEqual(proofRes.errCode, 0);
  assert.strictEqual(store.userSkills[0].isVerified, 1, 'UserSkill phải được đánh dấu isVerified = 1 sau khi đồng bộ Portfolio');

  // Test 9: Skill Gap & ATS Simulator
  const atsRes = await differentiatorService.analyzeSkillGapAndAts({
    userId: 10,
    postId: 201,
    cvText: '5 năm kinh nghiệm Sales B2B, đàm phán hợp đồng, quản lý CRM HubSpot, đạt 130% KPI doanh số.',
    candidateSkills: ['Sales B2B', 'CRM', 'Đàm phán']
  });
  assert.strictEqual(atsRes.errCode, 0);
  assert.ok(atsRes.data.atsScore > 0);
  assert.ok(Array.isArray(atsRes.data.keywordSuggestions));

  console.log('ALL MULTI-INDUSTRY DIFFERENTIATOR & SYNCHRONIZATION TESTS PASSED:', {
    industriesTested: ['SALES', 'MARKETING', 'ACCOUNTING_HR', 'IT'],
    situationalScore: evalRes.data.aiSituationalScore,
    mockInterviewQuestions: startMockRes.data.questions.length,
    mockInterviewScore: submitMockRes.data.overallScore,
    companySlaResponseRate: store.companies[0].responseRate,
    verifiedReviewBadge: reviewRes.data.verificationType,
    constructiveRejectionSuggestions: rejectRes.data.suggestedPosts.length,
    blindCandidatesVisibleToCompany500: blindSearchRes.data.length,
    offerFirstChatCreated: store.chatMessages.length === 1,
    userSkillVerified: store.userSkills[0].isVerified === 1,
    atsSimulatorScore: atsRes.data.atsScore,
    realtimeEventsEmitted: emittedEvents.map((e) => e.event)
  });
}

runTests().catch((err) => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
