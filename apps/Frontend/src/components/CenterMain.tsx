
import HomePage from "./HomePage";
import LeftSide from "./LeftSide";

export default function CenterMain(){
    return(
        <>
            <div className="w-full h-full bg-blue-600 flex justify-between overflow-hidden">
                <div className="flex-1">
                    <HomePage />
                </div>
                <div className="flex-1">
                    <LeftSide />
                </div>
            </div>
        </>
    )
}