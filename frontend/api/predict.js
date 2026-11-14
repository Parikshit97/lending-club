const numericColumns = ['loan_amnt', 'int_rate', 'installment', 'dti', 'inq_last_6mths', 'open_acc', 'revol_bal', 'revol_util', 'bc_util'];
const categoricalColumns = ['term', 'grade', 'sub_grade', 'home_ownership', 'verification_status', 'purpose', 'addr_state'];
const columns = [...numericColumns, ...categoricalColumns];

export default async function predict(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }
  let payload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const split = payload?.dataframe_split;
    const row = split?.data?.[0];
    if (!Array.isArray(split?.columns) || JSON.stringify(split.columns) !== JSON.stringify(columns) ||
        !Array.isArray(split.data) || split.data.length !== 1 || !Array.isArray(row) || row.length !== columns.length ||
        !row.slice(0, numericColumns.length).every(value => typeof value === 'number' && Number.isFinite(value)) ||
        !row.slice(numericColumns.length).every(value => typeof value === 'string' && value.length > 0 && value.length <= 100)) {
      return res.status(400).json({ error: 'Provide one row matching the loan feature schema.' });
    }
    payload = { dataframe_split: { columns, data: [row] } };
  } catch {
    return res.status(400).json({ error: 'Invalid JSON request.' });
  }
  const host = process.env.DATABRICKS_HOST;
  const token = process.env.DATABRICKS_TOKEN;
  const endpoint = process.env.DATABRICKS_ENDPOINT || 'lc-model';
  if (!host || !token || !/^https:\/\/[a-zA-Z0-9.-]+\/?$/.test(host) || !/^[a-zA-Z0-9_.-]+$/.test(endpoint)) {
    return res.status(503).json({ error: 'Model serving is not configured.' });
  }
  try {
    const upstream = await fetch(`${host.replace(/\/$/, '')}/serving-endpoints/${endpoint}/invocations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (!upstream.ok) {
      return res.status(502).json({ error: 'The model service could not complete this request.' });
    }
    return res.status(200).json(await upstream.json());
  } catch (error) {
    const timeout = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    return res.status(timeout ? 504 : 502).json({ error: timeout ? 'The model service timed out.' : 'The model service is unavailable.' });
  }
}
