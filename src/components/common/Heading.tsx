const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <h2 className="text-2xl font-bold text-primary mb-1"> {children}</h2 >
    )
}

export default Heading