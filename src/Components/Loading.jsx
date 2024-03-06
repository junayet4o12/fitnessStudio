
import { BallTriangle } from "react-loader-spinner";
    
const Loading = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4299e1"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}; 

export default Loading;