import style from "./product.module.scss";
import Link from "next/link";
import Image from "next/image";
import {priceFormatted} from "@util/helper";


interface Props {
    displayType: Array<string>,
    path: string,
    media: Array<Object>,
    title: string,
    body: Array<String>,
    variations: Array<Object>
}

const Product = ({displayType, path, media, title, body, variations}: Props) => {
    let bodyResult:string = body[0]['summary'];
    return(
        <Link href={path}>
            <div className={style.card}>
                {Object.keys(media).length &&
                    <div className={style.image}>
                        <Image src={media['url']} alt={media['alt']} width={480} height={480}/>
                    </div>
                }
                <h3 className={style.title} dangerouslySetInnerHTML={{__html:title}}></h3>
                <div className={style.body} dangerouslySetInnerHTML={{__html:bodyResult}}></div>
                {variations.length && variations[0]['price'] > 0 &&
                <div className={style.price}>{priceFormatted(variations[0]['price'], variations[0]['currency'])}</div>
                }
            </div>
        </Link>
    )
};

export default Product;
