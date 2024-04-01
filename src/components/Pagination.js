import classNames from "classnames";
import img from '../assets/filler-image.jpg'; 
import './Pagination.css'
import './PaginationItem.css'
import { Loader } from "./Loader";

const range = (start, end) => {
    return [...Array(end).keys()].map((el) => el + start)
};

const PaginationItem = ({ page, currentPage, onPageChange }) => {
    const liClasses = classNames({
        'page-item': true,
        active: page === currentPage
    })


    return (
        <li className={liClasses} onClick={() => onPageChange(page)}>
            <span className="page-link">{page}</span>
        </li>
    )
}


const Pagination = ({ currentPage, total, limit, onPageChange, imageArray, isLoading, bubbleArray}) => {
    const pagesCount = Math.ceil(total / limit);
    const pages = range(1, pagesCount);


    
    return (
        <div className=" flex flex-col justify-center items-center mt-4">
            <div className="border-4 border-white  rounded-md">
                {
                    isLoading ? (
                        <div className='object-cover h-[32rem] w-[32rem] flex justify-center items-center'> 
                            <Loader /> 
                        </div>
                    ) :
                    
                    imageArray[currentPage - 1]  ? 
                        (
                            <div className="relative">
                                <img src={imageArray[currentPage - 1]} alt={`Fetched  `} />
                                
                                {
                                    bubbleArray[currentPage-1] ? (
                                        <div className="speech top-right">{bubbleArray[currentPage-1]}</div>
    
                                    )
                                     : null
                                }
                                

                            </div>

                        ) :
                        (
                            <div  className="relative">
                                <img src={img} alt={`filler `} 
                                    className="object-cover h-auto w-full max-h-[32rem] max-w-[32rem]  "
                                 />

                            </div>

                        )
                    
                }

            </div>
            <ul className="pagination">
                {pages.map(page => (
                    <PaginationItem
                        page={page}
                        key={page}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                ))}
            </ul>
        </div>

    )
};
export default Pagination;