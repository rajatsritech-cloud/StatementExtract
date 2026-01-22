"use client"

import Link from "next/link";
import { Metadata } from "next";

export default function CookiePolicyPage() {
    return (
        <div className="relative mx-auto max-w-3xl px-6 py-12 space-y-10">
            <section className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
                    COOKIE POLICY
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Cookie Policy
                </h1>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Last updated: January 22, 2026</p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">What are cookies?</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Cookies are small text files that are stored on your computer or mobile device when you visit a website.
                    They are widely used to make websites work more efficiently, provide a better user experience,
                    and give website owners information about how their site is being used.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">How we use cookies</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Statement Extract uses cookies and similar technologies for several purposes:
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                    <li>To ensure the website functions properly</li>
                    <li>To remember your preferences and settings</li>
                    <li>To understand how you use our website so we can improve it</li>
                    <li>To deliver relevant advertisements (if applicable)</li>
                    <li>To ensure security and prevent fraud</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Types of cookies we use</h2>

                <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">1. Essential cookies</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    These cookies are necessary for the website to function and cannot be switched off in our systems.
                    They are usually only set in response to actions made by you, such as setting your privacy preferences,
                    logging in, or filling in forms. Without these cookies, the website may not work correctly.
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-[hsl(var(--border))] rounded-lg">
                        <thead className="bg-[hsl(var(--muted))]">
                            <tr>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Cookie Name</th>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Purpose</th>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Duration</th>
                            </tr>
                        </thead>
                        <tbody className="text-[hsl(var(--muted-foreground))]">
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">__clerk_*</td>
                                <td className="px-4 py-2">Authentication and session management</td>
                                <td className="px-4 py-2">Session / 1 year</td>
                            </tr>
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">cookie-consent</td>
                                <td className="px-4 py-2">Stores your cookie consent preferences</td>
                                <td className="px-4 py-2">1 year</td>
                            </tr>
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">statement-extract-theme</td>
                                <td className="px-4 py-2">Stores your theme preference (light/dark)</td>
                                <td className="px-4 py-2">1 year</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mt-4">2. Analytics cookies</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance
                    of our site. They help us understand which pages are the most and least popular and see how visitors
                    move around the site.
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-[hsl(var(--border))] rounded-lg">
                        <thead className="bg-[hsl(var(--muted))]">
                            <tr>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Cookie Name</th>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Provider</th>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Purpose</th>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Duration</th>
                            </tr>
                        </thead>
                        <tbody className="text-[hsl(var(--muted-foreground))]">
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">_ga</td>
                                <td className="px-4 py-2">Google Analytics</td>
                                <td className="px-4 py-2">Distinguishes unique users</td>
                                <td className="px-4 py-2">2 years</td>
                            </tr>
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">_ga_*</td>
                                <td className="px-4 py-2">Google Analytics</td>
                                <td className="px-4 py-2">Persists session state</td>
                                <td className="px-4 py-2">2 years</td>
                            </tr>
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">_clck</td>
                                <td className="px-4 py-2">Microsoft Clarity</td>
                                <td className="px-4 py-2">Persists Clarity User ID</td>
                                <td className="px-4 py-2">1 year</td>
                            </tr>
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">_clsk</td>
                                <td className="px-4 py-2">Microsoft Clarity</td>
                                <td className="px-4 py-2">Connects pageviews to session</td>
                                <td className="px-4 py-2">1 day</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mt-4">3. Advertising cookies</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    These cookies may be set through our site by our advertising partners. They may be used by those
                    companies to build a profile of your interests and show you relevant adverts on other sites.
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-[hsl(var(--border))] rounded-lg">
                        <thead className="bg-[hsl(var(--muted))]">
                            <tr>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Cookie Name</th>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Provider</th>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Purpose</th>
                                <th className="px-4 py-2 text-left text-[hsl(var(--foreground))]">Duration</th>
                            </tr>
                        </thead>
                        <tbody className="text-[hsl(var(--muted-foreground))]">
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">__gads</td>
                                <td className="px-4 py-2">Google AdSense</td>
                                <td className="px-4 py-2">Ad targeting and measurement</td>
                                <td className="px-4 py-2">13 months</td>
                            </tr>
                            <tr className="border-t border-[hsl(var(--border))]">
                                <td className="px-4 py-2 font-mono text-xs">__gpi</td>
                                <td className="px-4 py-2">Google AdSense</td>
                                <td className="px-4 py-2">Collects data on visitor behaviour</td>
                                <td className="px-4 py-2">13 months</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Managing your cookie preferences</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    When you first visit our website, you will see a cookie consent banner that allows you to accept
                    or decline non-essential cookies. You can change your preferences at any time.
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    You can also control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                    <li>See what cookies you have and delete them on an individual basis</li>
                    <li>Block third-party cookies</li>
                    <li>Block cookies from particular sites</li>
                    <li>Block all cookies from being set</li>
                    <li>Delete all cookies when you close your browser</li>
                </ul>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Please note that if you block or delete cookies, some features of our website may not work correctly.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">How to manage cookies in your browser</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Here are links to instructions for managing cookies in common browsers:
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                    <li>
                        <a
                            href="https://support.google.com/chrome/answer/95647"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--primary))] hover:underline"
                        >
                            Google Chrome
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--primary))] hover:underline"
                        >
                            Mozilla Firefox
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--primary))] hover:underline"
                        >
                            Safari
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--primary))] hover:underline"
                        >
                            Microsoft Edge
                        </a>
                    </li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Third-party opt-out</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    You can also opt out of third-party cookies used for advertising through these services:
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                    <li>
                        <a
                            href="https://www.google.com/settings/ads"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--primary))] hover:underline"
                        >
                            Google Ads Settings
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.aboutads.info/choices/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--primary))] hover:underline"
                        >
                            Digital Advertising Alliance (DAA)
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.youronlinechoices.eu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--primary))] hover:underline"
                        >
                            European Interactive Digital Advertising Alliance (EDAA)
                        </a>
                    </li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Updates to this policy</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    We may update this Cookie Policy from time to time to reflect changes in the cookies we use or
                    for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay
                    informed about our use of cookies.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Contact us</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    <span className="block">Email: support@statementextract.com</span>
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    For more information about how we handle your personal data, please see our{" "}
                    <Link href="/privacy-policy/" className="text-[hsl(var(--primary))] hover:underline">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </section>
        </div>
    );
}
