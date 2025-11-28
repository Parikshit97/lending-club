import { useState } from "react";
import LoanInfo from "./pages/LoanInfo";
import CreditInfo from "./pages/CreditInfo";
import CategoricalInfo from "./pages/CategoricalInfo";
import Result from "./pages/Result";

function App() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({});

    const next = () => setStep(step + 1);
    const prev = () => setStep(step - 1);

    return (
        <div className="min-h-screen bg-base-200 p-6 flex justify-center items-center">

            <div className="w-full max-w-2xl ">
                <h1 className="text-4xl font-bold text-foreground mb-3 justify-center flex">
                    Loan Prediction System
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto justify-center flex mb-8">
                    Get instant predictions for your loan application using our
                    advanced AI model.
                </p>
                {/* Steps indicator */}
                <ul className="steps mb-6 w-full">
                    <li className={`step ${step >= 1 && "step-primary"}`}>
                        Loan
                    </li>
                    <li className={`step ${step >= 2 && "step-primary"}`}>
                        Credit
                    </li>
                    <li className={`step ${step >= 3 && "step-primary"}`}>
                        Details
                    </li>
                    <li className={`step ${step >= 4 && "step-primary"}`}>
                        Result
                    </li>
                </ul>

                {step === 1 && (
                    <LoanInfo form={form} setForm={setForm} next={next} />
                )}
                {step === 2 && (
                    <CreditInfo
                        form={form}
                        setForm={setForm}
                        next={next}
                        prev={prev}
                    />
                )}
                {step === 3 && (
                    <CategoricalInfo
                        form={form}
                        setForm={setForm}
                        next={next}
                        prev={prev}
                    />
                )}
                {step === 4 && <Result form={form} prev={prev} />}
            </div>
        </div>
    );
}

export default App;
