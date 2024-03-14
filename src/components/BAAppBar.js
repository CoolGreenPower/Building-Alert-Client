import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Colors from '../constants/Colors';

export default function BAAppBar(props) {
    const history = useHistory();

    // Check if there's a previous route in the history stack
    const hasBackStack = history.length > 2;
    return <>
        <div className={`${props.className} flex justify-start items-center py-2 border-b-[1px] border-black`} style={{ height: "75px" }} >
            {props.leading ? props.leading : hasBackStack ?
                <ArrowBackIosNewIcon
                    className='mr-4 cursor-pointer'
                    onClick={() => history.goBack()}
                    color={Colors.primary}
                />
                : <></>}
            <div className="grow">
                <h4 className="font-bold text-primaryColor">{props.title}</h4>
            </div>
            {props.trailing ? props.trailing : <></>}
        </div>
    </>
}