const API_BASE_URL = 'http://localhost:4000';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': 'u_mira',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const envelope = await response.json();
  return envelope.data;
}

export const api = {
  // Auth
  session: (provider: string, token?: string) =>
    request('/auth/session', { method: 'POST', body: JSON.stringify({ provider, token }) }),
  register: (data: Record<string, string>) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/me'),
  updateProfile: (data: Record<string, string>) =>
    request('/me/profile', { method: 'PATCH', body: JSON.stringify(data) }),
  updateSettings: (data: Record<string, unknown>) =>
    request('/me/settings', { method: 'PATCH', body: JSON.stringify(data) }),
  settings: () => request('/me/settings'),
  deleteAccount: () => request('/me', { method: 'DELETE' }),

  // Users
  users: () => request('/users'),
  user: (id: string) => request(`/users/${id}`),
  follow: (id: string) => request(`/users/${id}/follow`, { method: 'POST' }),
  unfollow: (id: string) => request(`/users/${id}/follow`, { method: 'DELETE' }),

  // Content
  feed: () => request('/feed'),
  clips: () => request('/clips'),
  clip: (id: string) => request(`/clips/${id}`),
  likeClip: (id: string) => request(`/clips/${id}/like`, { method: 'POST' }),
  unlikeClip: (id: string) => request(`/clips/${id}/like`, { method: 'DELETE' }),
  saveClip: (id: string) => request(`/clips/${id}/save`, { method: 'POST' }),
  shareClip: (id: string, targetId?: string) =>
    request(`/clips/${id}/share`, { method: 'POST', body: JSON.stringify({ targetId }) }),
  comments: (clipId: string) => request(`/clips/${clipId}/comments`),
  addComment: (clipId: string, body: string) =>
    request(`/clips/${clipId}/comments`, { method: 'POST', body: JSON.stringify({ body }) }),
  shareTargets: (clipId: string) => request(`/clips/${clipId}/share-targets`),

  // Duels
  challenges: () => request('/challenges'),
  createDuel: (challengeId: string, opponentId?: string) =>
    request('/duels', { method: 'POST', body: JSON.stringify({ challengeId, opponentId }) }),
  joinDuel: (id: string) => request(`/duels/${id}/join`, { method: 'POST' }),
  duel: (id: string) => request(`/duels/${id}`),
  submitDuel: (id: string, clipId: string, motionVector?: unknown) =>
    request(`/duels/${id}/submit`, { method: 'POST', body: JSON.stringify({ clipId, motionVector }) }),
  reactDuel: (id: string, reaction: string) =>
    request(`/duels/${id}/react`, { method: 'POST', body: JSON.stringify({ reaction }) }),
  leaderboards: () => request('/leaderboards'),

  // World Drop
  worldDrop: () => request('/world-drop/current'),
  enterWorldDrop: (id: string) => request(`/world-drop/${id}/enter`, { method: 'POST' }),
  submitWorldDrop: (id: string) => request(`/world-drop/${id}/submit`, { method: 'POST' }),
  worldDropLeaderboard: (id: string) => request(`/world-drop/${id}/leaderboard`),

  // Motion Match
  matchSuggestions: () => request('/motion-match/suggestions'),
  matchHeart: (id: string) => request(`/motion-match/${id}/heart`, { method: 'POST' }),
  matchDuel: (id: string) => request(`/motion-match/${id}/duel`, { method: 'POST' }),

  // Chats
  chats: () => request('/chats'),
  messages: (chatId: string) => request(`/chats/${chatId}/messages`),
  sendMessage: (chatId: string, body: string) =>
    request(`/chats/${chatId}/messages`, { method: 'POST', body: JSON.stringify({ body }) }),

  // Store & Payments
  storeItems: () => request('/store/items'),
  createOrder: (sku: string, amountPaise: number) =>
    request('/payments/razorpay/order', { method: 'POST', body: JSON.stringify({ sku, amountPaise }) }),

  // Wallet
  wallet: () => request('/me/wallet'),
  tokenLedger: () => request('/me/token-ledger'),
  earnTokens: (amount: number, reason: string) =>
    request('/tokens/earn', { method: 'POST', body: JSON.stringify({ amount, reason }) }),
  spendTokens: (amount: number, reason: string) =>
    request('/tokens/spend', { method: 'POST', body: JSON.stringify({ amount, reason }) }),

  // Notifications
  notifications: () => request('/notifications'),

  // Visor AI
  visorChat: (message: string, provider?: string, history?: { role: string; content: string }[]) =>
    request('/visor/chat', { method: 'POST', body: JSON.stringify({ message, provider: provider ?? 'ollama', history }) }),
  visorModels: () => request('/visor/models'),

  // Admin
  reports: () => request('/admin/reports'),
};
