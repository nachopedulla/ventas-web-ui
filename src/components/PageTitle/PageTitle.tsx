import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft"
import TooltipIconButton from "../TooltipIconButton/TooltipIconButton"
import { useNavigate } from "react-router-dom"

const PageTitle = ({ text }: { text: string }) => {

    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
            <TooltipIconButton
                icon={<FaArrowLeft size={14} />}
                title="Volver"
                handler={() => { navigate(-1) }}
            />
            <p className='sale-items-title'>{text}</p>
        </div>
    )
}

export default PageTitle;