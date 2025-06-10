import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface RoomsErrorProps {
    error: string
}

export function RoomsError({ error }: RoomsErrorProps) {
    return (
        <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    )
}
