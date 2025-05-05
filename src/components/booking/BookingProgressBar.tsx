import { CheckCircle } from "lucide-react"

interface BookingProgressBarProps {
    currentStep: number
}

export function BookingProgressBar({ currentStep }: BookingProgressBarProps) {
    const steps = [
        { id: 1, name: "Booking" },
        { id: 2, name: "Payment" },
        { id: 3, name: "Confirmation" },
    ]

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        {/* Step circle */}
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                }`}
                        >
                            {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : <span>{step.id}</span>}
                        </div>

                        {/* Step name */}
                        <span
                            className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {step.name}
                        </span>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div className={`ml-4 h-0.5 w-16 md:w-32 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
