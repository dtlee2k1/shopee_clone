export default function Footer() {
  return (
    <footer className=' bg-neutral-100'>
      <div className='m-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 gap-4 border-t border-t-black/10 py-10 text-sm text-black/50 lg:grid-cols-3 '>
          <div className='lg:col-span-1'>
            <div className=''>&copy; {new Date().getFullYear()} Shopee. Tất cả các quyền được bảo lưu.</div>
          </div>
          <div className='lg:col-span-2'>
            <div className='flex flex-wrap'>
              <span className='px-1'>Quốc gia & Khu vực:</span>
              <div className='border-r border-r-black/20 px-1'>Singapore</div>
              <div className='border-r border-r-black/20 px-1'>Indonesia</div>
              <div className='border-r border-r-black/20 px-1'>Đài Loan</div>
              <div className='border-r border-r-black/20 px-1'>Thái Lan</div>
              <div className='border-r border-r-black/20 px-1'>Malaysia</div>
              <div className='border-r border-r-black/20 px-1'>Việt Nam</div>
              <div className='border-r border-r-black/20 px-1'>Philippines</div>
              <div className='border-r border-r-black/20 px-1'>Brazil</div>
              <div className='border-r border-r-black/20 px-1'>México</div>
              <div className='border-r border-r-black/20 px-1'>Colombia</div>
              <div className='px-1'>Chile</div>
            </div>
          </div>
        </div>
      </div>
      <div className='m-auto max-w-7xl px-4 py-9 text-xs text-black/50'>
        <div className='mb-10 flex justify-center uppercase'>
          <div className='border-r border-r-black/10 px-6'>Chính sách bảo mật</div>
          <div className='border-r border-r-black/10 px-6 px-6'>Quy chế hoạt động</div>
          <div className='border-r border-r-black/10 px-6 px-6'>Chính sách vận chuyển</div>
          <div className='px-6'>Chính sách trả hàng và hoàn tiền</div>
        </div>
        <div className='m-auto mb-2 flex justify-center gap-10'>
          <div className="h-11 w-28 bg-[url('./footer-registered.png')] bg-[length:551.6666666666666%_477.77777777777777%] bg-[14.391143911439114%_99.41176470588235%]"></div>
          <div className="h-11 w-28 bg-[url('./footer-registered.png')] bg-[length:551.6666666666666%_477.77777777777777%] bg-[14.391143911439114%_99.41176470588235%]"></div>
          <div className="h-12 w-12 bg-[url('./footer-registered.png')] bg-[length:1379.1666666666667%_447.9166666666667%] bg-[1.6286644951140066%_92.21556886227545%]"></div>
        </div>
        <div className='text-center text-xs text-black/60 '>
          <div className='mb-6'>Công ty TNHH Shopee</div>
          <div className='mt-2'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>&copy; 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}
