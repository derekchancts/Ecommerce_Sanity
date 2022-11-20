import Link from 'next/link';

const Cancel = () => {
  return (
    <div className='cancel-wrapper'>
      <div className='cancel'>
        <div>You have cancelled your order</div>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link> 
      </div>
    </div>
  )
}

export default Cancel