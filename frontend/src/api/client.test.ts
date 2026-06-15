import { api } from './client';

const API_BASE_URL = 'http://localhost:4000';
const USER_ID = 'u_mira';

describe('API client', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ data: {} }) } as any)
    );
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  function mockResponse(data: any, ok = true) {
    return Promise.resolve({ ok, status: ok ? 200 : 400, json: () => Promise.resolve({ data }) });
  }

  it('calls register with correct body', async () => {
    fetchSpy.mockReturnValue(mockResponse({ id: 'u_new' }));
    await api.register({ username: 'new', email: 'new@test.com', password: 'pw' });
    expect(fetchSpy).toHaveBeenCalledWith(
      `${API_BASE_URL}/auth/register`,
      expect.objectContaining({ method: 'POST', body: expect.stringContaining('new@test.com') })
    );
  });

  it('calls me with x-user-id header', async () => {
    fetchSpy.mockReturnValue(mockResponse({ id: USER_ID }));
    await api.me();
    expect(fetchSpy).toHaveBeenCalledWith(
      `${API_BASE_URL}/me`,
      expect.objectContaining({ headers: expect.objectContaining({ 'x-user-id': USER_ID }) })
    );
  });

  it('calls feed', async () => {
    fetchSpy.mockReturnValue(mockResponse({ clips: [] }));
    await api.feed();
    expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/feed`, expect.any(Object));
  });

  it('calls challenges', async () => {
    fetchSpy.mockReturnValue(mockResponse({ challenges: [] }));
    await api.challenges();
    expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/challenges`, expect.any(Object));
  });

  it('calls worldDrop', async () => {
    fetchSpy.mockReturnValue(mockResponse({ nextDrop: '2025-01-01T20:00:00.000Z' }));
    await api.worldDrop();
    expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/world-drop/current`, expect.any(Object));
  });

  it('calls matchSuggestions', async () => {
    fetchSpy.mockReturnValue(mockResponse({ matches: [] }));
    await api.matchSuggestions();
    expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/motion-match/suggestions`, expect.any(Object));
  });

  it('calls chats', async () => {
    fetchSpy.mockReturnValue(mockResponse({ chats: [] }));
    await api.chats();
    expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/chats`, expect.any(Object));
  });

  it('calls storeItems', async () => {
    fetchSpy.mockReturnValue(mockResponse({ items: [] }));
    await api.storeItems();
    expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/store/items`, expect.any(Object));
  });

  it('calls notifications', async () => {
    fetchSpy.mockReturnValue(mockResponse({ notifications: [] }));
    await api.notifications();
    expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/notifications`, expect.any(Object));
  });

  it('throws on non-ok response', async () => {
    fetchSpy.mockReturnValue(mockResponse({ error: 'bad' }, false));
    await expect(api.me()).rejects.toThrow();
  });
});
