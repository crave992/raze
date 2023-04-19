import style from './clients.module.scss';
import Image from 'next/image';
import Slider from 'react-slick';

type Props = {
    section: {
        field_title: string,
        field_clients: Array<Object>,
    }
}

export default function Clients(props: Props) {
    const content = props.section;
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
    }
    return (
        <section className={style.clients}>
            <div className={`section__inner`}>
                <h2 className={`section__title_2`}>{content.field_title}</h2>
                {content.field_clients.length &&
                    <div className={style.clientList}>
                        <Slider {...settings}>
                        {content.field_clients.map((client, i) => (
                            <div className={style.client}>
                                <div className={style.image}>
                                <Image src={client['field_media_image'][0]['url']} alt={client['field_media_image'][0]['alt']} width={145} height={145}/>
                                </div>
                                <h3 className={style.name} dangerouslySetInnerHTML={{__html:client['field_title']}}></h3>
                            </div>
                        ))}
                        </Slider>
                    </div>
                }
            </div>
        </section>
    )
}
