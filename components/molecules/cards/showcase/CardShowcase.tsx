import style from './cardShowcase.module.scss';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    showcase: Array<any>
}

export default function CardShowcase(content: Props) {
    const showcase = content.showcase;
    return (
        <div className={style.showcase} key={showcase['nid']}>
            <Link href={showcase['path']}>
                <div>
                    <div className={style.image}>
                        <Image src={showcase['image']['url']} alt={showcase['image']['alt']} width={500} height={500}/>
                    </div>
                    <h3 className={style.title}>{showcase['title']}</h3>
                    <div className={style.type}>{showcase['type']['name']}</div>
                </div>
            </Link>
        </div>
    )
}
