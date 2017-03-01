import React from 'react'
import classNames from 'classnames';
import './vertical.scss!'
import Hero from '../hero/Hero';
import Mosaic from '../mosaic/Mosaic';
import CompareTable from '../compare/CompareTable';
import LegacyFeature from '../legacy/legacyFeature';
import LegacyKSP from '../legacy/legacyKsp';
import LegacyCenteredBackdrop from '../legacy/legacycenteredbackdrop';
import propsAreValid from '../../lib/util';
import dataPropTypes, {verticalPropTypes} from '../../../data/dataProps';

class Vertical extends React.Component {
    
    constructor(props){
        super(props);
        let updatedId = this.props.updatedId;

        this.state = {
            active: false,
            updatedId: updatedId,
            updated: false
        }
    }

    componentWillReceiveProps(nextProps) {
        //if vertical is scrolled to, set active to true
        nextProps.activeId === this.props.myId ? this.setState({active: true}) : this.setState({active: false});
        //if page is updated, set updated to true
        this.state.updatedId != nextProps.updatedId ? this.setState({updated: true}) && this.setState({updatedId: nextProps.updated}) : null;
    }

    render() {
        if(propsAreValid(this.props.data, this)) {
            let active = this.state.active ? 'active' : 'inactive';
            let verticalClass = classNames('scene-vertical', this.props.data.groupIdentifier, this.props.data.sectionIdentifier, active);
            let {layout, sectionIdentifier} = this.props.data;
            return (
                <section id={sectionIdentifier} className={verticalClass} name={sectionIdentifier} style={{position: 'relative'}} >
                    {layout === 'hero' || layout === 'immersive-hero' || layout === 'fullscreen' || layout === 'card' ?
                        <Hero data={this.props.data} brandColor={this.props.brandColor ? this.props.brandColor : null} active={this.state.active} updated={this.state.updated} /> : null
                    }
                    {layout === 'mosaic' ?
                        <Mosaic data={this.props.data} brandColor={this.props.brandColor ? this.props.brandColor : null} active={this.state.active} updated={this.state.updated} /> : null
                    }
                    {layout === 'compare' ?
                        <CompareTable data={this.props.data} brandColor={this.props.brandColor ? this.props.brandColor : null} active={this.state.active}  updated={this.state.updated} /> : null
                    }
                    {layout === 'feature' ?
                        <LegacyFeature data={this.props.data} brandColor={this.props.brandColor ? this.props.brandColor : null} active={this.state.active} updated={this.state.updated} /> : null
                    }
                    {layout === 'featureCta' ?
                        <LegacyFeature data={this.props.data} brandColor={this.props.brandColor ? this.props.brandColor : null} active={this.state.active} updated={this.state.updated} /> : null
                    }
                    {layout === 'ksp' || layout == 'ksp_rs' ?
                        <LegacyKSP data={this.props.data}  brandColor={this.props.brandColor ? this.props.brandColor : null} active={this.state.active} updated={this.state.updated} />  : null
                    }
                    {/*  Implement as variants of 'ksp'?
                     {layout === 'ksp_reversed' ?
                     <LegacyKSP data={this.props.data}/> : null
                     }
                     {layout === 'ksp_rs' ?
                     <LegacyKSP data={this.props.data}/> : null
                     }
                     */}
                    {layout === 'centeredBackdropTemplate' ?
                        <LegacyCenteredBackdrop data={this.props.data} brandColor={this.props.brandColor ? this.props.brandColor : null} active={this.state.active} updated={this.state.updated} /> : null
                    }
                </section>
            )
        } return null
    }
}

Vertical.propTypes = dataPropTypes(verticalPropTypes);

export default Vertical
