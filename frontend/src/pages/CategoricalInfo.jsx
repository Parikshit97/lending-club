import React from "react";

const CategoricalInfo = ({ form, setForm, next, prev }) => {
    const set = (key, val) => setForm({ ...form, [key]: val });

    const handleNext = () => {
        const validGrades = ["A","B","C","D","E","F","G"];
        const validSubGrades = [
            "A1","A2","A3","A4","A5",
            "B1","B2","B3","B4","B5",
            "C1","C2","C3","C4","C5",
            "D1","D2","D3","D4","D5",
            "E1","E2","E3","E4","E5",
            "F1","F2","F3","F4","F5",
            "G1","G2","G3","G4","G5"
        ];

        // check all required fields
        if (
            !form.term ||
            !form.grade ||
            !form.sub_grade ||
            !form.home_ownership ||
            !form.verification_status ||
            !form.purpose ||
            !form.addr_state
        ) {
            alert("Please fill/select all required fields.");
            return;
        }

        // validate grade
        if (!validGrades.includes(form.grade.toUpperCase())) {
            alert("Grade must be between A and G.");
            return;
        }

        // validate sub_grade
        if (!validSubGrades.includes(form.sub_grade.toUpperCase())) {
            alert("Sub Grade must be in the format A1-G5.");
            return;
        }

        next();
    };

    return (
        <div className="card bg-base-100 shadow-xl p-6 min-h-[690px]">
            <h2 className="text-xl font-bold mb-4">Additional Details</h2>

            <div className="grid gap-4">
                <select
                    className="select select-bordered w-full"
                    value={form.term || ""}
                    onChange={(e) => set("term", e.target.value)}
                >
                    <option hidden>Select Term</option>
                    <option>36 months</option>
                    <option>60 months</option>
                </select>

                <label htmlFor="grade">Grade</label>
                <input
                    type="text"
                    placeholder="Grade (A-G)"
                    className="input input-bordered w-full"
                    value={form.grade || ""}
                    onChange={(e) => set("grade", e.target.value)}
                />

                <label htmlFor="sub_grade">Sub Grade</label>
                <input
                    type="text"
                    placeholder="Sub Grade (A1-G5)"
                    className="input input-bordered w-full"
                    value={form.sub_grade || ""}
                    onChange={(e) => set("sub_grade", e.target.value)}
                />

                <select
                    className="select select-bordered w-full"
                    value={form.home_ownership || ""}
                    onChange={(e) => set("home_ownership", e.target.value)}
                >
                    <option hidden>Home Ownership</option>
                    <option>RENT</option>
                    <option>OWN</option>
                    <option>MORTGAGE</option>
                </select>

                <select
                    className="select select-bordered w-full"
                    value={form.verification_status || ""}
                    onChange={(e) => set("verification_status", e.target.value)}
                >
                    <option hidden>Verification Status</option>
                    <option>Verified</option>
                    <option>Not Verified</option>
                </select>

                <label htmlFor="purpose">Purpose</label>
                <input
                    type="text"
                    placeholder="Purpose (e.g., credit_card)"
                    className="input input-bordered w-full"
                    value={form.purpose || ""}
                    onChange={(e) => set("purpose", e.target.value)}
                />

                <label htmlFor="addr_state">Address State</label>
                <input
                    type="text"
                    placeholder="State (e.g., CA)"
                    className="input input-bordered w-full"
                    value={form.addr_state || ""}
                    onChange={(e) => set("addr_state", e.target.value)}
                />
            </div>

            <div className="flex mt-6 gap-3">
                <button className="btn flex-1" onClick={prev}>
                    Back
                </button>
                <button className="btn btn-primary flex-1" onClick={handleNext}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CategoricalInfo;
