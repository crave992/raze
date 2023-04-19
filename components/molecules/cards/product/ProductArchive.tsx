import Link
    from "next/link";
import style
    from "./product-archive.module.scss" ;
import Image
    from "next/image";

interface Props {
    item:  Array<any>
}

const ProductArchive = (props: Props) => {
    const item = props.item;
    return(
        <Link href={item['field_link'][0]['url']}>
            <div className={style.card}>
                <div className={style.mediaWrapper}>
                    <Image
                        src={item['field_media_image'][0]['url']}
                        alt={item['field_media_image'][0]['alt']}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
                <Link href={item['field_link'][0]['url']}>
                    <div className={style.linkWrapper}>
                        <div className={style.linkContainer}>
                            <div className={style.linkTitle}>{item['field_link'][0]['title']}</div>
                            {item['field_description'] &&
                            <div className={style.linkDescription} dangerouslySetInnerHTML={{__html:item['field_description']}}></div>
                            }
                        </div>
                    </div>
                </Link>
            </div>
        </Link>
    )
};

export default ProductArchive;
