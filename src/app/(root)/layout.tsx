import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}