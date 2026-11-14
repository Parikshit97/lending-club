export async function predict(formData) {
  const payload = {
    dataframe_split: {
      index: [0],
      columns: [
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
      data: [[
        Number(formData.loan_amnt),
        Number(formData.int_rate),
        Number(formData.installment),
        Number(formData.dti),
        Number(formData.inq_last_6mths),
        Number(formData.open_acc),
        Number(formData.revol_bal),
        Number(formData.revol_util),
        Number(formData.bc_util),
        formData.term,
        formData.grade,
        formData.sub_grade,
        formData.home_ownership,
        formData.verification_status,
        formData.purpose,
        formData.addr_state
      ]]
    }
  };

  try {
   const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });

    if (!res.ok) {
      const text = await res.text();
      console.error("ERROR RESPONSE:", text);
      throw new Error(text);
    }

    return await res.json();

  } catch (err) {
    console.error("Request failed", err);
    throw err;
  }
}
