import React from 'react';
import classNames from 'classnames';
import MosaicPicture from '../picture/MosaicPicture';
import Heading from '../heading/Heading';
import ButtonLink from '../link/ButtonLink'
import propsAreValid from '../../lib/util';
import dataPropTypes, {tilePropTypes} from '../../../data/dataProps';

class MosaicTile extends React.Component {
    render() {
        if(propsAreValid(this.props.data, this)) {
            let { headingBlock, pictureBlock, hoverEffectColor, viewMask, theme} = this.props.data;
            let { textColor, backgroundColor, } = headingBlock;

            let tileClass = classNames('c-mosaic-placement c-placement',
                theme ? theme : 'theme-light',
                viewMask ? `f-mask-${viewMask}` : null);

            let tileStyle = {
                background: backgroundColor,
                color: textColor
            };

            if(propsAreValid(headingBlock.button, this)) {
                return (
                    <ButtonLink to={headingBlock.button.link} layout="mosaic" className="mosaic-link" draggable="false">
                        <section className={tileClass} style={tileStyle}>
                            {hoverEffectColor ? <div className="c-image-overlay" aria-hidden="true" style={{backgroundColor: hoverEffectColor}}></div> : null }
                            {pictureBlock ? <MosaicPicture data={pictureBlock} /> : null}
                            {headingBlock && (this.props.size != 'small') && headingBlock.heading ? <Heading data={headingBlock} /> : null}
                        </section>
                    </ButtonLink>
                )
            } else {
                return (
                    <section className={tileClass}>
                        {pictureBlock ? <MosaicPicture data={pictureBlock} /> : null}
                        {headingBlock && (this.props.size != 'small') && headingBlock.heading ? <Heading data={headingBlock} /> : null}
                    </section>
                )
            }
        } return null
    }
}

MosaicTile.propTypes = dataPropTypes(tilePropTypes);


export default MosaicTile;
