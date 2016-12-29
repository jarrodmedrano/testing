import React from 'react';
import propsAreValid from '../../util';
import dataPropTypes, {picturePropTypes} from '../../../data/dataProps';

class Picture extends React.Component {
    render() {
        if(propsAreValid(this.props.data, this.defaultProps)) {
            let {pictures, altText} = this.props.data;
            return (
                <picture className="c-image">
                    {pictures.map(function (object, id) {
                        return (
                            <source srcSet={object.src} media={object.minwidth} key={id}/>
                        )
                    })}
                    <img srcSet={pictures[0].src} src={pictures[0].src} alt={altText ? altText : null}/>
                </picture>
            )
        } return null
    }
}

Picture.defaultProps = {
    data: {
        pictures: [{src: '', minwidth: '', altText: ''}],
        altText: ''
    }
};

Picture.propTypes = dataPropTypes(picturePropTypes);

export default Picture