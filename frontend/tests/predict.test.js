import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import predict from '../api/predict.js';

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
afterEach(() => { globalThis.fetch = originalFetch; process.env = { ...originalEnv }; });
const body = () => ({ dataframe_split: {
  columns: ['loan_amnt', 'int_rate', 'installment', 'dti', 'inq_last_6mths', 'open_acc', 'revol_bal', 'revol_util', 'bc_util', 'term', 'grade', 'sub_grade', 'home_ownership', 'verification_status', 'purpose', 'addr_state'],
  data: [[1000, 12, 40, 15, 1, 3, 100, 20, 10, '36 months', 'B', 'B1', 'RENT', 'Verified', 'other', 'CA']],
} });
function response() {
  return { status(code) { this.code = code; return this; }, json(value) { this.body = value; return this; }, setHeader() {} };
}
function configure() { process.env.DATABRICKS_HOST = 'https://workspace.example.com'; process.env.DATABRICKS_TOKEN = 'test-only-secret'; }

test('rejects unsupported methods and malformed data before any upstream request', async () => {
  globalThis.fetch = () => { throw Error('must not call upstream'); };
  let res = response(); await predict({ method: 'GET' }, res); assert.equal(res.code, 405);
  res = response(); await predict({ method: 'POST', body: {} }, res); assert.equal(res.code, 400);
  const invalid = body(); invalid.dataframe_split.data[0][0] = null;
  res = response(); await predict({ method: 'POST', body: invalid }, res); assert.equal(res.code, 400);
});
test('returns 503 when server credentials are absent', async () => {
  delete process.env.DATABRICKS_TOKEN;
  const res = response(); await predict({ method: 'POST', body: body() }, res); assert.equal(res.code, 503);
});
test('sends credentials only to the configured model host and returns predictions', async () => {
  configure();
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://workspace.example.com/serving-endpoints/lc-model/invocations');
    assert.equal(options.headers.Authorization, 'Bearer test-only-secret');
    return { ok: true, json: async () => ({ predictions: [{ prediction: 0 }] }) };
  };
  const res = response(); await predict({ method: 'POST', body: body() }, res);
  assert.equal(res.code, 200); assert.deepEqual(res.body, { predictions: [{ prediction: 0 }] });
  assert.ok(!JSON.stringify(res.body).includes('test-only-secret'));
});
test('does not expose upstream errors or credentials', async () => {
  configure(); globalThis.fetch = async () => ({ ok: false, text: async () => 'private debug output' });
  const res = response(); await predict({ method: 'POST', body: body() }, res);
  assert.equal(res.code, 502); assert.ok(!JSON.stringify(res.body).includes('private debug'));
});
test('distinguishes upstream timeouts', async () => {
  configure(); globalThis.fetch = async () => { throw new DOMException('timed out', 'TimeoutError'); };
  const res = response(); await predict({ method: 'POST', body: body() }, res); assert.equal(res.code, 504);
});
