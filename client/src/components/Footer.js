const Footer = () => {
    const currentYear = new Date().getFullYear()
  return <footer className='hidden sticky bottom-0 left-[50%] translate-x-[-50%]'>Copyright &#169; Ashop {currentYear}</footer>
}

export default Footer
