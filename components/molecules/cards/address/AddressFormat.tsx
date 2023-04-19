import style from './address-format.module.scss';
import {isoToString} from "@util/helper";

interface Props {
    address: any
}

const AddressFormat = ({address}: Props) => {

    return (
        <>
            <div className={style.name}>{address['family_name']} {address['given_name']}</div>
            {address['organization'] &&
            <div className={style.company}>{address['organization']}</div>
            }
            <div className={style.addressDetails}>
                <p>{address['address_line1']}</p>
                {address['administrative_area'] &&
                <>, <p dangerouslySetInnerHTML={{__html: isoToString(address['administrative_area'])}}></p></>
                }
                {address['locality'] &&
                <>, <p>{address['locality']}</p></>
                }
                {address['country_code'] &&
                <>, <p dangerouslySetInnerHTML={{__html: isoToString(address['country_code'])}}></p></>
                }
                {address['postal_code'] &&
                <>, <p>{address['postal_code']}</p></>
                }
            </div>
        </>
    )
}

export default AddressFormat;
