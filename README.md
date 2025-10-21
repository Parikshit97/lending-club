# CMPT 732 Final Project — Napoleans Team

## 📘 Overview
This repository contains our final project for **CMPT 732: Big Data Systems** at Simon Fraser University (Fall 2025).

**Team Members:**
- Parikshit Narang (pna42)
- Raheem Nabeel
- Shreyank
- Parikshit Narang

**Instructor:** Greg Baker

---

## 🚀 Project Description
Our project explores [brief one-liner about your topic, e.g., *"Analyzing stock market sentiment using large-scale tweet data and Spark ML pipelines."*]

### Objectives
- [ ] Build scalable ETL pipelines using Spark
- [ ] Perform data cleaning and aggregation
- [ ] Apply distributed machine learning / analytics
- [ ] Visualize and interpret key findings

---

## 🧠 Technologies
- Apache Spark (PySpark)
- Hadoop / Databricks / Azure (if applicable)
- Python 3.10
- Pandas, Matplotlib, Seaborn
- Git & GitHub for version control

---

## 📊 Data Source
- [Describe your dataset, e.g., Kaggle / API / scraped data]
- Stored in `/data/raw` and `/data/processed`

---

## ⚙️ Running the Project

```bash
# Run ETL job
spark-submit src/etl/clean_data.py data/raw data/processed

# Run analysis
spark-submit src/analysis/correlation_analysis.py

# Run visualization notebook
jupyter notebook notebooks/analysis.ipynb
