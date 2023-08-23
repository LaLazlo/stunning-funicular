export const InlineError = ({text}) =>{
    return (
        <div className="mx-6">
            <p className="text-red-500 text-sm">
                {text}
            </p>
        </div>
    )
}