import ContactButton from "@/components/ContactButton"
import { ReactNode } from "react"

interface CTASectionProps {
    heading: string
    description: ReactNode
    divider?: boolean
    card?: boolean
}

export default function CTASection({ heading, description, divider = true, card = false }: CTASectionProps) {
    if (card) {
        return (
            <section className="page-container py-12">
                <div className="prose prose-xl bg-white shadow-lg rounded-lg p-8 mx-auto text-center">
                    <h2>{heading}</h2>
                    <p>{description}</p>
                    <ContactButton />
                </div>
            </section>
        )
    }

    return (
        <section className="py-12">
            <div className="page-container">
                <div className="prose prose-xl mb-6">
                    <h2>{heading}</h2>
                    <p>{description}</p>
                </div>
                <ContactButton />
            </div>
        </section>
    )
}
