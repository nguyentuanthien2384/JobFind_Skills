'use strict';

const differentiatorController = require('./differentiatorController');

module.exports = {
  searchBlindCandidates: differentiatorController.handleSearchBlindCandidates,
  sendJobInvitation: differentiatorController.handleSendJobInvitation,
  respondJobInvitation: differentiatorController.handleRespondJobInvitation,
  getMyJobInvitations: differentiatorController.handleGetMyJobInvitations
};
