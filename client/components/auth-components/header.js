
const Header = ({
    heading,
    paragraph,
    linkName,
    linkUrl,
    imgUrl
}) => {
    return(
        <div className="mb-3">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-20 w-20"
                    src={imgUrl}/>
            </div>
            <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <button to={linkUrl} className="font-medium text-primary-600 hover:text-primary-500">
                {linkName}
            </button>
            </p>
        </div>
    )
}

export default Header;