import React from 'react'
import classNames from 'classnames';
import { findDOMNode } from 'react-dom'
import './vertical.scss!'
import Hero from '../hero/Hero';
import Mosaic from '../mosaic/Mosaic';
import CompareTable from '../compare/CompareTable';
import LegacyFeature from '../legacy/legacyFeature';
import LegacyKSP from '../legacy/legacyksp';
import LegacyCenteredBackdrop from '../legacy/legacycenteredbackdrop';
import propsAreValid, {logError} from '../../lib/util';
import dataPropTypes, {verticalPropTypes} from '../../../data/dataProps';
import _ from 'lodash';

class Vertical extends React.Component {
    
    constructor(props){
        super(props);

        //initialize state
        this.state = {
            active: false,
            winHeight: 0,
            winTop: 0,
            scrollTop: 0,
        };

        //debounce Check Scene Visible all the time
        //this._checkSceneVisible = _.debounce(this._checkSceneVisible, 200);
    }

    componentDidMount() {
        //when component mounts check if it is in the viewport
        this._checkSceneVisible = _.debounce(this._checkSceneVisible, 200);
        this._checkSceneVisible();
    }

    componentWillReceiveProps(nextProps) {
        //get new dimensions from the parent component VerticalPage
        this._updateDimensions(nextProps);
    }

    _onEnterViewport() {
        //Our vertical has entered the viewport
        this.setState({active: true})
    }

    _onLeaveViewport() {
        //Our vertical has left the viewport.
        this.setState({active: false})
    }

    _updateDimensions(nextProps) {
        //get the new window height, top of the window, and scroll position from VerticalPage and update this state
        this.setState({
            winHeight: nextProps.winHeight,
            winTop: nextProps.winTop,
            scrollTop: nextProps.scrollTop
        }, this._checkSceneVisible());
    };

    _checkSceneVisible() {
        //get rectangle of the vertical and test if it's in the viewport or not
        this._visibleY(this);
    }

    _visibleY(el) {
        if(el) {
            //Check the rectangle of the dom node and fire a function if it's visible
            let rect = findDOMNode(el).getBoundingClientRect();
            if(rect.top >=0 && rect.bottom <= (this.props.winHeight + this.props.winTop) && (rect.height + rect.top) < (this.props.winHeight + this.props.winTop)) {
                this._onEnterViewport(el);
            } else {
                this._onLeaveViewport(el);
            }
        }
    }

    render() {
        if(propsAreValid(this.props.data, this)) {
            let active = this.state.active ? 'active' : 'inactive';

            let {layout, sectionIdentifier, readingDirection} = this.props.data;
            let myLayout = typeof layout === 'object' ? layout.type : layout;
            let acceptedLayouts = ['hero', 'immersiveHero', 'fullscreen', 'card', 'mosaic', 'compare', 'feature', 'featureCta', 'ksp', 'ksp_rs', 'ksp_reversed', 'centeredBackdropTemplate'];
            let verticalClass = classNames('scene-vertical', this.props.data.groupIdentifier, this.props.data.sectionIdentifier, myLayout, active);
            if(myLayout && _.includes(acceptedLayouts, myLayout)) {
                return (
                    <section id={sectionIdentifier} className={verticalClass} name={sectionIdentifier}
                             dir={readingDirection ? readingDirection : null}>
                        {myLayout == 'hero' || myLayout == 'immersiveHero' || myLayout == 'fullscreen' || myLayout == 'card' ?
                            <Hero data={this.props.data.layout}
                                  brandColor={this.props.brandColor ? this.props.brandColor : null}
                                  active={this.state.active} myId={this.props.myId} /> : null
                        }
                        {myLayout == 'mosaic' ?
                            <Mosaic data={this.props.data.layout}
                                    brandColor={this.props.brandColor ? this.props.brandColor : null}
                                    active={this.state.active} myId={this.props.myId} /> : null
                        }
                        {myLayout == 'compare' ?
                            <CompareTable data={this.props.data.layout}
                                          brandColor={this.props.brandColor ? this.props.brandColor : null}
                                          active={this.state.active} myId={this.props.myId} /> : null
                        }
                        {myLayout == 'feature' ?
                            <LegacyFeature data={this.props.data}
                                           brandColor={this.props.brandColor ? this.props.brandColor : null}
                                           active={this.state.active} myId={this.props.myId} /> : null
                        }
                        {myLayout == 'featureCta' ?
                            <LegacyFeature data={this.props.data}
                                           brandColor={this.props.brandColor ? this.props.brandColor : null}
                                           active={this.state.active} myId={this.props.myId} /> : null
                        }
                        {myLayout == 'ksp' || myLayout == 'ksp_rs' || myLayout == 'ksp_reversed' ?
                            <LegacyKSP data={this.props.data}
                                       brandColor={this.props.brandColor ? this.props.brandColor : null}
                                       active={this.state.active} myId={this.props.myId} /> : null
                        }
                        {myLayout == 'centeredBackdropTemplate' ?
                            <LegacyCenteredBackdrop data={this.props.data}
                                                    brandColor={this.props.brandColor ? this.props.brandColor : null}
                                                    active={this.state.active} myId={this.props.myId}/> : null
                        }
                    </section>
                )
            }
            logError('Error: invalid layout of type', myLayout, 'supplied to', this, 'Layout must be one of type: ', acceptedLayouts);
        }
        return null
    }
}

Vertical.propTypes = dataPropTypes(verticalPropTypes);

export default Vertical
