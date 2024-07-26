
type Props = {
    message: string
    success: boolean
}
export const FormMessage= ({message, success}: Props) => {
    return (
        <p className={`${message !== '' ? 'block' : 'hidden'} animate-fadeeout mt-4 border-2 ${success ? 'dark:border-green-500 border-green-400 dark:bg-green-400 bg-green-300' : 'dark:border-red-700 border-red-300 dark:bg-red-900 bg-red-200' }  rounded-lg w-fit p-3 mx-auto`}>{message}</p>
    )
} 