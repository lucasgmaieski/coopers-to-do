
type Props = {
    handleDeleteAll: () => void;
    disabled: boolean;
}
export const ButtonEraseAll= ({ handleDeleteAll, disabled}: Props) => {
    return (
        <button className="w-full bg-black text-white text-2xl font-semibold rounded-[10px] p-4 mt-14 disabled:opacity-70 hover:bg-red-900 transition-colors" onClick={ handleDeleteAll} disabled={disabled}>erase all</button>
    )
} 