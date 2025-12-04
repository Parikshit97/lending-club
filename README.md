# Lending Club 
This is our project for the course CMPT732: Big Data Lab 1 in which we have done advanced distributed data analysis on the Lending Club dataset. Furthermore, we have also trained multiple Machine Learning models on the data, deploying the one with the best performance, and built a frontend to run live inference.

**Frontend URL:** https://lending-club-lemon.vercel.app

## Repository Structure:
```
lending-club/
│
├── dataset/                       # Dataset storage for local development
│   ├── raw/                     
│   ├── processed/           
|    
├── notebooks/                  # Jupyter Notebooks for ETL, Analysis, and Machine Learning
│   ├── processing.ipynb        # ETL
│   └── partitioning.ipynb      # Partition into the 3 categories by year
│   └── loan_performance_analysis.ipynb      # Loan Performance Analysis
│   └── financial_portfolio_analysis.ipynb      # Analyze Financial Ratios & Key Portfolio Metrics
│   └── Borrower_Segmentation_Analysis.ipynb      # Clustering Borrowers
│   └── model_train.ipynb      # Train ML Models, Select and save the one performing best on unseen data
│
├── frontend/                       # React Frontend Project
│   ├── src/                        # React Components
│   ├── vercel.json                 # Vercel Configuration for Deployment
│
├── infra/                     # Infrastructure as Code
│   ├── databricks/             # Databricks Infrastructure
│   ├── ingest/                 # Ingestion Resources
|   ├── dev/                    # Dev Resources
|   ├── stg/                    # Stg Resources
|   ├── prod/                   # Prod Resources
|   ├── ml/                     # ML Resources
|   │   ├── adf_pipeline/       #ARM templates for ADF Pipeline
│
├── .databricks/                    # Azure Databricks Configuration for Git Integration
│
├── requirements.txt            #Requirements for local dev (not needed for our Cloud Setup)
├── .gitignore
└── README.md
```

## Important Notes and Things to Look For:
### Data Analysis:
We have two Data Analysis notebooks that focus on data aggregation: loan_performance_analysis.ipynb and financial_portfolio_analysis.ipynb, with one notebook that focuses on clustering: Borrower_Segmentation_Analysis.ipynb. There is one purely ML-based notebook as well: model_train.ipynb.

Things to Look For:
- **loan_performance_analysis.ipynb:** Contains thorough data analysis on the performance of loans and how they vary with different risk classes. Please refer to the "Summary and Interpretation" markdowns and the charts and graphs, as well as the dataframe outputs for the analysis.
- **financial_portfolio_analysis.ipynb:** This analysis focuses on the financial ratios achieved through the loans and how the loans portfolio is performing for Lending Club, including stuff like Net Cash Flow and Return on Investment (ROI). Again, there are visualizations throughout the notebook and look for the "Summary and Interpretation" markdowns for our analysis on the results.
- **Borrower_Segmentation_Analysis.ipynb:** This notebook attempts to use clustering algorithms to segment different types of borrowers. However, in a normal dev environment (non-databricks), the visualizations from plotly in this notebook will not be visible, as they are in the video demo. This issue did not occur with the other notebooks as they used Seaborn instead of Plotly, which proved to work perfectly across the two platforms.
- **model_train.ipynb:** This notebook uses Spark ML's implementation of the Logistic Regression and Random Forest Classifiers to predict the default flag pseudo-label given relevant columns as features. It follows the techniques we learned in class and utilizes class weights and AUC-ROC metric to overcome the class imbalance we had in our dataset. Again, the markdowns in the notebook explain the exact steps taken, and why.

**PS:** Our notebooks contain some commented out code sections which have been labelled to be for local development. As the final code was run on Azure, that is the one we have kept commented in, but we still left the relevant parts for locally running the project.

### Frontend
We built a basic ReactJS frontend, using TailwindCSS and DaisyUI for a clean User Interface (UI). It was deployed using Vercel at URL: https://lending-club-lemon.vercel.app

### IaC using Terraform:
We have used Terraform to ensure that our complex cloud infrastructure can easily be replicated. Moreover, using IaC serves as a documentation of our infrastructure. 


## Model Serving and Deployment:
To deploy our model, we used the Model Serving feature in Azure Databricks. This allows the model to be saved as an "Experiment" and deployed to a live, managed endpoint. We specify the model's signature (Input/Output Schema) using MLFlow, and Azure Databricks takes care of containerizing and deploying the model pipeline.

### Databricks Experiment:
<img width="1511" alt="image" src="https://media.github.sfu.ca/user/4929/files/4ecf1163-ceda-45b9-9973-61609495adea"> 


### Example Curl Request for Model Endpoint
```
curl --location 'https://adb-2231733496212994.14.azuredatabricks.net/serving-endpoints/lc-model/invocations' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ***' \
--data '{
    "dataframe_split": {
        "index": [
            0
        ],
        "columns": [
            "loan_amnt",
            "int_rate",
            "installment",
            "dti",
            "inq_last_6mths",
            "open_acc",
            "revol_bal",
            "revol_util",
            "bc_util",
            "term",
            "grade",
            "sub_grade",
            "home_ownership",
            "verification_status",
            "purpose",
            "addr_state"
        ],
        "data": [
            [
                10000,
                13.5,
                320.5,
                18.2,
                1,
                10,
                1500,
                45.3,
                30.0,
                "36 months",
                "B",
                "B2",
                "RENT",
                "Verified",
                "credit_card",
                "CA"
            ]
        ]
    }
}'
```
