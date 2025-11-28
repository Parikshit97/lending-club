import React from "react";

const LoanInfo = ({ form, setForm, next }) => {
    const handleNext = () => {
        const loanAmnt = Number(form.loan_amnt);
        const intRate = Number(form.int_rate);
        const installment = Number(form.installment);
        const dti = Number(form.dti);

        if (!loanAmnt || !intRate || !installment || !dti) {
            alert("Please fill all required fields with valid numbers.");
            return;
        }

        next();
    };

    return (
        <div className="card bg-base-100 shadow-xl p-6  flex flex-col">
            <h2 className="text-xl font-bold mb-4">Loan Information</h2>

            <div className="grid gap-4">

                <label htmlFor="loan_amnt">Loan Amount</label>
                <input
                    type="number"
                    placeholder="Loan Amount"
                    className="input input-bordered w-full"
                    value={form.loan_amnt || ""}
                    onChange={(e) =>
                        setForm({ ...form, loan_amnt: e.target.value })
                    }
                    required
                    min="0"
                />

                <label htmlFor="int_rate">Interest Rate (%)</label>
                <input
                    type="number"
                    placeholder="Interest Rate (%)"
                    className="input input-bordered w-full"
                    value={form.int_rate || ""}
                    onChange={(e) =>
                        setForm({ ...form, int_rate: e.target.value })
                    }
                    required
                    step="0.01"
                    min="0"
                />

                <label htmlFor="installment">Installment</label>
                <input
                    type="number"
                    placeholder="Installment"
                    className="input input-bordered w-full"
                    value={form.installment || ""}
                    onChange={(e) =>
                        setForm({ ...form, installment: e.target.value })
                    }
                    required
                    min="0"
                />

                <label htmlFor="dti">DTI (Debt-to-Income)</label>
                <input
                    type="number"
                    placeholder="DTI (Debt-to-Income)"
                    className="input input-bordered w-full"
                    value={form.dti || ""}
                    onChange={(e) =>
                        setForm({ ...form, dti: e.target.value })
                    }
                    required
                    step="0.01"
                    min="0"
                />
                
            </div>

            <button className="btn btn-primary w-full mt-10" onClick={handleNext}>
                Next
            </button>
        </div>
    );
};

export default LoanInfo;
