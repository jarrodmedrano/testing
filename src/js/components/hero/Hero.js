import React from 'react';
import classNames from 'classnames';
import Heading from '../heading/Heading';
import './Hero.scss!';
import Picture from '../picture/Picture';
import propsAreValid from '../../util';

class Hero extends React.Component {
    render() {
        if(propsAreValid(this.props.data)) {
            let {alignX, alignY, theme} = this.props.data;
            let heroClass = classNames('m-hero-item f-medium context-accessory', `f-x-${alignX}`, `f-y-${alignY}`, theme);
            return (
                <div className={heroClass}>
                    <Picture data={this.props.data}/>
                    <Heading data={this.props.data}/>
                </div>
            )
        } return null
    }
}

export default Hero