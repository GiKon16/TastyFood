import React, { FC } from "react";
import styles from "../styles/about/About.module.scss";
import Layout from "@/components/Layout";

const About:FC = () => {
    return (
        <Layout>
            <div className={ styles.about }>
                <h1 className={ styles.title }>О нас</h1>
                <p className={ styles.p }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo nulla, sollicitudin non venenatis non, mattis vitae enim. Quisque rhoncus, lectus vitae posuere maximus, quam nisi varius magna, quis euismod mi arcu placerat est. Nulla id ullamcorper enim, eu cursus dolor. Fusce sodales sem nec mi semper, et facilisis nulla aliquet. Cras porta ornare consequat. Aenean fermentum porta orci, in accumsan neque tristique nec. Phasellus non mi id libero fringilla malesuada. Nunc facilisis elit a cursus pharetra. Donec ac enim massa. Phasellus eu suscipit turpis. Aliquam sem augue, tristique quis mi in, commodo luctus ex. Mauris pellentesque sollicitudin nulla at suscipit. Mauris cursus egestas ex, vitae interdum neque commodo at.</p>
                <p className={ styles.p }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo nulla, sollicitudin non venenatis non, mattis vitae enim. Quisque rhoncus, lectus vitae posuere maximus, quam nisi varius magna, quis euismod mi arcu placerat est. Nulla id ullamcorper enim, eu cursus dolor. Fusce sodales sem nec mi semper, et facilisis nulla aliquet. Cras porta ornare consequat. Aenean fermentum porta orci, in accumsan neque tristique nec. Phasellus non mi id libero fringilla malesuada. Nunc facilisis elit a cursus pharetra. Donec ac enim massa. Phasellus eu suscipit turpis. Aliquam sem augue, tristique quis mi in, commodo luctus ex. Mauris pellentesque sollicitudin nulla at suscipit. Mauris cursus egestas ex, vitae interdum neque commodo at.</p>
                <p className={ styles.p }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo nulla, sollicitudin non venenatis non, mattis vitae enim. Quisque rhoncus, lectus vitae posuere maximus, quam nisi varius magna, quis euismod mi arcu placerat est. Nulla id ullamcorper enim, eu cursus dolor. Fusce sodales sem nec mi semper, et facilisis nulla aliquet. Cras porta ornare consequat. Aenean fermentum porta orci, in accumsan neque tristique nec. Phasellus non mi id libero fringilla malesuada. Nunc facilisis elit a cursus pharetra. Donec ac enim massa. Phasellus eu suscipit turpis. Aliquam sem augue, tristique quis mi in, commodo luctus ex. Mauris pellentesque sollicitudin nulla at suscipit. Mauris cursus egestas ex, vitae interdum neque commodo at.</p>
                <p className={ styles.p }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo nulla, sollicitudin non venenatis non, mattis vitae enim. Quisque rhoncus, lectus vitae posuere maximus, quam nisi varius magna, quis euismod mi arcu placerat est. Nulla id ullamcorper enim, eu cursus dolor. Fusce sodales sem nec mi semper, et facilisis nulla aliquet. Cras porta ornare consequat. Aenean fermentum porta orci, in accumsan neque tristique nec. Phasellus non mi id libero fringilla malesuada. Nunc facilisis elit a cursus pharetra. Donec ac enim massa. Phasellus eu suscipit turpis. Aliquam sem augue, tristique quis mi in, commodo luctus ex. Mauris pellentesque sollicitudin nulla at suscipit. Mauris cursus egestas ex, vitae interdum neque commodo at.</p>
            </div>
        </Layout>
    )
}

export default About