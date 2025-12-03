import React from "react";

const CreditInfo = ({ form, setForm, next, prev }) => {
    const handleNext = () => {
        const inq = Number(form.inq_last_6mths);
        const openAcc = Number(form.open_acc);
        const revolBal = Number(form.revol_bal);
        const revolUtil = Number(form.revol_util);
        const bcUtil = Number(form.bc_util);

        if (
            inq === 0 && form.inq_last_6mths !== "0" ||
            openAcc === 0 && form.open_acc !== "0" ||
            revolBal === 0 && form.revol_bal !== "0" ||
            revolUtil === 0 && form.revol_util !== "0" ||
            bcUtil === 0 && form.bc_util !== "0" ||
            !form.inq_last_6mths ||
            !form.open_acc ||
            !form.revol_bal ||
            !form.revol_util ||
            !form.bc_util
        ) {
            alert("Please fill all required fields with valid numbers.");
            return;
        }

        next();
    };

    return (
        <div className="card bg-base-100 shadow-xl p-6 min-h-[690px]">
            <h2 className="text-xl font-bold mb-4">Credit Information</h2>

            <div className="grid gap-4">
                <label htmlFor="inq_last_6mths">Inquiries Last 6 Months</label>
                <input
                    type="number"
                    placeholder="Inquiries Last 6 Months"
                    className="input input-bordered w-full"
                    value={form.inq_last_6mths || ""}
                    onChange={(e) =>
                        setForm({ ...form, inq_last_6mths: e.target.value })
                    }
                    required
                    min="0"
                />

                <label htmlFor="open_acc">Open Accounts</label>
                <input
                    type="number"
                    placeholder="Open Accounts"
                    className="input input-bordered w-full"
                    value={form.open_acc || ""}
                    onChange={(e) =>
                        setForm({ ...form, open_acc: e.target.value })
                    }
                    required
                    min="0"
                />

                <label htmlFor="revol_bal">Revolving Balance</label>
                <input
                    type="number"
                    placeholder="Revolving Balance"
                    className="input input-bordered w-full"
                    value={form.revol_bal || ""}
                    onChange={(e) =>
                        setForm({ ...form, revol_bal: e.target.value })
                    }
                    required
                    min="0"
                />

                <label htmlFor="revol_util">Revolving Utilization (%)</label>
                <input
                    type="number"
                    placeholder="Revolving Utilization (%)"
                    className="input input-bordered w-full"
                    value={form.revol_util || ""}
                    onChange={(e) =>
                        setForm({ ...form, revol_util: e.target.value })
                    }
                    required
                    step="0.01"
                    min="0"
                />
                
                <label htmlFor="bc_util">BC Util (%)</label>
                <input
                    type="number"
                    placeholder="BC Util (%)"
                    className="input input-bordered w-full"
                    value={form.bc_util || ""}
                    onChange={(e) =>
                        setForm({ ...form, bc_util: e.target.value })
                    }
                    required
                    step="0.01"
                    min="0"
                />
            </div>

            <div className="flex gap-3 mt-10">
                <button className="btn flex-1" onClick={prev}>
                    Back
                </button>
                <button className="btn btn-primary flex-1" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CreditInfo;
