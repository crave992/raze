import Section from "@util/Section";
import Breadcrumb from "@molecules/breadcrumb/Breadcrumb";

export default function CustomPage(props){

    console.log(props);

    return(
        <article>
            {props.node.breadcrumb &&
                <Breadcrumb links={props.node.breadcrumb}/>
            }
            {props.node.field_sections && props.node.field_sections.map(section =>
                <Section key={section.paragraph.uuid} section={section} />
            )}
        </article>
    )

}
