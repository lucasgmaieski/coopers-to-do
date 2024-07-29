"use client"

type Props = {
  children: React.ReactNode;
  onClick: () => void;
}

export function AuthButton({children, onClick}: Props) {
  return (
    <button 
      type="button" 
      className="bg-black text-white py-2 sm:py-[10px] px-6 sm:px-10 font-poppins font-semibold hover:bg-gray-800 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  )
}