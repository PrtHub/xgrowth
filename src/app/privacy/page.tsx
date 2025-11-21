export default function PrivacyPage() {
    return (
        <div className="container mx-auto py-16 px-6 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="space-y-6 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us when you create an account, including your X (Twitter) profile information through OAuth authentication.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Generate AI-powered content suggestions</li>
                        <li>Automate engagement with your target audience</li>
                        <li>Send you notifications about your X account activity</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Storage</h2>
                    <p>
                        Your data is securely stored using Convex, a backend-as-a-service platform. We implement appropriate security measures to protect your information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Services</h2>
                    <p>
                        We use the following third-party services:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>X (Twitter) API for authentication and posting</li>
                        <li>OpenAI for AI-powered content generation</li>
                        <li>Telegram for notifications</li>
                        <li>Convex for data storage</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Sharing</h2>
                    <p>
                        We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this privacy policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information at any time by contacting us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us through our GitHub repository.
                    </p>
                </section>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
}
