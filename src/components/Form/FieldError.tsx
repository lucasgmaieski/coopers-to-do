
type Props = {
    color?: string
    message?: string
}
export const FieldError= ({color, message}: Props) => {
    return (
        <p className={`text-base sm:text-lg sm:leading-5 pl-2 font-normal ${color ? color : 'text-red-500'}`}>
            {message}
        </p>
    )
} 