export default function TermsPage() {
    return (
        <div className="container mx-auto py-16 px-6 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

            <div className="space-y-6 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using X Growth, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily use X Growth for personal, non-commercial transitory viewing only.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. Service Description</h2>
                    <p>
                        X Growth is a tool designed to help you grow your X (Twitter) presence through automated engagement and content generation.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Responsibilities</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Disclaimer</h2>
                    <p>
                        The service is provided "as is" without any warranties, expressed or implied.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact</h2>
                    <p>
                        For any questions about these Terms, please contact us through our GitHub repository.
                    </p>
                </section>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
}
