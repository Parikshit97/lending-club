import { useEffect, useState } from "react";
import { predict } from "../api/predict";

export default function Result({ form, prev }) {
    const [result, setResult] = useState(null);

    useEffect(() => {
        async function run() {
            const res = await predict(form);
            console.log("Prediction result:", res);
            setResult(res.predictions[0]);
        }
        run();
    }, []);

    return (
        <div className="card bg-base-100 shadow-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Prediction Result</h2>

            {result === null && (
                <div className="flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {result !== null && (
                <div className="mt-8">
                    <div
                        className={`text-xl font-bold p-6 rounded-xl text-white ${
                            result === 0 ? "bg-green-600" : "bg-red-600"
                        }`}
                    >
                        {result === 0
                            ? "Low Default Risk"
                            : "High Default Risk"}
                    </div>
                </div>
            )}
            <button onClick={prev} className="btn btn-outline mt-6">
                ← Back
            </button>
        </div>
    );
}
