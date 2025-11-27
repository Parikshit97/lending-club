# Lending Club 
This is our project for the course CMPT732: Big Data Lab 1 in which we will be doing advanced distributed data analysis on the Lending Club dataset. Moreover, we will be training a Machine Learning model on the data and create a web-service around it. 

## Details:

<img width="1511" alt="image" src="https://media.github.sfu.ca/user/4929/files/4ecf1163-ceda-45b9-9973-61609495adea">


  
## Curl Request

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
