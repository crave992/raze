import {useEffect} from "react";
import {restGet} from "../api/rest";

export default function Paragraph1(props){

    return(
        <div>Paragraph {props.section.type}</div>
    )
}

export async function getServerSideProps(context) {

}