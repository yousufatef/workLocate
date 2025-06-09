import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Calendar, Home, Menu, Ticket } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";


const Header = () => {
    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="flex flex-col gap-2 py-4 p-6">
                                <Link href="/" className="flex items-center gap-2 text-lg font-bold mb-12">
                                    <img src="/assets/images/worklocate.svg" alt="WorkLocate Logo" className="w-12 h-12" />
                                </Link>
                                <nav className="flex flex-col gap-3">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-xl font-semibold mb-6"
                                    >
                                        <Home className="h-8 w-8" />
                                        <span>Home</span>
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-xl font-semibold mb-6"
                                    >
                                        <Calendar className="h-8 w-8" />
                                        <span>About</span>
                                    </Link>
                                    <Link
                                        href="/services"
                                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-xl font-semibold mb-6"
                                    >
                                        <Ticket className="h-8 w-8" />
                                        <span>Services</span>
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-xl font-semibold mb-6"
                                    >
                                        <Ticket className="h-8 w-8" />
                                        <span>Contact US</span>
                                    </Link>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                        <img src="/assets/images/worklocate.svg" alt="WorkLocate Logo" className="w-12 h-12 max-md:hidden" />
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        About
                    </Link>
                    <Link
                        href="/services"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Services
                    </Link>

                    <Link
                        href="/contact"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Contact US
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <SignedOut>
                        <Button asChild size={"lg"}>
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}

export default Header