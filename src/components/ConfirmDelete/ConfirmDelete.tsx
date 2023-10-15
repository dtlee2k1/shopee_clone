interface ConfirmDeleteProps {
  quantity: number
  onConfirm: () => void
  onCloseModal?: () => void
  disabled?: boolean
}

export default function ConfirmDelete({ quantity, onConfirm, onCloseModal }: ConfirmDeleteProps) {
  return (
    <>
      <div className='text-[#333]'>Bạn có muốn bỏ {quantity} sản phẩm?</div>
      <div className='mt-9 flex justify-end gap-6'>
        <button
          className='min-h-[2.5rem] w-24 rounded-sm bg-primary text-sm uppercase text-white shadow-sm transition-colors hover:opacity-90'
          onClick={onCloseModal}
        >
          Trở lại
        </button>
        <button
          className='min-h-[2.5rem] w-24 rounded-sm bg-none text-sm uppercase text-[#555] transition-colors hover:bg-[#f8f8f8] '
          onClick={() => {
            onConfirm()
            onCloseModal && onCloseModal()
          }}
        >
          Có
        </button>
      </div>
    </>
  )
}
