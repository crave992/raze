export default function Picture({data, style = {}}){

    console.log('style', style);
    const [lastUrl] = data.urls.slice(-1);

    return(
        <picture>
            {data.urls.map(url => (
                <source srcSet={url.url} type={url.type} />
            ))}
            <img  src={lastUrl.url}  alt={data.alt} title={data.title}/>
        </picture>
    )

}