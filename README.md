# Lending Club Analytics and Model Serving

A collaborative SFU CMPT 732 project combining distributed loan-data processing, portfolio analysis, borrower segmentation, and a Spark ML classification pipeline. The inference interface connects to a separately configured Databricks serving endpoint.

## Pipeline

`Raw loan records → Spark cleaning → Parquet → issue-year partitions → analysis / model training → MLflow model → server-side serving proxy → React interface`

| Location | Responsibility |
|---|---|
| `notebooks/processing.ipynb` | Data preparation |
| `notebooks/partitioning.ipynb` | Development years 2007–2016, staging 2017, production partition 2018 |
| `notebooks/loan_performance_analysis.ipynb` | Loan performance aggregation |
| `notebooks/financial_portfolio_analysis.ipynb` | Portfolio-level analysis |
| `notebooks/Borrower_Segmentation_Analysis.ipynb` | Borrower clustering and visual analysis |
| `notebooks/model_train.ipynb` | Logistic regression and random forest training / selection |
| `infra/` | Terraform and Azure Data Factory configuration |
| `frontend/api/predict.js` | Server-side model invocation and input validation |

Original team authorship is preserved in Git history. Data analysis and borrower-segmentation contributions can be inspected through the notebook histories.

## Target and evaluation

The target is a **loan-status proxy label**: `Charged Off`, `Default`, and `Late (31-120 days)` map to 1; other statuses map to 0. This does not establish a calibrated probability of eventual default. Loan maturity, label timing, feature availability, and class-specific errors need consideration before interpreting the model.

The development partition is split 80/20 with seed 42. Preprocessing estimators are fitted through the training pipeline. Inverse-frequency class weights are now computed from the training partition only. Staging data is used for model selection, so it is not an untouched final test set.

### Historical recorded metrics

| Model | Internal holdout ROC-AUC | Support-weighted F1 | Accuracy | Staging ROC-AUC |
|---|---:|---:|---:|---:|
| Logistic regression | 0.6926 | 0.6673 | 0.6205 | 0.6935 |
| Random forest | 0.6811 | 0.6407 | 0.5903 | 0.6788 |

These values were copied from committed notebook outputs at revision `f118c754493a46e1fe011e8b8a1759a63ce262cb` and are retained in [results/historical-model-metrics.json](results/historical-model-metrics.json). They precede the training-only weighting correction. Stale notebook outputs have been cleared; the corrected training has **not** been rerun. New metrics require the dataset and a configured Spark environment. PR-AUC, default-class precision/recall, calibration, and final temporal-test results are not claimed here.

## Local frontend checks

Node.js 22 or later and npm are required.

```sh
cd frontend
npm ci
npm run check
```

Tests exercise the serving boundary using mocked responses, including invalid input, missing configuration, upstream failures, and timeouts. The production frontend build is also checked. `npm run dev` previews the UI; serverless API calls require a Vercel development/runtime environment.

## Model-serving configuration

The browser calls the same-origin `/api/predict` function. Only the server reads `DATABRICKS_HOST`, `DATABRICKS_TOKEN`, and `DATABRICKS_ENDPOINT`; none use the `VITE_` prefix. Copy `frontend/.env.example` for local serverless configuration and set the equivalent server environment variables for deployment. Use a least-privilege serving identity. The previous browser-exposed token should be rotated if it was used in a deployed bundle.

The function accepts one row with the documented feature columns, uses a 15-second upstream timeout, and returns sanitized errors. Public deployments still need access control and rate limiting to bound paid model invocations. This update does not deploy or invoke cloud resources. See [Databricks custom-model querying](https://docs.databricks.com/aws/en/machine-learning/model-serving/score-custom-model-endpoints) for the serving request format.

## Running data processing and training

The original notebooks target Databricks and use a provided `spark` session plus configured Azure storage paths. The raw dataset, Azure credentials, and trained model artifacts are not included. The checked-in `REDACTED` values are placeholders and must be replaced through workspace secrets, not committed credentials. `requirements.txt` lists analysis dependencies but does not reproduce a specific Databricks runtime by itself. Match the selected workspace runtime and configure the storage locations before executing the notebooks. Terraform application can create billable resources and is separate from the local checks above.
